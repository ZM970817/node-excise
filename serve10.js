const express = require('express')
const expressStatic = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

//cookie读取  发送 删除 

const server = express()

server.listen(8888)
server.use(cookieParser('dsafdsateastfsdf'))
server.use(cookieSession({
    name:'session_id',
    keys:['11','11','gg','ff'],
    maxAge:30*24*3600*1000
}))

server.use('/',function(req,res,next){
    //1.发送cookie
    res.cookie('zzz','1111',{path:'/',signed:true,maxAge:30*24*60*60*1000})
    //2.接收cookie
    console.log(req.signedCookies)
    console.log(req.cookies)
    //设置session
    if(req.session['count'] == null){
        req.session['count'] = 1
    }else{
        req.session['count']++
    }
    console.log(req.session)
    next();
})

server.use('/',function(req,res){
    //3.删除cookie
    res.clearCookie('zzz')
    res.send('ok');
})