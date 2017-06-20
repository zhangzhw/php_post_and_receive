/**
 * main.js
 * @authors chn
 * @date    2017-06-20 16:12:20
 */

'use strict';

(function () {
	var id = getTimestamp();
	var socket = io();

	$('#login-modal').on('show.bs.modal', function () {
		var dialog = $(this).find('.modal-dialog').first();
		var height = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		var dialogHeight = dialog.height();
		dialog.css({ 'margin': (height-dialogHeight)/2+'px auto' });
	});

	$('#login-modal').modal('show');

	var vmChatRoom = new Vue({
		el: '#vm-chatroom',
		data: {
			talk: '',
			messages: []
		},
		methods: {
			send: function () {
				if (this.talk === '') return;
				socket.emit('send message', this.talk);
				this.talk = '';
			},
			append: function (message) {
				message.timestamp = getTimestamp();
				this.messages.push(message);
			}
		}
	});

	new Vue({
		el: '#vm-username',
		data: {
			username: ''
		},
		methods: {
			login: function () {
				if (this.username === '') return;
				socket.emit('login', {
					id: id,
					username: this.username
				});
				$('#login-modal').modal('hide');
			}
		}
	});

	socket.on('get message', function (data) {
		if (id !== data.id) {
			vmChatRoom.append({
				type: 0,
				username: data.username,
				data: data.data
			});
		} else {
			vmChatRoom.append({
				type: 3,
				username: data.username,
				data: data.data
			});
		}
		
	});

	socket.on('loginned', function (data) {
		vmChatRoom.append({
			type: 1,
			username: data.username,
			data: data.nUsers
		});
	});

	socket.on('logouted', function (data) {
		vmChatRoom.append({
			type: 2,
			username: data.username,
			data: data.nUsers
		});
	});

	function getTimestamp() {
		return Date.now().toString() + Math.random().toString().substring(2);
	}
})();