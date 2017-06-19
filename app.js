/**
 * app.js
 * @authors chn
 * @date    2017-06-19 19:18:07
 */

'use strict';

let express = require('express');

let app = express();

const STATIC_PATH = __dirname + '/src/';

// add static page
app.get('/', (req, res) => {
	res.sendFile(STATIC_PATH+'index.html');
});

app.listen(8080);