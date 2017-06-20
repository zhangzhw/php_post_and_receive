/**
 * app.js
 * @authors chn
 * @date    2017-06-20 09:18:05
 */

'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('chat message', (message) => {
		io.emit('chat message', message);
	});
});

http.listen(app.get('port'), () => {
	console.log('Node server is running on port', app.get('port'));
});