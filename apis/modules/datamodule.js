const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    product_name : {
        type : String
    },
    product_size : {
        type : Number
    },
    product_price : {
        type : Number
    },
    product_quantity  : {
        type : Number
    }, product_description : {
        type : String
    },
     buyer_name : {
        type : String
     }
})

module.exports = mongoose.model("data", dataSchema)