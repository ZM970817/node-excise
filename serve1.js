const http = require('http')
const fs = require('fs')

http.createServer(function(req,res){
let files_name = './www'+req.url;
fs.readFile( files_name ,function(err,data){
    if(err){console.log(err)}
    else{
        res.write(data)
    }
    res.end()
})
fs.writeFile('./www/3.txt','练习练习练习',function(err){
    if(err){
        console.log(err)
    }
})
}).listen(8080);
