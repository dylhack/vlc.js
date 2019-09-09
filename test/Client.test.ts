const {VLCClient} = require('../src/index.js');

const client = new VLCClient({
    address: '127.0.0.1',
    password: 'rosebud',
    port: '8080'
});

describe('Client', function () {
    it('Client.getStatus', async function () {
        const status = await client.getStatus();
        expect(Object.keys(status)).toEqual([
            "fullscreen",
            "audiodelay",
            "apiversion",
            "currentplid",
            "time",
            "volume",
            "length",
            "random",
            "audiofilters",
            "rate",
            "videoeffects",
            "state",
            "loop",
            "version",
            "position",
            "repeat",
            "subtitledelay",
            "equalizer"
        ]);
    });
    it('Client.getPlaylist', async () => {
        const playlist = await client.getPlaylist();
        expect(Object.keys(playlist)).toEqual([
            'ro',
            'type',
            'name',
            'id',
            'children'
        ])
    })
});
