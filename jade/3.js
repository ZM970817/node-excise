const jade = require('jade')


let str = jade.renderFile('4.jade',{pretty:true,name:'zhoumin',a:12,b:5})

console.log(str)