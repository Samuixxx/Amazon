const sanitizeHtml = require('sanitize-html')

const sanitizeBody = (req, res, next) => {
    for (let key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = sanitizeHtml(req.body[key], {
                allowedTags: [],
                allowedAttributes: {}
            })
        }
    }
    next()
}

module.exports = { sanitizeBody }