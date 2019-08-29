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
  port: 9090
});

describe('client', () => {
  test('client.getStatus', () => {
    client.getStatus()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.getPlaylist', () => {
    client.getPlaylist()
      .then((pl) => {
        expect(pl).any(Object)
      })
  })

  test('client.add', () => {
    client.add('https://www.youtube.com/watch?v=wZ9gzp1AL88')
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.empty', () => {
    client.empty()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.fullscreen', () => {
    client.fullscreen()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.loop', () => {
    client.loop()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.next', () => {
    client.next()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.pause', () => {
    client.pause()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.play', () => {
    client.play()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.previous', () => {
    client.previous()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.remove', () => {
    client.remove()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.repeat', () => {
    client.repeat()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.shuffle', () => {
    client.shuffle()
      .then((status) => {
        expect(status).any(Object)
      })
  })

  test('client.volume', () => {
    client.volume(50)
      .then((status) => {
        expect(status).any(Object)
      })
  })
})
