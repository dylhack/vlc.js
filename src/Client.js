/**
 * Promise-oriented VLC Client.
 * This Client uses everything
 * in src/commands & src/routes.
 *
 * Every command resolves with VLC's
 * status.json. All the actual communication
 * with VLC is done in src/workers
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
	
	/**
	 * @method add
	 * @desc Add song based on MRL (media resource locator)
	 * @param {String} mrl
	 * @returns {Promise<Status>}
	 */
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

	/**
	 * @method empty
	 * @desc Clear playlist
	 * @returns {Promise<Status>}
	 */
	empty() {
		return new Promise((res, rej) => {
			empty(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			});
		})
	}

	/**
	 * @method fullscreen
	 * @desc Toggle fullscreen (pretty useless)
	 * @returns {Promise<Status>}
	 */
	fullscreen() {
		return new Promise((res, rej) => {
			fullscreen(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method loop
	 * @desc Loop playlist
	 * @returns {Promise<Status>}
	 */
	loop() {
		return new Promise((res, rej) => {
			loop(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method next
	 * @desc Play next song
	 * @returns {Promise<Status>}
	 */
	next() {
		return new Promise((res, rej) => {
			next(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method puase
	 * @desc Pause current song.
	   If used again it will resume the current song
	 * @returns {Promise<Status>}
	 */
	pause() {
		return new Promise((res, rej) => {
			pause(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method play
	 * @desc Play song based on ID
	   If no ID is provided it'll play current song (restart / unpause)
	 * @param {String} id
	 * @returns {Promise<Status>}
	 */
	play(id) {
		return new Promise((res, rej) => {
			play(this.details, id, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method previous
	 * @desc Play previous song
	 * @returns {Promise<Status>}
	 */
	previous() {
		return new Promise((res, rej) => {
			previous(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method remove
	 * @desc Remove song based on ID
	   If an ID is provided it'll remove current song
	 * @param {String} id
	 * @returns {Promise<Status>}
	 */
	remove(id) {
		return new Promise((res, rej) => {
			remove(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/** 
	 * @method repeat
	 * @desc Repeat the current song
	 * @returns {Promise<Status>}
	 */
	repeat() {
		return new Promise((res, rej) => {
			repeat(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}
 
	/**
	 * @method shuffle
	 * @desc Shuffle playlist
	 * @returns {Promise<Status>}
	 */
	shuffle() {
		return new Promise((res, rej) => {
			shuffle(this.details, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}

	/**
	 * @method volume
	 * @desc Set volume
	 * @param {String || Number} value
	 * @returns {Promise<Status>}
	 */
	volume(value) {
		return new Promise((res, rej) => {
			volume(this.details, value, (err, data) => {
				if (err) rej(err);
				else res(data);
			})
		})
	}
};
