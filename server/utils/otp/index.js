const { randomInt } = require('crypto')

const generateOtp = (length = 6) => {
    const min = Math.pow(10, (length - 1))
    const max = Math.pow(10, length) - 1
    return randomInt(min, max + 1).toString()
}

module.exports = { generateOtp }