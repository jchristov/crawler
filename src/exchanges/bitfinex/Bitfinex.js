const EventEmmiter = require('events');
const WebSocket = require('ws');
const Channel = require('./models/Channel');
const Message = require('./models/Message');
const Tick = require('./models/Tick');

const URL = 'wss://api.bitfinex.com/ws/2';

class Bitfinex extends EventEmmiter {
  constructor() {
    super();
    this.websocket = new WebSocket(URL);
    this.channels = [];
  }

  ticker({ pair }) {
    const payload = {
      event: 'subscribe',
      channel: 'ticker',
      symbol: `t${pair}`,
    };

    this.websocket.on('open', () => {
      this.websocket.send(JSON.stringify(payload));
    });
  }

  start() {
    this.websocket.on('error', (err) => {
      console.error(`Error bitfinex ws: ${err}`);
    });

    this.websocket.on('message', (message) => {
      const msg = new Message(message);

      if (msg.type === 'subscription' && msg.parsed.channel === 'ticker') {
        this.channels.push(new Channel(msg.parsed));
      }

      if (msg.type === 'data') {
        const channel = this.channels.find(chan => chan.id === msg.parsed[0]);

        if (channel.topic === 'ticker') {
          const tick = new Tick(msg.parsed[1], channel.pair);
          this.emit('ticker', tick);
        }
      }
    });
  }
}

module.exports = Bitfinex;
