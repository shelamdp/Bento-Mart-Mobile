require('dotenv').config()

const cors = require("cors")
const express = require('express')
const router = require('./routes')
const { mongoConnect } = require('./config/mongo')
const app = express()
const port = process.env.PORT || 4001
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)


mongoConnect().then(async (database) => {
    console.log("mongodb connect!")
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
})
