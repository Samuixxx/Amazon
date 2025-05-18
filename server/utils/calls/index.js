const twilio = require('twilio')
const i18next = require('i18next')

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

const sendVerificationCall = async (otp, to, lang = 'en') => {
    const formattedOtp = otp.split("").join(' ')
    const messageText = i18next.t('twilio.verification_message', { lng: lang, otp: formattedOtp })

    const twiml = `<Response><Say voice="Alice">${messageText}</Say></Response>`

    try {
        const call = await client.calls.create({
            twiml: twiml,
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER
        })
        console.log('Call initiated:', call.sid)
    } catch (twilioError) {
        console.error('Errore durante l\'invio della chiamata:', twilioError)
    }
}

module.exports = { sendVerificationCall }
