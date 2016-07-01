/**
 * Created by Administrator on 2016/6/20.
 */
var fs = require('fs');
fs.readFile('./bjf.js',function(err,data){
    console.log(data.toString());
})