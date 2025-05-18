const twilio = require('twilio')
const i18next = require('i18next')

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

const sendVerificationMessage = async (otp, to, lang='en') => {
    try {
        const message = await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
            body: i18next.t('twilio.verification_message', { otp: otp, lng: lang })
        })
    } catch (twilioError) {
        console.error('Errore durante l\'invio del messaggio:', twilioError)
    }
}

module.exports = { sendVerificationMessage }