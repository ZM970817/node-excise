# node-excise
a note of learning nodejs 
一:nodejs自带的模块和原生的基本写法

1.使用nodejs运行程序  不监听的话就是和普通的命令行一样  并不能称之为服务器。
2.没有运用到框架之前  nodejs中的http模块自带了一个createServer服务器  通过引入http模块 并且用http.createServer()创建一个服务器  创建服务器后  还应该对它进行监听  这样才不会运行完就结束  起到服务端的作用
3.http.createServer中有一个回调函数,其中有两个参数,一个req,一个res分别是处理请求发送过来的数据和要返还给前端的数据
4.学习了 nodejs中的文件读写模块  分别是 fs.readFile() 和 fs.writeFile()  readFile 中携带两个参数   一个是要读文件的地址,一个是读取文件后的回调函数,而回调函数中也携带了两个参数,一个是error表示读取文件时所发生的的错误,一个是data表示读到的文件  writeFile 中携带三个参数,一个是要写入文件的地址,一个是要写入文件的内容,第三个就是写入文件的回调函数,这个回调函数中就只有error这一个参数,表示写入文件时发生的错误
5.学习了nodejs中的querystring模块的使用,原生的方法中使用req.url来获取请求的地址和携带的参数,单req.url的格式是http://www.baidu.com/XXX?username=XXX&password=XXX而querystring只能处理后面参数的部分  使用querystring.parse  可以见后面参数部分拆解为json格式 
6.学习了nodejs中的url模块的使用 url可以拆解整个网址部分   其中pathname是请求的地址部分就是/XXX这里  query就是后面的username=XXX&password=XXX部分  url模块的使用:url.parse(要解析的网址,true)  后面的这个true就是将query部分分解成json格式
7.除了用querystring和url这两种方式,解析请求发送过来的数据还有一种就是自己手动解析,拼成json
8.运用6,7,8可以获取请求的路径和get参数 但是post请求方式和get请求方式区别在于:get方式请求参数是跟在请求地址后面的,post方式请求参数是在消息中的body里的,并且当post数据的数据量过大的时候,请求的参数是分次数发送的,这就导致了处理get数据和post数据之间的差别 处理post数据时要用到res.on()  当正在接收请求数据时这里面的两个参数分别是data和一个回调函数,data就是分段发送过来的post数据   当数据发送完毕就用到res.on('end',function(){})来接收一整个post数据  接收到的数据格式是username=XXX&password=XXX  这里面就需要用到querystring来解析数据
9.学习了nodejs中的express框架,学习了express-static中间件的使用,实际上就是一个函数,在读取静态资源文件的时候调用这个函数就好,函数中有一个参数,代表要访问的静态资源文件路径
10.学习了nodejs的body-parser中间件,使用的时候首先要引用body-parser 和 express-static的使用方法一样  直接在express().use中使用就可以了  用body-parser解析post数据使用其中的urlencoded()即可,经过这一部处理之后   后面的req中才会有req.body这个参数   否则是没有的   必须经过body-parder中的urlencoded解析
11.express()的use中有两个参数   第一个参数也可以不带  第一个是处理的地址   第二个是回调函数,回调函数中也有三个参数,第一个是req,第二个是res,第三个是next   在流试操作中第三个参数是必须的   并且处理的路径要是相同的才会形成正常的流试操作
12.学会自己使用写中间件,写中间件都是用原生的一些方法去做.module.exports抛出去的是什么东西   引进来的就是什么东西   对象就是对象函数就是函数,想要做成XXX.XXX()这样子的东西,就自己一层层封装加功能
13.cookie和session:cookie空间小,安全性差,数据都是明文展示的,但是可以对需要的数据做签名处理 这样即使数据改过也知道  而session是保存在服务器端的,它的安全性比cookie要高,并且运用的空间大,但是它是基于cookie存在的,并不能单独使用.并且还存在session劫持的风险.  在运用cookie的时候主要是有关于它的读取,发送,删除
  1.cookie的读取,读取主要是在req上面,并且要运用到cookie-parser这个中间件,如果这个cookie是签过名的cookie,那么在读取的时候,要在cookie-parser这个函数中加上签过名的字符串,并且获取的时候,要分情况获取,获取米有签过名的cookie时要用req.cookies,但是获取签过名的cookie时要用req.signedCookies
  2.cookie的发送,直接在访问路径下面加上res.cookie就可以向前端发送cookie,在这个函数中有三个参数,第一个是cookie的名字,第二个是cookie的值,第三个是一个json,json中有path/signed/maxAge等参数,其中path是cookie要发送的路径,signed是选择签名与否,maxAge是选择最大过期时间
  3.cookie的删除,res.clearCookie('要删除的cookie的名称')
session的使用要用到cookie-session这个中间件,在cookie-session中存放一个json,json中必须有keys这个参数为session进行加密,还有name就是session的名字,还有maxAge等参数
14.jade和ejs模板引擎  
   jade:一种侵入式的模板引擎,脱离了jade模板引擎就不能使用 用缩进来表示层级  属性用括号写在后面  标签中的值只需要空一格就可以显示  属性还有另外一种写法 就是div&attributes({属性:值,属性,值})  除此之外还有两个特殊的东西就是class 和 style  这两个可以直接使用属性的方法去处理,就是div(style="height:200px,width:200px")这样  还可以用对象的方法  div(style={属性:值,属性:值})  而class与style不同的是  style可以看成是一个对象,因为其本身的格式就是像对象一样,而class则可以看成一个数组,class的写法 也有两种  一种就是按照属性的方式div(class="aaa bbb ccc")另外一种就是按照数组的形式 div(class=['aaa','bbb','ccc'])  jade的渲染方式:首先  cnpm install jade  把jade引入到要使用的模块中  jade中有一个render方法  方法中存放要渲染的字符串  就如  jade.render('要渲染的字符串'),使用这种方式的话,可以首先可以用fs模块中的readFile方法将写好的jade文件读出来  再扔到render方法中 方法中有两个参数 第一个是要渲染的字符串   第二个是一个json  常用的有调试用到的pretty:true  就可以美化渲染出来的jade文件   除此之外 jade中有一个专门渲染jade文件的方法  叫做renderFile()  这个方法中可以存放2个参数 第一个是要渲染的文件路径  第二个是一个json  和render()方法一样  json中还可以存放一些jade文件中的变量
   总之,jade的render和renderFile方法  与fs中的readFile和writeFile配合使用  就可以完成 jade->渲染->html文件->显示这一过程
   ejs:ejs和jade有点不同 它是一种很温和的模板引擎  离开了ejs这个模板还是可以将就继续使用   使用ejs的方法和jade一样,首先要cnpm instlal ejs  引入到要使用的文件中,ejs中也有一个renderFile方法  只不过其中含有三个参数