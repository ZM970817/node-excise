const jade = require('jade')
const fs = require('fs')


let str = jade.renderFile('1.jade',{pretty:true})

fs.writeFile('../www/jade.html',str,function(error){
    if(error)
      console.log("写入失败")
    else
      console.log("写入成功")
})