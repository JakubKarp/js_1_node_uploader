var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
	console.log('Rozpoczynam obsługę żądania uploadu.');
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		fs.renameSync(files.upload.path, 'test.png');
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.write('recived image:<br/>');
		response.write("<img src='/show' />")
		response.end();
	})
}


exports.welcome = function(request, response) {
	console.log('Rozpoczynam obsługę żądania welcome.');
	fs.readFile('templates/start.html', function(err, html) {
		response.writeHead(200, {'Content-Type': "text/html; charset=utf-8"});
		response.write(html);
		response.end();
	});
}

exports.show = function(request, response) {
	fs.readFile('test.png', 'binary', function(err, file) {
		response.writeHead(200, {'Content-Type': "img/png"});
		response.write(file, 'binary');
		response.end();
	})
}



exports.error = function(request, response) {
	console.log('Nie wiem co robić.');
	response.write('Błąd 404!');
	response.end();
}

