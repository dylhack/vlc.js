# VLC.js
A HTTP Endpoint wrapper for VLC. Three parts to this wrapper; commands, routes, and client. The wrapper is callback-oriented, but the Client returns promises for each method and will resolve with VLC status.

## Routes
 - [status](./src/routes/status.js), 
   - This will retrieve the status of VLC
   - Client.getStatus()	
 - [playlist](./src/routes/playlist.js), 
   - This will retreive the current playlist.
   - Client.getPlaylist()

## Commands
 - [add](./src/commands/add.js)
   - Add a song based on MRL
   - Client.add(mrl)
 - [empty](./src/commands/empty.js)
   - Empty playlist
   - Client.empty()
 - [fullscreen](./src/commands/fullscreen.js)
   - Toggle fullscreen (pretty useless)
   - Client.fullscreen()
 - [loop](./src/commands/loop.js)
   - Loop playlist
   - Client.loop()
 - [next](./src/commands/next.js)
   - Plays next song
   - Client.next()
 - [pause](./src/commands/pause.js)
   - Toggle pause
   - Client.pause()
 - [play](./src/commands/play.js)
   - Play song based on ID. 
   - If an ID is not provided it'll unpause or restart current song.
   - Client.play(id)
 - [previous](./src/commands/previous.js)
   - Play previous song
   - Client.previous()
 - [remove](./src/commands/remove.js)
   - Remove song based on ID
   - If no ID is provided it'll remove the current song
   - Client.remove(id)
 - [repeat](./src/commands/repeat.js)
   - Repeat song
   - Client.repeat()
 - [shuffle](./src/commands/shuffle.js)
   - Toggle shuffle
   - Client.shuffle()
 - [volume](./src/commands/volume.js)
   - Set volume based on value
   - Client.volume(value)
