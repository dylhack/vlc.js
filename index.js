module.exports = {
	Client: require('./src/Client.js'),
	command: require('./src/commands'),
	route: {
		status: require('./src/routes/status'),
		playlist: require('./src/routes/playlist')
	}
};
