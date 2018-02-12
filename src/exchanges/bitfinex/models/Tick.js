// [
//   BID                 float   Price of last highest bid
//   BID_SIZE            float   Size of the last highest bid
//   ASK                 float   Price of last lowest ask
//   ASK_SIZE            float   Size of the last lowest ask
//   DAILY_CHANGE        float   Amount that the last price has changed since yesterday
//   DAILY_CHANGE_PERC   float   Amount that the price has changed expressed in percentage terms
//   LAST_PRICE          float   Price of the last trade.
//   VOLUME              float   Daily volume
//   HIGH                float   Daily high
//   LOW                 float   Daily low
// ]

class Tick {
  constructor(data, pair) {
    this.source = 'Bitfinex';
    this.timestamp = Date.now();
    this.pair = pair;
    [
      this.bid,
      this.bidSize,
      this.ask,
      this.askSize,
      this.change,
      this.changePercent,
      this.last,
      this.volume,
      this.high,
      this.low,
    ] = data;
  }
}

module.exports = Tick;
