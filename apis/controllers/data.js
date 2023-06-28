const express = require("express")
const data = express.Router()
const dataSchema = require("../modules/datamodule")
const userSchema = require("../modules/usersmodule")
const jwt = require("jsonwebtoken")

data.get("/", async (req, res) => {
    try {
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECURE_KEY

        const headerBody = req.header(headerKey)
        const verify = jwt.verify(headerBody, secureKey)

        if (verify) {

            const userCheck = await userSchema.findOne({
                user_name: verify.user_name
            })


            if (userCheck) {

                if (userCheck.user_role == 'admin') {

                    const dataList = await dataSchema.find()

                    res.status(200).json({
                        success: true,
                        message: "Found data list",
                        dataList
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: "noAccess",
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: "Having issues to connect."
                })
            }

        } else {
            res.status(401).json({
                success: true,
                message: "invalidToken",
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

data.post("/create", async (req, res) => {
    try {
        const headerKey = process.env.JWT_HEADER_KEY
        const secureKey = process.env.JWT_SECURE_KEY

        const headerBody = req.header(headerKey)
        const verify = jwt.verify(headerBody, secureKey)

        if (verify) {

            const userCheck = await userSchema.findOne({
                user_name: verify.user_name
            })


            if (userCheck) {

                if (userCheck.user_role == 'user') {

                    // const creation = new dataSchema({
                    //     product_name : req.body.product_name,
                    //     product_description : req.body.product_description,
                    //     product_price : req.body.product_price,
                    //     product_quantity : req.body.product_quantity,
                    //     product_size : req.body.product_size,
                    // })

                    const creation = new dataSchema({
                        product_name: req.body.product_name,
                        product_description: req.body.product_description,
                        product_price: req.body.product_price,
                        product_quantity: req.body.product_quantity,
                        product_size: req.body.product_size,
                    })
                    
                    const create = await creation.save()

                    res.status(200).json({
                        success: true,
                        message: "successful",
                        create
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: "noAccess",
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: "Having issues to connect."
                })
            }

        } else {
            res.status(401).json({
                success: true,
                message: "invalidToken",
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
})

module.exports = data

