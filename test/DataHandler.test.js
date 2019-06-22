/* eslint-disable no-undef */
const request = require('../src/DataHandler');

const details = {
  port: 9090,
  password: 'password',
};

describe('Testing DataHandler', () => {
  test('Testing status.json', () => {
    function get(error, data) {
      expect(data).any(Object);
      done();
    }
    request(details, 'status.json', get);
  });

  test('Testing playlist.json', () => {
    function get(error, data) {
      expect(data).any(Object);
      console.log(data);
      done();
    }
    request(details, 'playlist.json', get);
  });
});
