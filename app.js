/**
 * app.js
 * @authors chn
 * @date    2017-06-20 09:18:05
 */

'use strict';

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));

// Route
app.use(express.static(__dirname+'/page'));

// Track chatting
let nUsers = 0;

io.on('connection', (socket) => {
	let isUser = false;

	socket.on('login', (message) => {
		if (isUser) return;

		socket.label = message.id;
		socket.username = message.username;
		nUsers++;
		isUser = true;
		
		console.log(`login: ${socket.username}; ${nUsers}`);

		socket.broadcast.emit('loginned', {
			username: socket.username,
			nUsers: nUsers
		});
	});

	socket.on('send message', (data) => {

		console.log(`send: ${socket.username}; ${data}`);

		io.emit('get message', {
			id: socket.label,
			username: socket.username,
			data: data
		});
	});

	socket.on('disconnect', () => {
		if (isUser) {
			nUsers--;
			isUser = false;

			console.log(`logout: ${socket.username}; ${nUsers}`);

			socket.broadcast.emit('logouted', {
				username: socket.username,
				nUsers: nUsers
			});
		}
	});
});

// Listen
server.listen(app.get('port'), () => {
	console.log('Node server is running on port', app.get('port'));
});