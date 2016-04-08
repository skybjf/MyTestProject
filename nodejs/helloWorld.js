var http=require("http");
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.write('<h1>Hello World</h1>');
	res.end('<p>加油加油~~</p>');
}).listen(3000);
console.log("3000服务器已经被打开");