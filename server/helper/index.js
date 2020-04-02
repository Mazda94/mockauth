const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const random = require('randomatic')
const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

const hash = plain => bcrypt.hashSync(plain, bcrypt.genSaltSync(10))
const compare = (plain, hash) => bcrypt.compareSync(plain, hash)
const generateToken = (payload, secretKey = process.env.JWT_KEY) => jwt.sign(payload, secretKey)
const generateCode = length => random('0', length)

const sendVerificationCode = payload => {
    const content = {
        to: payload.email,
        from: 'noreply@md_media.com',
        subject: 'Welcome to Mock App! Activate Your Account',
        text: 'This is your mockapp account verification code, please enter the verification code on your account verification page',
        html: `
            <!DOCTYPE html>

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Mock App</title>
            </head>

            <body>
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-direction: column;">
                    <h3>Thanks for registering your account.</h3>
                    <p>Please activate your account using verification code below.</p>
                    <br>
                    <h4>Your verification code:</h4>
                    <p style="
                        border-radius: 4px;
                        padding: 12px;
                        font-weight: bolder;
                        font-size: 20px;
                        letter-spacing: 12px;
                        background-color: rgba(0, 0, 0, .15);">${payload.code}</p>
                </div>
            </body>

            </html>
        `
    }
    sendGrid.send(content)
}

const sendEmailResetPassword = payload => {
    const content = {
        to: payload.email,
        from: 'noreply@md_media.com',
        subject: 'Welcome to Mock App! Activate Your Account',
        html: `<a href="http://localhost:3000/resetPassword/${payload.id}/${payload.token}">Reset Password</a>`,
    }
    sendGrid.send(content)
}

const jwtDecode = payload => jwt.verify(payload.token, payload.secret)

module.exports = {
    hash,
    compare,
    generateToken,
    generateCode,
    sendVerificationCode,
    sendEmailResetPassword,
    jwtDecode
}