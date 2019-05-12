/**
 * Promise-oriented VLC Client
 * Includes routes & commands
 * @author dylhack
 */
const status = require("./routes/status.js");
const playlist = require("./routes/playlist.js");
const {
	add,
	empty,
	fullscreen,
	loop,
	next,
	pause,
	play,
	previous,
	remove,
	repeat,
	shuffle,
	volume
} = require("./commands/index.js");

/**
 * @constructor
 * @param {Object}  details  [Login details]
 * - @prop {String} username [default: ""]
 * - @prop {String} password [default: ""]
 * - @prop {String} address  [default: "127.0.0.1"]
 * - @prop {Number} port     [default: "9090"]
 * @returns {Client}
 */
module.exports = class Client {
	constructor(details) {
		this.details = details;
	}

	// {@link}: http://127.0.0.1/requests/status.json
	// returns {Promise}
	getStatus() {
		return new Promise((res, rej) => {
			status(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			});
		});
	}

	// {@link}: http://127.0.0.1/requests/playlist.json
	// returns {Promise}
	getPlaylist() {
		return new Promise((res, rej) => {
			playlist(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			});
		});
	}

	// Add song based on MRL (media resource locator)
	add(mrl) {
		return new Promise((res, rej) => {
			if (mrl) {
				add(this.details, mrl, (err, data) => {
					if (err) rej(err);
					else res(data);
				})
			} else rej(new Error("Did not provide a MRL"))
		});
	}

	// Clear playlist
	empty() {
		return new Promise((res, rej) => {
			empty(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			});
		})
	}

	// Toggle fullscreen (pretty useless)
	fullscreen() {
		return new Promise((res, rej) => {
			fullscreen(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Loop playlist
	loop() {
		return new Promise((res, rej) => {
			loop(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Play next song
	next() {
		return new Promise((res, rej) => {
			next(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Pause current song 
	// If used again it will resume the song
	pause() {
		return new Promise((res, rej) => {
			pause(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Play song based on ID
	// If no ID is provided it'll play current song (restart / unpause)
	play(id) {
		return new Promise((res, rej) => {
			play(this.details, id, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Play previous song
	previous() {
		return new Promise((res, rej) => {
			previous(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Remove song based on ID
	// If no ID is provided it'll remove current song
	remove(id) {
		return new Promise((res, rej) => {
			remove(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Repeat song
	repeat() {
		return new Promise((res, rej) => {
			repeat(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Shuffle playlist
	shuffle() {
		return new Promise((res, rej) => {
			shuffle(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	// Set volume
	volume(value) {
		return new Promise((res, rej) => {
			volume(this.details, value, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}
};
