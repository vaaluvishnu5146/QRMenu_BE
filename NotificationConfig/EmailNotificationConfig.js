const { MailerSend } = require("mailersend");

console.log("API TOKEN", process.env.MAILER_SEND_API_KEY)

const mailersend = new MailerSend({
    apiKey: 'mlsn.ca6adc12399e6cbdceda4360e4e7bc35b68d4f6772d2d70b6789130ead6eebaa',
});


module.exports = {
    mailersend
};