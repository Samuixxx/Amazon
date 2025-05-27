const fs = require('fs')
const path = require('path')
const JSONStream = require('JSONStream')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const i18next = require('i18next')
const redis = require('../db/redisClient')
const pool = require('../db')
const { CREATE_PRODUCT, ADD_IMAGE_TO_PRODUCT, ADD_3DMODEL_TO_PRODUCT, GET_SPECIAL_OFFERS_PRODUCTS, GET_RANDOM_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_SPECIFIC_INFO, GET_PRODUCTS_BY_SUBCATEGORY } = require('../queries/products')

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

const verifyXSRFToken = async (req, res, next) => {
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

// --------- PRODUCTS ----------
const createProduct = async (req, res) => {
    try {
        const { name, vendor, description, specifications, price, quantity, subcategory_id } = req.body

        let parsedDescription
        let parsedSpecifications
        try {
            parsedDescription = JSON.parse(description)
            parsedSpecifications = JSON.parse(specifications)
        } catch (jsonParseError) {
            return res.status(400).json({ error: 'Dati JSON per descrizione o specifiche non validi.', details: jsonParseError.message })
        }

        const images = req.files?.['images'] || []
        const models = req.files?.['models'] || []

        if (images.length < 2) {
            return res.status(400).json({ error: i18next.t('error.minImagesRequired') })
        }

        if (!name || !vendor || !parsedDescription || !parsedSpecifications || !price || !quantity || !subcategory_id) {
            return res.status(400).json({ error: i18next.t('error.incompleteProductData') })
        }

        const newProduct = await pool.query(
            CREATE_PRODUCT,
            [
                name,
                vendor,
                JSON.stringify(parsedDescription),
                JSON.stringify(parsedSpecifications),
                parseFloat(price),
                parseInt(quantity),
                parseInt(subcategory_id)
            ]
        )

        const productId = newProduct.rows[0]?.id

        if (!productId) {
            return res.status(500).json({ error: i18next.t('error.productCreationFailed') })
        }

        for (const img of images) {
            if (!img.filename) continue
            await pool.query(
                ADD_IMAGE_TO_PRODUCT,
                [productId, `/uploads/products/images/${img.filename}`]
            )
        }

        for (const model of models) {
            if (!model.filename) continue
            await pool.query(
                ADD_3DMODEL_TO_PRODUCT,
                [productId, `/uploads/products/models/${model.filename}`]
            )
        }

        res.status(201).json({ message: i18next.t('success.productCreated'), product: newProduct.rows[0] })

    } catch (error) {
        console.error('Errore in createProduct (catch finale):', error)
        res.status(500).json({ error: i18next.t('error.internalServer', { msg: error.message }), dbCode: error.code, dbDetail: error.detail })
    }
}

const getHomeData = async (req, res) => {
    try {
        const cachedSpecialOffers = await redis.get('specialoffers')
        const resSchema = {
            specialOffers: [],
            products: []
        }

        if (cachedSpecialOffers) {
            try {
                resSchema.specialOffers = JSON.parse(cachedSpecialOffers)
            } catch (parseError) {
            }
        } else {
            const specialOffersProducts = await pool.query(GET_SPECIAL_OFFERS_PRODUCTS, [3])
            if (specialOffersProducts.rows.length) {
                resSchema.specialOffers = specialOffersProducts.rows
                try {
                    await redis.set('specialoffers', JSON.stringify(specialOffersProducts.rows), 'EX', 3600)
                } catch (redisError) {
                }
            }
        }

        const products = await pool.query(GET_RANDOM_PRODUCTS, [20])
        if (products.rows.length) {
            resSchema.products = products.rows
        }

        res.json({ ok: true, products: resSchema })
    } catch (error) {
        res.status(500).json({ ok: false, message: i18next.t('error.internalServer', { msg: error.message }) })
    }
}

const getProductsByCategory = async (req, res) => {
    const { categoryName, limit } = req.query;

    try {
        const cacheKey = `category:${categoryName}:products`
        const cached = await redis.get(cacheKey)

        if (cached) {
            return res.json({ ok: true, products: JSON.parse(cached) })
        }

        const parsedLimit = parseInt(limit, 10) || 10

        const products = await pool.query(GET_PRODUCTS_BY_CATEGORY, [categoryName, parsedLimit])
        const productsRows = products.rows

        if (productsRows.length > 0) {
            try {
                await redis.set(cacheKey, JSON.stringify(productsRows), 'EX', 3600, 'NX')
            } catch (redisError) {
                console.error("Redis error:", redisError)
                // Non rispondiamo qui, logghiamo solo l'errore
            }
            return res.json({ ok: true, products: productsRows })
        } else {
            return res.json({ ok: true, products: [] })
        }

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ ok: false, message: i18next.t("server.internalError", { err: error.message }) })
    }
}

