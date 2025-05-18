const trustedOrigins = [
    process.env.SERVER_ORIGIN_URL,
    process.env.CLIENT_ORIGIN_URL
]

module.exports = (req, res, next) => {
    const origin = req.get('Origin') || req.get('Referer')
    if (!origin || !trustedOrigins.some(trusted => origin.startsWith(trusted))) {
        return res.status(403).json({ ok: false, message: 'The origin is not authorized', origin })
    }

    next()
}