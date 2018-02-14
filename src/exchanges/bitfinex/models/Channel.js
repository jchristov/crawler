class Channel {
  constructor(msg) {
    this.id = msg.chanId;
    this.topic = msg.channel;
    this.pair = msg.pair;
  }
}

module.exports = Channel;
