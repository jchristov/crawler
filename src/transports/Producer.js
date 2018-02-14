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
      console.error(`Error: ${err}`);
    });
  }

  listen(exchangeClient) {
    // todo
  }

  publish(topic, message) {
    if (!this.isReady) {
      console.log('Producer is not ready yet.');
      return;
    }

    const payload = {
      topic,
      messages: message,
    };

    this.producer.send([payload], (err) => {
      if (err) console.log(err);
    });
  }
}

module.exports = Producer;
