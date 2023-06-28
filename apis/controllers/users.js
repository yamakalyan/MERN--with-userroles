const express = require("express")
const userSchema = require("../modules/usersmodule")
const user = express.Router()
const jwt = require("jsonwebtoken")

// Manual user creation we can do in ui also

user.post("/", async (req, res) => {
    try {
        const creation = new userSchema({
            user_name: "kn",
            user_mobile: 9988998899,
            user_password: "200700",
            user_role: "user"
        })

        const save = await creation.save()
        res.status(200).json({
            success: true,
            message: "Succesfully created user",
            save
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})


user.get("/auth", async (req, res)=>{
    try {
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECURE_KEY

        const headerBody = req.header(headerKey)
        const verify = jwt.verify(headerBody, secureKey)

        if (verify) {
            const checkuser = await userSchema.findOne({user_name : verify.user_name})
            if (checkuser) {
                res.status(200).json({
                    success : true,
                    message : "Auth success",
                    checkuser
                })
            } else {
                res.status(400).json({
                    success : false,
                    message : "Failed auth"
                })
            }
        } else {
            res.status(401).json({
                success : false,
                message : "invalidToken"
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            error
        })
    }
})
user.post("/login", async (req, res) => {
    try {
        const userLogin = await userSchema.findOne({ user_name: req.body.user_name })

        if (userLogin) {
            if (userLogin.user_password == req.body.user_password) {

                const jwtValues = {
                    Time: Date(),
                    user_role: userLogin.user_role,
                    user_name : userLogin.user_name
                }

                const token = jwt.sign(jwtValues, process.env.JWT_SECURE_KEY)

                res.status(200).json({
                    success: true,
                    message: "Login success",
                    userLogin,
                    token,
                })

            } else {
                res.status(400).json({
                    success: false,
                    message: "password incorrect",
                })
            }
        } else {
            res.status(500).json({
                success: false,
                message: "Try to rigister."
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})



module.exports = user