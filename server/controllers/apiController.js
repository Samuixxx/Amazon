const fs = require('fs')
const path = require('path')
const JSONStream = require('JSONStream')

const axios = require('axios')

const pool = require('../db')
const redis = require('../db/redisClient')
const bcrypt = require('bcryptjs')
const { SIGNUP_USER_QUERY } = require('../queries/auth')
const { generateTokens } = require('../tokens/generateTokens')

const getAllCountries = (req, res) => {
    // Mappatura del parametro della lingua
    const { lang } = req.params
    const languageMap = {
        'cn': 'zh-CN',
        'en': 'en',
        'it': 'it',
        'fr': 'fr',
        'es': 'es',
        'de': 'de',
    }

    if (!languageMap[lang]) {
        return res.status(400).json({ error: 'Invalid language parameter' })
    }

    const selectedLang = languageMap[lang]

    const statesPath = path.join(__dirname, "../data/states.json")
    const states = []

    const readStream = fs.createReadStream(statesPath, { encoding: 'utf-8' })
    const jsonStream = JSONStream.parse('*')

    readStream.pipe(jsonStream)

    jsonStream.on('data', (data) => {
        if (data.translations && data.translations[selectedLang]) {
            states.push({
                label: data.translations[selectedLang],
                value: data.iso2,
            });
        }
    })

    jsonStream.on('end', () => {
        res.status(200).json({
            ok: true,
            states: states,
        });
    })

    jsonStream.on('error', (err) => {
        console.error('Errore durante il parsing del file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    })

    readStream.on('error', (err) => {
        console.error('Errore durante la lettura del file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    })
}

const validateAddress = async (req, res) => {
    const address = req.body.address

    try {
        const googleRes = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: address,
                key: process.env.GOOGLE_GEOCODING_API_KEY
            }
        })

        const { results, status } = googleRes.data

        if (status === "OK" && results.length > 0) {
            res.status(200).json({
                ok: true,
                latitude: results[0].geometry.location.lat,
                longitude: results[0].geometry.location.lng
            })
        } else {
            res.status(400).json({ valid: false, reason: "Address not found" })
        }

    } catch (error) {
        console.error("Error during Google Geocoding API call:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

//
//  AUTHENTICATION
//

const signUpNewUser = async (req, res) => {
    const {
        name,
        surname,
        email,
        fullNumber,
        password,
        country,
        addressone,
        addresstwo,
        city,
        postalcode,
        specifications,
        coordinates,
        terms
    } = req.body

    const { termsAccepted, privacyAccepted, cookiesAccepted, marketingAccepted } = terms
    const { latitude, longitude } = coordinates
    const address = addressone + addresstwo

    try {
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await pool.query(SIGNUP_USER_QUERY, [
            name,
            surname,
            email,
            fullNumber,
            hashedPassword,
            country,
            address,
            city,
            postalcode,
            specifications,
            latitude,
            longitude,
            termsAccepted,
            privacyAccepted,
            cookiesAccepted,
            marketingAccepted
        ])

        const userID = result.rows[0].id

        const { accessToken, refreshToken } = generateTokens(userID)

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 // 15 minuti
        })

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
        })

        req.session.userID = userID
        req.session.isAuthenticated = true

        res.status(201).json({
            ok: true,
            message: 'User registered',
            accessToken,
            refreshToken
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = { getAllCountries, validateAddress, signUpNewUser }
