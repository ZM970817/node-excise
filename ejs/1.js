const ejs = require('ejs')

ejs.renderFile('1.ejs',{name:"blue"},function(error,data){
    if(error)console.log('编译失败')
    else console.log(data)
})