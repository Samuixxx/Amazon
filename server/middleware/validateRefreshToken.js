const jwt = require('jsonwebtoken')
const i18next = require('i18next')

const validateRefreshToken = (req, res, next) => {
    const refreshToken = req?.cookies['refresh_token']
    const accessToken = req?.cookies['access_token']

    if (!refreshToken) {
        return res.status(400).json({ ok: false, message: i18next.t("No refresh token given"), rfMissing: true })
    }

    if (accessToken) {
        return next()
    }

    let decodedRefreshToken
    try {
        decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (err) {
        return res.status(401).json({ ok: false, message: i18next.t("Invalid refresh token") })
    }

    const userId = decodedRefreshToken?.id || decodedRefreshToken?.payload?.id
    if (!userId) {
        return res.status(401).json({ ok: false, message: i18next.t("No id found in refresh token") })
    }

    const newAccessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'none',
        maxAge: 15 * 60 * 1000
    })

    next()
}

module.exports = { validateRefreshToken }