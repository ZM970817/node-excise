const jade = require('jade');
const fs = require('fs')

fs.readFile('1.jade',function(error,data){
    if(error){console.log(error)}
    else{
        let str = jade.render(data,{pretty:true})
        console.log(str)
    }
})