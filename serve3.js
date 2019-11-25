const http = require('http')
const queryString = require('querystring')

http.createServer(function(req,res){
if(req.url.indexOf('?') != -1){
    let arr = req.url.split('?');
    let GET = {};
    url = arr[0]
    GET = queryString.parse(arr[1])
    console.log(url,GET)
    res.write('aaa');
    res.end()
}else{
    url = req.url;
    GET = {}
}
}).listen(8000)