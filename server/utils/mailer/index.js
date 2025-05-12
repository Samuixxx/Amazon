const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const fs = require('fs');
const path = require('path');
const { getEmailTemplate } = require('./template')

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
    username: 'api',
    key: API_KEY,
    url: 'https://api.eu.mailgun.net'
});

const sendVerificationMail = async (to, otpCode, lang) => {
    const baseHtmlTemplate = getEmailTemplate(lang, otpCode)
    const personalizedHtml = baseHtmlTemplate.replace('{{ OTP_CODE }}', otpCode);

    const data = {
        from: 'Shophub <noreply@marketfocus.store>',
        to: to,
        subject: 'Registration to Shophub',
        html: personalizedHtml
    };

    try {
        const response = await mg.messages.create(DOMAIN, data);
        console.log('Email inviata con successo!', response);
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error);
    }
};

module.exports = sendVerificationMail;