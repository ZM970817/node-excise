const http = require('http');
const fs = require('fs');
const urllib = require('url');
const queryString = require('querystring')

http.createServer(function (req, res) {
    if (req.url.pathname == './user') { //这里暂时就认为只要是请求/user的就是请求接口，否则就是请求文件
        //1.解析数据
        let str = "";
        req.on('data', function (data) {
            str += data
        });
        req.on('end', function () {
            let Obj = urllib.parse(req.url, true)
            url = Obj.pathname;
            GET = Obj.query;
            POST = queryString.parse(str)
            //2.写登陆注册的逻辑
            let user = {};
            switch (GET.act) {
                case 'login':
                    //1.登陆状态下  首先要判断数据库中有没有这个用户  如果没有就失败  如果有的话就看用户名与密码是否对应
                    if(user[GET.username]){
                        if(user[GET.username] == GET.password){
                            res.write('{"ok":true,"msg":登录成功"}')
                        }else{
                            res.write('{"ok":false,"msg":"用户名或密码错误！"}')
                        }
                    }else{
                        res.write('{"ok":false,"msg":"此用户不存在！"}')
                    }
                    break;
                case 'register':
                    //2.在注册状态下 首先要看数据库中有没有这个用户   如果没有的话就可以通过注册  如果有的话就提示失败
                    if(user[GET.username]){
                        res.write('{"ok":false,"msg":此用户已存在}')
                    }else{
                        user[GET.username] = GET.password;
                        res.write('{"ok":true,"msg":注册成功！}')
                    }
                    break;
                default: res.write('{"ok":false,"msg":"未知的ACT"}')
            }
            res.end()
        })
    } else {
        //1.读取文件
        let files_name = './www' + url;
        fs.readFile(files_name, function (err, data) {
            if (err) { res.write('404') }
            else {
                res.write(data)
            }
            res.end()
        })
    }
}).listen(8080);

//首先要定义一个接口用于区分还是登录
// http://localhost:8080/user?act=register&username=zhoumin&password=123456   这就是注册
//http://localhost:8080/user?act=login&username=zhoumin&password=123456   这就是登录
//还要区分是文件的读取还是请求的接口