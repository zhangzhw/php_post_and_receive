/**
 * app.js
 * @authors chn
 * @date    2017-06-20 09:18:05
 */

'use strict';

require("appdynamics").profile({
	controllerHostName: 'heroku-4709.saas.appdynamics.com',
	controllerPort: 443, // If SSL, be sure to enable the next line
	controllerSslEnabled: true,
	accountName: 'heroku-4709',
	accountAccessKey: '8k7fpd4zenz9',
	applicationName: 'Applicationcontroller',
	tierName: 'Tiercontroller',
	nodeName: 'process' // The controller will automatically append the node name with a unique number
});

let express = require('express');
let app = express();
let server = require('http').Server(app);
const ChatRoom = require('./chat');

app.set('port', (process.env.PORT || 5000));

// Route
app.use(express.static(__dirname+'/page'));

// Create a chat room
new ChatRoom(server);

// Listen
server.listen(app.get('port'), () => {
	console.log('Node server is running on port', app.get('port'));
});