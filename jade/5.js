const jade = require('jade')

let str = jade.renderFile('5.jade',{pretty:true,json:{
    width:"200px",height:"200px",background:"red"
},
arr:["aaa","sss","fff"]})

console.log(str)