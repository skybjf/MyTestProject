/**
 * Created by Administrator on 2016/6/20.
 */
var fs = require('fs');
//var path = require('path');
//fs.stat('./test.txt',function(err,stat){
//    console.log(stat);
//});
//fs.readdir('./a',function(){
//    console.log(arguments);
//});
var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
deleteFolderRecursive('./a');