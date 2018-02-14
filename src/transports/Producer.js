const kafka = require('kafka-node');

class Producer {
  constructor({ ip, port }) {
    const host = `${ip}:${port}`;
    const client = new kafka.Client(host);

    this.producer = new kafka.Producer(client);
    this.isReady = false;

    this.producer.on('ready', () => {
      this.isReady = true;
    });

    this.producer.on('error', (err) => {
      console.error(`Error producer: ${err}`);
    });
  }

  listen(exchangeClient) {
    exchangeClient.on('ticker', (tick) => {
      this.publish('price.update', tick);
    });
  }

  publish(topic, msg) {
    if (!this.isReady) {
      console.error('Producer is not ready yet.');
      return;
    }

    const payload = {
      topic,
      messages: msg,
    };

    this.producer.send([payload], (err) => {
      if (err) console.log(`Error producer.publish: ${err}`);
    });
  }
}

module.exports = Producer;
