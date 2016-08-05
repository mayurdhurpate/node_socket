var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;



app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

  console.log('a user connected'+io.engine.clientsCount);
  var clientIp = socket.request.connection.remoteAddress;
  io.emit('chat message', clientIp+" connected! No. of clients: "+ io.engine.clientsCount);
  io.on('connection', function(socket){
	  socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	  });
	  socket.on('disconnect', function(){
	    var clientIp = socket.request.connection.remoteAddress;
        io.emit('chat message', clientIp+" disconnected! No. of clients: "+ io.engine.clientsCount);
	  });
  });
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});