const getProductsBySubcategory = async (req, res) => {
    const { subCategoryName, limit } = req.query
    const maxLimit = parseInt(limit, 10) || 10

    try {
        const result = await pool.query(GET_PRODUCTS_BY_SUBCATEGORY, [subCategoryName, maxLimit])
        const rows = result.rows

        if (!rows.length) {
            return res.json({ ok: true, products: [] })
        }

        return res.json({ ok: true, products: rows })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ ok: false, message: i18next.t("Internal server error") })
    }
}

const getProductForPage = async (req, res) => {
    const productId = req.params.productId

    try {
        const result = await pool.query(GET_PRODUCT_SPECIFIC_INFO, [productId])
        const row = result.rows[0]

        if (row) {
            return res.json({ ok: true, product: row })
        } else {
            return res.status(404).json({ ok: false, message: "Product not found" })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ ok: false, message: i18next.t("Internal server error") })
    }
}

// -------- CART ---------
const addItemToCart = async (req, res) => {
    try {
        const { productId, quantity, authenticated, cartId } = req.body

        if (authenticated) {
            const userId = req.session.userID
            console.log(userId)
            if (!userId) {
                return res.status(401).json({ error: 'Utente non autenticato' })
            }

            let result = await pool.query('SELECT id FROM carts WHERE user_id = $1 LIMIT 1', [userId])
            let cartDbId

            if (result.rows.length === 0) {
                const insertResult = await pool.query(
                    `INSERT INTO carts (user_id, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING id`,
                    [userId]
                )
                cartDbId = insertResult.rows[0].id
            } else {
                cartDbId = result.rows[0].id
            }

            result = await pool.query(
                `SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
                [cartDbId, productId]
            )

            if (result.rows.length === 0) {
                await pool.query(
                    `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)`,
                    [cartDbId, productId, quantity]
                )
            } else {
                const itemId = result.rows[0].id
                await pool.query(
                    `UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2`,
                    [quantity, itemId]
                )
            }

            await pool.query(
                `UPDATE carts SET updated_at = NOW() WHERE id = $1`,
                [cartDbId]
            )

            return res.status(200).json({ message: 'Prodotto aggiunto al carrello' })
        }

        // Per utente anonimo, cartId deve essere un uuidv4
        let anonCartId = cartId
        if (!anonCartId) {
            anonCartId = uuidv4()
        }

        const redisKey = `cart:${anonCartId}`
        let cartData = await redisClient.get(redisKey)
        let cart = cartData ? JSON.parse(cartData) : {}

        if (cart[productId]) {
            cart[productId] += quantity
        } else {
            cart[productId] = quantity
        }

        await redisClient.set(redisKey, JSON.stringify(cart), 'EX', 60 * 60 * 24 * 5)

        res.status(200).json({ message: 'Prodotto aggiunto al carrello anonimo', cartId: anonCartId })

    } catch (error) {
        console.error('Errore in addItemToCart:', error)
        res.status(500).json({ error: 'Errore interno del server' })
    }
}



module.exports = { getAllCountries, validateAddress, getXSRFToken, verifyXSRFToken, setLanguage, createProduct, getHomeData, getProductsByCategory, getProductsBySubcategory, getProductForPage, addItemToCart }
