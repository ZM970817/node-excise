const express = require('express')
const Static = require('express-static')
const bodyParser = require('./my-body-parser')


const server = express()

server.listen(8080)

// server.use(bodyParser.urlencoded())

// server.use(Static('./www'))

server.post('/user',bodyParser())

server.post('/user',function(req,res,next){
    console.log(req.body)
})