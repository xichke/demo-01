'use strict';

const socketIo = require('socket.io');

module.exports = async (server, app) => {
	let io = socketIo(server);

	// const nsp = io.of('/checkin');
	// nsp.on('connection', function(socket) {
	// 	console.log('someone connected');
	// 	socket.broadcast.emit('checkin', );
	// });

	io.on('connection', function(socket) {
		socket.on('disconnect', function() {
			//
		});

		socket.on('operator', function(data) {
			socket.join(data._id);
		});
	});

	app.io = io;

	//socket.broadcast.to('priv/John').emit(...)


	// io.on('connection', (socket) => {
	// 	console.log('a user connected');
	// 	socket.broadcast.emit('hi');
	// 	socket.on('disconnect', function() {
	// 		console.log('user disconnected');
	// 	});
	// });
};