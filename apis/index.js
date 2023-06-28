const express = require("express")
const app = express()
const database = require("./database/database")
const user = require("./controllers/users")
const data = require("./controllers/data")
const env = require("dotenv")
const cors = require("cors")

app.use(cors({origin : "*"}))

env.config()

app.listen(4000, (err, res)=>{
    if (err) {
        console.log("error")
    } else {
        console.log("server listening at 4000")
    }

})

app.get('/', (req, res)=>{
    try {
        res.json("its working")
    } catch (error) {
        res.json(error)
    }
})

app.use(express.json())

app.use("/user", user)
app.use("/data", data)
