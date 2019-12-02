const jade = require('jade')


let str = jade.renderFile('3.jade',{pretty:true})

console.log(str)