require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 4000
const app = express()
const router = require("./routes")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log("app running at port " + port)
})