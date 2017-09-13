// 创建一个服务器，不同的URL请求返回相应的数据

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
	// 1.禁止小图标
	if(req.url == '/favicon.ico'){
		res.end();
		return;
	}
	// 2.拿到客户端请求的URL，并判断路径
	var urlObj = url.parse(req.url);
	var urlPath = urlObj.pathname;
	res.setHeader('Access-Control-Allow-Origin', '*');
	// 3.根据不同的路径返回相应的json数据
	sendData('./data'+urlPath+'.json', res);
	
}).listen(7777);

// 定义函数，用来读取文件
function sendData(filepath, res){
	fs.readFile(filepath, function(err, data){
		if(err == null){
			res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
			res.end(data);
		} else {
			res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
			res.end();
		}
	})
}

console.log('服务器开启成功');

