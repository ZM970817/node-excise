const express = require('express')
const Static = require('express-static')
const bodyParser = require('body-parser')

const server = express()

server.listen(8080)

server.use(bodyParser.urlencoded())
server.post('/',function(req,res){
 console.log(req.body)
})

server.use(Static('./www'))