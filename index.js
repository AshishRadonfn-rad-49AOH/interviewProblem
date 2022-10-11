const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require("./route/routes")

const app = express()

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://ashish2132:2vnf5TGDQgRP7ydu@cluster0.czfb8.mongodb.net/test-21", { useNewUrlParser: true })
.then(() => console.log("MongoDb is Connected..."))
.catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, ()=>
    console.log("Express App Running On Port 3000")
)