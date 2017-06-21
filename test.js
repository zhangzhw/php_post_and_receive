/**
 * test.js
 * @authors chn
 * @date    2017-06-21 12:15:25
 */

'use strict';

let http = require('http').Server;
let ioc = require('socket.io-client');
const ChatRoom = require('./chat');
import test from 'ava';

// Create a socket.io client for the given server
function client(server, namespace, options) {
	if ('object' == typeof namespace) {
		options = namespace;
		namespace = null;
	}

	let address = server.address();
	if (!address) address = server.listen().address();
	let url = 'ws://localhost:' + address.port + (namespace || '');
	return ioc(url, options);
}

// Wait some time
function wait(time) {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
}

// Test list
test('1 client login', t => {
	let port = 12700, id = '00001', username = 'test1';
	let server = http();
	let chatroom = new ChatRoom(server);

	server.listen(port);
	let socket = client(server);
	let request = { id: id, username: username };
	socket.emit('login', request);

	return wait(1000).then(() => {
		t.deepEqual(chatroom.cache, {
			nUsers: 1,
			input: request,
			output: { username: username, nUsers: 1 }
		}, '[Test failed]server state unmatch');
		server.close((error) => {
			t.is(error, undefined, '[Test failed]cannot close server');
		});
	});
});

test('1 client send message', t => {
	let port = 12701, id = '00002', username = 'test2';
	let server = http();
	let chatroom = new ChatRoom(server);

	server.listen(port);
	let socket = client(server);
	socket.emit('login', { id: id, username: username });
	let request = 'test sending message2';
	socket.emit('send message', request);

	return wait(2000).then(() => {
		t.deepEqual(chatroom.cache, {
			nUsers: 1,
			input: request,
			output: { id: id, username: username, data: request }
		}, '[Test failed]server state unmatch');
		server.close((error) => {
			t.is(error, undefined, '[Test failed]cannot close server');
		});
	});
});

test('1 client logout', t => {
	let port = 12702, id = '00003', username = 'test3';
	let server = http();
	let chatroom = new ChatRoom(server);

	server.listen(port);
	let socket = client(server);
	socket.emit('login', { id: id, username: username });
	socket.emit('send message', 'test sending message3');

	return wait(2000).then(() => {
		socket.close();
		return wait(1000);
	}).then(() => {
		t.deepEqual(chatroom.cache, {
			nUsers: 0,
			input: null,
			output: { username: username, nUsers: 0 }
		}, '[Test failed]server state unmatch');
		server.close((error) => {
			t.is(error, undefined, '[Test failed]cannot close server');
		});
	});
});

test.todo('will consider further tests later');