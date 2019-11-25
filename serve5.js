const http = require('http')
const fs = require('fs')
const urllib = require('url')
const queryString = require('querystring')

http.createServer(function (req, res) {
    // if (req.url.indexOf('?') != -1) {
        //解析get数据
        let GET = {};
        let Obj = urllib.parse(req.url, true)
        url = Obj.pathname
        GET = Obj.query
        //解析post数据
        let str = ''
        req.on('data', function (data) {
            str += data
        });
        req.on('end', function () {
           const POST = queryString.parse(str);
             //读取文件
            let files_name = './www' + url
            fs.readFile(files_name, function (err, data) {
                if (err) { console.log(err) }
                else {
                    res.write(data);
                }
                res.end()
            })
            console.log(url, GET, POST)
            })
    // } else {
        // url = req.url
    // }

}).listen(8080)