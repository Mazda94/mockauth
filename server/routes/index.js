const route = require('express').Router()
const controller = require('../controllers')
route
    .post('/register', controller.register)
    .post('/login', controller.login)
    .post('/sendVerificationCode', controller.generateVerificationCode)
    .post('/activateAccount', controller.activate)
    .post('/forgotPassword', controller.forgotPassword)
    .get('/resetPassword/:id/:token', controller.resetPasswordForm)
    .post('/resetPassword', controller.resetPassword)

module.exports = route