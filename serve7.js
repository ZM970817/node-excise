const express = require('express')
const Static = require('express-static')

const server = express();

server.listen(8080);


server.get('/user',function(req,res){
 let userpoor = {'zhoumin':'123456','tupaopao':'456789'}
   if(userpoor[req.query.username] == null){
       res.send({'ok':false,'msg':'用户不存在!'});
       res.end();
   }else if(userpoor[req.query.username] != req.query.password){
       res.send({'ok':false,'msg':'用户名或密码错误!'});
       res.end();
   }else{
       res.send({'ok':true,'msg':'登录成功!'})
   }
})

server.post('/user',function(req,res){

})
server.use(Static('./www'))

