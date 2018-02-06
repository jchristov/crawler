const WebSocket = require('ws');

const URL = 'wss://api.bitfinex.com/ws/2';

class Bitfinex {
  constructor() {
    this.websocket = new WebSocket(URL);

    this.websocket.on('error', (err) => {
      console.log(`Error: ${err}`);
    });

    this.websocket.on('message', (msg) => {
      console.log(`\nNew message at ${new Date()}`);
      console.log(msg);
    });
  }

  ticker({ pair }) {
    this.websocket.on('open', () => {
      this.websocket.send(JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: `t${pair}`,
      }));
    });
  }
}

module.exports = Bitfinex;
