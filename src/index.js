const exchanges = require('./exchanges');
const Producer = require('./transports/Producer');

// Defines the producer configuration object with the address of the
// streaming platform.
const address = {
  ip: '127.0.0.1',
  port: 2181,
};

const producer = new Producer(address);
const bitfinex = new exchanges.Bitfinex();

// Subscribe to the Bitfinex ticker channel to receive ticks from the
// Bitcoin / Dollar pair.
bitfinex.ticker({ pair: 'BTCUSD' });

// Adds an event emitter to the producer to listen to the messages
// and publish to the streaming platform.
producer.listen(bitfinex);

// Starts capturing the messages sent by the web socket and issue
// events.
bitfinex.start();
