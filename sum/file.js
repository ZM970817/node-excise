const express = require('express')
const multer = require('multer')
const pathLib = require('path')
const fs = require('fs')

let server = express()

server.listen(8000)

let multerObj = multer({dest:'./upload/'})


server.use(multerObj.any())
server.use('/1.html',function(req,res,next){
    let new_name = req.files[0].path + pathLib.parse( req.files[0].originalname).ext
    fs.rename(req.files[0].path,new_name,function(error){
        if(error) console.log(error)
        else console.log('成功!')
    })
})

