const mongoose = require("mongoose")
const env = require("dotenv")
env.config()
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true})

try {
    mongoose.connection
    console.log("succesfully connected database")
} catch (error) {
    console.log(error, "connections failed")
}
