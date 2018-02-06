const exchanges = require('./exchanges');

const bfxClient = new exchanges.Bitfinex();
bfxClient.ticker({ pair: 'BTCUSD' });
