
const jwt = require("jsonwebtoken")
const jwt_key = "safdfljkdt4657fldkfsdffssjfdfkd"
const {sendMail} = require("../../Utility/nodemailer.js")
const userModel = require('../models/userModel')

// signup users
module.exports.signup = async function signup(req, res) {
    let data = req.body
    await userModel.create(data).then((user) => {
        sendMail('signup',user)
        res.json({
            msg: "user created",
            dataobj: user
        })
    }).catch(function (err) {
        res.json({
            "msg": 'Something wrong in signup',
            data: err
        })
    })

}
//login users
module.exports.login = async function login(req, res) {
    try {
        let data = req.body
        let user = await userModel.findOne({ Email: data.Email });
        if (user) {
            if (await user.Password == data.Password && await user.Email == data.Email) {
                let uid = user['_id']
                let token = await jwt.sign({ payroll: uid }, jwt_key)
                res.cookie('login', token, { httpOnly: true })
                return res.json({
                    msg: "user has been logged in successfully"
                })

            } else if (await user.Email != data.Email) {
                return res.json({
                    msg: "email does not match"
                })
            } else if (await user.Password != data.Password) {
                return res.json({
                    msg: "Password does not match"
                })

            }

        } else {
            return res.json({
                message: data.message
            })

        }
    } catch (err) {
        res.json({
            msg: err
        })
    }
}
// authorisation for admin and user
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next()
        } else {
            res.json({
                msg: "This is not admin page"
            })
        }
    }
}
// protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login
            let payload = await jwt.verify(token, jwt_key)
            if (payload) {
                const user = await userModel.findById(payload.payroll)
                req.role = user.role
                req.id = user.id
                next()
            } else {
                res.json({
                    msg: "please login"
                })

            }
        } else {
            // for browser
            const client = req.get('User-Agent')
            if(client.includes("chrome")==true){
                return res.redirect("/login")
            }
            // for Postman
            res.json({
                msg: "cookie Not received"
            })
        }
    } catch (err) {
        res.json({
            msg: "err",
            message: err.message
        })
    }

}
// forget password
module.exports.forgetPassword = async function forgetPassword(req, res) {
    let { Email } = req.body
    try {
        const user = await userModel.findOne({ Email: Email })
        if (user) {
            const resetToken = user.createResetToken();
            //http://abc@gmail.com//resetPassword/resetToken
            resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
            //send email to the user
            // i will use nodemailer
            let obj = {
                resetPasswordLink:resetPasswordLink,
                email:Email
            }
            sendMail('resetPassword',obj)
            return res.json({

            })
        } else {
            res.json({
                msg: "signup first"
            })
        }
    } catch (err) {
        res.json({
            msg: err.message
        })
    }
}
// resetPassword
module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        let token = req.params.token
        const { Password, ConfirmPassword } = req.body
        const user = await userModel.findOne(resetToken.token)
        if(user){// resetPasswordHandler will update password in db
            user.resetPasswordHandler(Password, ConfirmPassword)
            await user.save();
            res.json({
                msg: "password changed successfully please login again"
            })}else{
                res.json({
                    msg:"Plz enter password again"
                })
            }
        
    } catch (err) {
        res.json({
            msg: err.message
        }) 
    }
}
// logout
module.exports.logout= function logout (req,res){
    try{res.cookie('login',' ',{maxAge:1})
    res.json({
        msg:"logout successfully"
    })
}catch(err){
    res.json({
        msg: err.message
    })
}
}