let io;

module.exports = {
	init: (httpServer) => {
		io = require('socket.io')(httpServer, {
			cors: {
				origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.2.13:3001"],
				methods: ["GET", "POST"]
			}
		});
		return io;
	},
	getIo: () => {
		if (!io) {
			throw new Error('Socket.io not initialized!');
		}
		return io;
	}
};