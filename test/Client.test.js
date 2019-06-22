/* eslint-disable no-undef */
/**
 * @file Client.test.js
 * @description For performing tests on the promise-oriented client.
 * NOTE: Have VLC's http server running with proper credentials
 */
const vlc = require('../index.js');

const client = new vlc.Client({
  password: 'password',
  address: '127.0.0.1',
  port: 9090,
});


describe('Testing promise-oriented client', () => {
  test('Testing getStatus', () => {
    client.getStatus()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing getPlaylist', () => {
    client.getPlaylist()
      .then((pl) => {
        expect(pl).any(Object);
      });
  });

  test('Testing add', () => {
    client.add('https://www.youtube.com/watch?v=wZ9gzp1AL88')
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing empty', () => {
    client.empty()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing fullscreen', () => {
    client.fullscreen()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing loop', () => {
    client.loop()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing next', () => {
    client.next()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing pause', () => {
    client.pause()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing play', () => {
    client.play()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing previous', () => {
    client.previous()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing remove', () => {
    client.remove()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing repeat', () => {
    client.repeat()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing shuffle', () => {
    client.shuffle()
      .then((status) => {
        expect(status).any(Object);
      });
  });

  test('Testing volume', () => {
    client.volume(50)
      .then((status) => {
        expect(status).any(Object);
      });
  });
});
