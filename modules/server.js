var http = require('http');
var colors = require('colors');
var handlers = require('./handlers');
var fs = require('fs')

function start() {
	function onRequest(request, response) {
		console.log('Odebrano zapytanie.'.green);
		console.log("Zapytanie " +request.url + " odebrane.")
		
		
		switch (request.url) {
			case '/':
			case '/start':
				response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});				
				handlers.welcome(request, response);
				break;
			case '/upload':
				response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
				handlers.upload(request, response);
				break;
			case '/show':
				response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
				handlers.show(request, response);
				break;
			case '/style.css':
				fs.readFile('templates/style.css', function(err, html) {
					response.writeHead(200, {'Content-Type': "text/css; charset=utf-8"});
					response.write(html);
					response.end();
				});


				break;
			default:
				handlers.error(request, response);
				
		}
	}
	http.createServer(onRequest).listen(9000);
	console.log('Uruchomiono serwer!'.green);
}
exports.start = start;