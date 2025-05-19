const fs = require('fs')
const path = require('path')
const JSONStream = require('JSONStream')
const { v4: uuidv4 } = require('uuid')
const redis = require('../db/redisClient')

const axios = require('axios')

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
            })
        }
    })

    jsonStream.on('end', () => {
    res.status(200).json({
            ok: true,
            states: states.sort((a, b) => {
                const labelA = a.label.toLowerCase()
                const labelB = b.label.toLowerCase()
                if (labelA < labelB) {
                    return -1
                }
                if (labelA > labelB) {
                    return 1
                }
                return 0
            }),
        })
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

/**
 * Sets the user's preferred language using a cookie.
 * @function
 * @param {Object} req - The request object.  Must contain a `lang` property in the body.
 * @param {Object} res - The response object.
 * @returns {Object} A JSON object indicating success or failure.  On success, sets a cookie named `usr.lang`.
 */
const setLanguage = (req, res) => {
    const lang = req.body.lang
    if (!lang) return res.status(400).json({ ok: false, message: "The lang parameter is missing in the request body" })

    res.cookie("usr.lang", lang, {
        sameSite: 'None',
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 3600 * 5 * 1000
    })

    res.status(200).json({ ok: true, message: "Language set successfully" })
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

const getXSRFToken = async (req, res) => {
    const tempId = uuidv4()
    const xsrfToken = uuidv4()
    const redisKey = `xsrf:${tempId}`

    try {
        await redis.set(redisKey, xsrfToken, 'EX', 3600)
        res.cookie('tpmcid', tempId, {
            secure: process.env.NODE_ENV === "production",
            sameSite: 'none',
            httpOnly: true,
            maxAge: 3600 * 1000
        })
        res.status(200).json({ ok: true, xsrfToken })
    } catch (err) {
        res.status(500).json({ ok: false, message: 'Errore nella generazione del token' })
    }
}

const  verifyXSRFToken = async (req, res, next) => {
    const reqIdClient = req.cookies['tpmcid']
    const xsrfTokenClient = req.headers['x-xsrf-token']

    if (!reqIdClient || !xsrfTokenClient) {
        return res.status(403).json({ error: 'Missing XSRF token or client ID' })
    }

    const redisKey = `xsrf:${reqIdClient}`
    const xsrfTokenServer = await redis.get(redisKey)

    if (xsrfTokenClient !== xsrfTokenServer) {
        return res.status(403).json({ error: 'Invalid XSRF token' })
    }
    
    next()
}

module.exports = { getAllCountries, validateAddress, getXSRFToken, verifyXSRFToken, setLanguage }
