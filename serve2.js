const http = require('http')
http.createServer(function(req,res){
    if(req.url.indexOf('?') != -1){
        let GET = {};
        let arr = req.url.split('?')
        url = arr[0];
        let arr1 = arr[1].split('&')
        for(let i=0;i<arr1.length;i++){
           let arr3 = arr1[i].split('=')
           GET[arr3[0]] = arr3[1]
        }
        console.log(url,GET)
    }else{
        url = res.url;
        GET = {}
    }

res.write('aaa')
res.end()
}).listen(8080)