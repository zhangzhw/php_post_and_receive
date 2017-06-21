/**
 * chat.js
 * @authors chn
 * @date    2017-06-21 11:40:56
 */

'use strict';

let socketio = require('socket.io');

// ChatRoom: class for char room
class ChatRoom {

	constructor(server) {
		this._io = socketio(server);
		this._nUsers = 0;
		this._cache = null;

		// Track
		this._io.on('connection', (socket) => {
			let isUser = false;

			socket.on('login', (message) => {
				if (isUser) return;

				socket.label = message.id;
				socket.username = message.username;
				this._nUsers++;
				isUser = true;
				
				console.log(`login: ${socket.username}; ${this._nUsers}`);

				let response = {
					username: socket.username,
					nUsers: this._nUsers
				};
				socket.broadcast.emit('loginned', response);

				this.__cache(message, response);
			});

			socket.on('send message', (data) => {
				console.log(`send: ${socket.username}; ${data}`);

				let response = {
					id: socket.label,
					username: socket.username,
					data: data
				};
				this._io.emit('get message', response);

				this.__cache(data, response);
			});

			socket.on('disconnect', () => {
				if (isUser) {
					this._nUsers--;
					isUser = false;

					console.log(`logout: ${socket.username}; ${this._nUsers}`);

					let response = {
						username: socket.username,
						nUsers: this._nUsers
					};
					socket.broadcast.emit('logouted', response);

					this.__cache(null, response);
				}
			});
		});
	}

	__cache(input, output) {
		this._cache = {
			nUsers: this._nUsers,
			input: input,
			output: output
		};
	}

	get cache() {
		return this._cache;
	}

}

exports = module.exports = ChatRoom;