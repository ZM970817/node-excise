const http = require('http')
 http.createServer(function(req,res){
  console.log(req.url);
  switch(req.url){
      case '/1.html' : res.write('aaa');
      break;
      case '/2.html' : res.write('bbb');
      break;
  }
  res.end()
 }).listen(8080)