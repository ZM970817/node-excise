const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser =require('body-parser')
const exxpressStatic = require('express-static')


let server = express();

server.listen(8080);

//1.解析cookie
server.use(cookieParser('sdgfdsafsa'))
//2.使用session
let arr=[];
for(let i=0;i<=1000;i++){
 arr[i] = 'lala_key'+Math.random()
}
server.use(cookieSession({
    name:'session_id',
    keys:arr,
    maxAge:20*3600*1000
}))
server.use('/login',function(req,res){
 console.log('cookies',req.cookies['Webstorm-bbf7ba1a'])  //取cookie
 res.cookie('zhoumin','8888888',{signed:true,maxAge:20*3600*1000})  //发cookie
 if(req.session['session_id'] == null){ //设置session
    req.session['session_id'] = 1
 }else{
    req.session['session_id']++
 }
 res.clearCookie('zhoumin0') //删cookie
 delete req.session['session_id'] //删除session
 res.end()
})
//3.解析post数据
server.use(bodyParser.urlencoded({extended:false}))

server.post('/1.html',function(req,res){
    res.send('post数据')
    console.log('post数据',req.body)
    res.end()
})

//4.静态资源文件处理
server.use(exxpressStatic('./www'))
