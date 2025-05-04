const fs = require('fs')
const path = require('path')
const JSONStream = require('JSONStream')
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
                latitude: results[0].geometry.location.lat ,
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
    const { name, surname, email, prefix, telephone, password, country, addressone, addresstwo, city, postalcode, specifications, coordinates, terms } = req.body
    
}

module.exports = { getAllCountries, validateAddress }
