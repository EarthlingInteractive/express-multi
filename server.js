"use strict";

const cluster = require('cluster');
const express = require('express');
const app = express();
const cpu = 4;

if(cluster.isMaster) {
	console.log(`Master process (${process.pid}) is forking`);

	// save references to workers
	let workers = [];
	for(let i = 0; i < cpu; i++) {
		workers.push(cluster.fork());
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});

} else {
	console.log(`Worker process (${process.pid}) is starting...`);

	app.get('/', (req, res)=> {
		res.send('hello world');
	});

	app.listen(3000, () => {
		console.log('express-multi listening on port 3000!');
	});
}

