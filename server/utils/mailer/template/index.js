const i18next = require('i18next')

const getEmailTemplate = (lang, otpCode)  => {
    return `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${i18next.t('otp.title', { lng: lang })}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #0f172a;
        color: #f1f5f9;
        padding: 2rem;
        margin: 0;
      }

      .container {
        max-width: 380px;
        margin: 0 auto;
        padding: 30px 20px;
        text-align: center;
        background-color: #1e293b;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
      }

      h1 {
        font-size: 20px;
        font-family: "Arial", sans-serif;
        margin-bottom: 12px;
        color: #93c5fd;
      }

      p {
        font-size: 15px;
        line-height: 1.5;
        margin-bottom: 18px;
        color: #cbd5e1;
      }

      .otp-code {
        font-size: 30px;
        letter-spacing: 6px;
        font-weight: bold;
        color: #fbbf24;
        background-color: #334155;
        padding: 12px 20px;
        border-radius: 6px;
        display: inline-block;
        box-shadow: inset 0 0 0 2px #fbbf24;
        margin-bottom: 20px;
      }

      .info-box {
        background-color: #334155;
        padding: 12px;
        border-radius: 6px;
        font-size: 14px;
        color: #e2e8f0;
        margin-bottom: 16px;
      }

      .footer {
        margin-top: 24px;
        font-size: 12px;
        color: #64748b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${i18next.t('otp.header', { lng: lang })}</h1>
      <p>${i18next.t('otp.body', { lng: lang })}</p>
      <div class="otp-code">${otpCode}</div>
      <p>${i18next.t('otp.expiry', { lng: lang })}</p>
      <div class="info-box">
        ${i18next.t('otp.security_note', { lng: lang })}
      </div>
      <div class="footer">
        ${i18next.t('otp.footer', { lng: lang })}
      </div>
    </div>
  </body>
</html>
`;
}


module.exports = { getEmailTemplate }