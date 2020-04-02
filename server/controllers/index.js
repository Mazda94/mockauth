const { User, Verification } = require('../models/index')
const {
    compare,
    generateToken,
    generateCode,
    sendVerificationCode,
    sendEmailResetPassword,
    jwtDecode
} = require('../helper')


class MainController {
    static async register(req, res) {
        const { fullName, email, password } = req.body
        if (fullName && email && password) {
            try {
                const user = await User.findOne({ where: { email } })
                if (!user) {
                    const value = { fullName, email, password }
                    const newUser = await User.create(value)
                    if (newUser) {
                        const code = generateCode(6)
                        const value = {
                            UserId: newUser.id,
                            email: newUser.email,
                            code
                        }
                        const verify = await Verification.create(value)
                        if (verify) {
                            sendVerificationCode({ email: verify.email, code: verify.code })
                            res.status(201).json({
                                error: false,
                                message: 'Successfully registered an account, please check your email inbox or spam to activate your account',
                                payload: {
                                    email: verify.email
                                }
                            })
                        }
                    }
                } else {
                    res.status(409).json({
                        error: true,
                        message: 'Email is already registered'
                    })
                }
            } catch (error) {

            }
        } else {
            res.status(400).json({
                error: true,
                message: 'Fullname, email and password must be provided'
            })
        }
    }


    static async login(req, res) {
        const { email, password } = req.body
        const value = { email, password }

        if (email && password) {
            try {
                const user = await User.findOne({ where: { email: value.email } })
                if (!user) {
                    res.status(404).json({
                        error: true,
                        message: 'Invalid email or password'
                    })
                } else {
                    const passwordIsMatch = compare(password, user.password)
                    if (passwordIsMatch) {
                        if (user.isVerified) {
                            let token = generateToken({ id: user.id })
                            res.status(200).json({
                                error: false,
                                message: 'Successfully logged in',
                                payload: {
                                    token
                                }
                            })
                        } else {
                            res.status(200).json({
                                error: false,
                                message: 'Please activate your account',
                                payload: {
                                    email: user.email
                                }
                            })
                        }
                    } else {
                        res.status(400).json({
                            error: true,
                            message: 'Invalid password'
                        })
                    }
                }
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: error.message
                })
            }
        } else {
            res.status(400).json({
                error: true,
                message: 'Email or password must be provided'
            })
        }
    }

    static async generateVerificationCode(req, res) {
        const { email } = req.body
        if (email) {
            const code = generateCode(6)
            try {
                const result = await Verification.update({ code }, { where: { email } })
                if (result[0] !== 0) {
                    sendVerificationCode({ email, code })
                    res.status(200).json({
                        error: false,
                        message: 'Verification code has been sent to your email'
                    })
                } else {
                    res.status(404).json({
                        error: true,
                        message: 'Invalid email'
                    })
                }
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: error.message
                })
            }
        } else {
            res.status(400).json({
                error: true,
                message: 'Email must be provided'
            })
        }
    }

    static async activate(req, res) {
        const { email, verificationCode } = req.body
        if (email && verificationCode) {
            try {
                const user = await User.findOne(
                    {
                        where: { email },
                        include: [{
                            model: Verification,
                            attributes: ['code']
                        }]
                    })
                if (user) {
                    if (!user.isVerified) {
                        const isVerified = user.Verification.code === Number(verificationCode)
                        if (isVerified) {
                            const updated = await User.update({ isVerified }, { where: { email } })
                            if (updated[0] !== 0) {
                                res.status(201).json({
                                    error: false,
                                    message: 'Account successfully activated'
                                })
                            } else {
                                res.status(400).json({
                                    error: true,
                                    message: 'Failed to activate account'
                                })
                            }
                        } else {
                            res.status(400).json({
                                error: true,
                                message: 'Invalid verification code'
                            })
                        }
                    } else {
                        res.status(200).json({
                            error: false,
                            message: 'Account is already activated'
                        })
                    }
                } else {
                    res.status(404).json({
                        error: true,
                        message: 'User not found'
                    })
                }
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: error.message
                })
            }
        } else {
            res.status(400).json({
                error: true,
                message: 'Email and verification code must be provided'
            })
        }
    }

    static async forgotPassword(req, res) {
        const { email } = req.body
        if (email) {
            try {
                const user = await User.findOne({ where: { email } })
                if (!user) {
                    res.status(404).json({
                        error: true,
                        message: 'User not found'
                    })
                } else {
                    const payload = { id: user.id }
                    const secret = user.password + user.createdAt.getTime()
                    const token = generateToken(payload, secret)
                    res.status(200).json({
                        error: false,
                        message: 'Reset password has been sent to your email',
                    })
                    sendEmailResetPassword({ id: user.id, email, token })
                }
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: error.message
                })
            }
        } else {
            res.status(400).json({
                error: true,
                message: 'Email must be provided'
            })
        }

    }

    static async resetPasswordForm(req, res) {
        const { id, token } = req.params
        try {
            const user = await User.findByPk(id)
            const secret = user.password + user.createdAt.getTime()
            const decodedToken = jwtDecode({ token, secret })

            if (user) {
                if (user.id === decodedToken.id) {
                    res.status(200).json({
                        error: false,
                        message: 'Token is valid',
                        payload: {
                            id: user.id,
                            email: user.email
                        }
                    })
                } else {
                    res.status(400).json({
                        error: true,
                        message: 'Invalid token'
                    })
                }
            } else {
                res.status(404).json({
                    error: true,
                    message: 'User not found'
                })
            }
        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async resetPassword(req, res) {
        const { newPassword, email } = req.body
        if (newPassword && email) {
            try {
                const result = await User.update(
                    { password: newPassword },
                    {
                        where: { email },
                        individualHooks: true
                    }
                )
                if (result[0] !== 0) {
                    res.status(200).json({
                        error: false,
                        message: 'Succesfully reset your password'
                    })
                } else {
                    res.status(400).json({
                        error: true,
                        message: 'Reset password failed'
                    })
                }
            } catch (error) {
                res.status(500).json({
                    error: true,
                    message: error.message
                })
            }
        } else {
            res.status(400).json({
                error: true,
                message: 'New password and email must be provided'
            })
        }
    }
}

module.exports = MainController