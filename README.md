# node-excise
a note of learning nodejs 
一:nodejs自带的模块和原生的基本写法

1.使用nodejs运行程序  不监听的话就是和普通的命令行一样  并不能称之为服务器。
2.没有运用到框架之前  nodejs中的http模块自带了一个createServer服务器  通过引入http模块 并且用http.createServer()创建一个服务器  创建服务器后  还应该对它进行监听  这样才不会运行完就结束  起到服务端的作用
3.http.createServer中有一个回调函数,其中有两个参数,一个req,一个res分别是处理请求发送过来的数据和要返还给前端的数据
4.学习了 nodejs中的文件读写模块  分别是 fs.readFile() 和 fs.writeFile()  readFile 中携带两个参数   一个是要读文件的地址,一个是读取文件后的回调函数,而回调函数中也携带了两个参数,一个是error表示读取文件时所发生的的错误,一个是data表示读到的文件     writeFile 中携带三个参数,一个是要写入文件的地址,一个是要写入文件的内容,第三个就是写入文件的回调函数,这个回调函数中就只有error这一个参数,表示写入文件时发生的错误
5.学习了nodejs中的querystring模块的使用,原生的方法中使用req.url来获取请求的地址和携带的参数,单req.url的格式是http://www.baidu.com/XXX?username=XXX&password=XXX而querystring只能处理后面参数的部分  使用querystring.parse  可以见后面参数部分拆解为json格式 
6.学习了nodejs中的url模块的使用 url可以拆解整个网址部分   其中pathname是请求的地址部分就是/XXX这里  query就是后面的username=XXX&password=XXX部分  url模块的使用:url.parse(要解析的网址,true)  后面的这个true就是将query部分分解成json格式
7.除了用querystring和url这两种方式,解析请求发送过来的数据还有一种就是自己手动解析,拼成json
8.运用6,7,8可以获取请求的路径和get参数 但是post请求方式和get请求方式区别在于:get方式请求参数是跟在请求地址后面的,post方式请求参数是在消息中的body里的,并且当post数据的数据量过大的时候,请求的参数是分次数发送的,这就导致了处理get数据和post数据之间的差别 处理post数据时要用到res.on()  当正在接收请求数据时这里面的两个参数分别是data和一个回调函数,data就是分段发送过来的post数据   当数据发送完毕就用到res.on('end',function(){})来接收一整个post数据  接收到的数据格式是username=XXX&password=XXX  这里面就需要用到querystring来解析数据
9.学习了nodejs中的express框架,学习了express-static中间件的使用,实际上就是一个函数,在读取静态资源文件的时候调用这个函数就好,函数中有一个参数,代表要访问的静态资源文件路径
10.学习了nodejs的body-parser中间件,使用的时候首先要引用body-parser 和 express-static的使用方法一样  直接在express().use中使用就可以了  用body-parser解析post数据使用其中的urlencoded()即可,经过这一部处理之后   后面的req中才会有req.body这个参数   否则是没有的   必须经过body-parder中的urlencoded解析
11.express()的use中有两个参数   第一个参数也可以不带  第一个是处理的地址   第二个是回调函数,回调函数中也有三个参数,第一个是req,第二个是res,第三个是next   在流试操作中第三个参数是必须的   并且处理的路径要是相同的才会形成正常的流试操作
