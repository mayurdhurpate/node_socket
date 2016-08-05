var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendfile('templates/index.html');
});

app.get('/game', function(req, res){
  res.sendfile('templates/game.html');
});

io.on('connection', function(socket){  
  var clientIp = socket.request.connection.remoteAddress;
  io.emit('chat message', clientIp+" connected! No. of clients: "+ io.engine.clientsCount);
	console.log(clientIp+" connected! No. of clients: "+ io.engine.clientsCount);

  socket.on('chat message', function(msg){
	  io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
	var clientIp = socket.request.connection.remoteAddress;
    io.emit('chat message', clientIp+" disconnected! No. of clients: "+ io.engine.clientsCount);
    console.log(clientIp+" disconnected! No. of clients: "+ io.engine.clientsCount);
	});
 
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});