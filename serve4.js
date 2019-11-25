const http = require('http')
const urllib = require('url')

http.createServer(function(req,res){
  if(req.url.indexOf('?') != -1){
     let GET;
     let OBJ = urllib.parse(req.url,true)
     url = OBJ.pathname
     GET = OBJ.query
     res.write('1111');
     res.end()
     console.log(url,GET)
  }else{
      url = req.url;
      GET = {}
  }
}).listen(8001)