const { EmailParams, Sender, Recipient, MailerSend } = require("mailersend");
const { mailersend } = require('../../NotificationConfig/EmailNotificationConfig')

const sentFrom = new Sender("vishnu@trial-dnvo4d971erg5r86.mlsender.net", "QR MENU SECURITY TEAM");

function sendForgotPasswordEmail(email, name, randomString) {
    if(email) {
        const recipients = [new Recipient(email, name)];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject("Password Change Verification Token")
            .setHtml(`<html><head></head><body><h1>
                    Hi ${name}, <br/>
                    ${email}<br/>
                    Are you trying to sign in?<br/>
                    If so, use this code to finish signing in.<br/>
                    ${randomString}.</h1></body></html>`)
                    
        mailersend.email.send(emailParams).then((result) => {
            console.log("Email Sent", result)
        }).catch((error) => {
            console.log(error)
        });
    } else {
        throw new Error("Email id doesnt exists")
    }
}

module.exports = {
    sendForgotPasswordEmail
};