const { validate } = require('uuid')
const i18next = require('i18next')

const validateUuid = (req, res, next) => {
    const uuid = req.body.clientId
    if (!uuid || !validate(uuid)) {
        return res.status(401).json({ ok: false, message: i18next.t("Client id is not valid") })
    }
    next()
};

module.exports = validateUuid
