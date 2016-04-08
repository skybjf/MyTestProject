var http =require('http');
var fs =require('fs');
var path = require('path');
var mime = require('mine');
var cache={};

function send404(response){
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('Error 404: resourse not found.');
	response.end();
}

function sendFile(response,filePath,fileContents){
	response.writeHead(200,{"content-type":mime.lookup(path.basename(filePath));})
	response.end(fileContents);
}









