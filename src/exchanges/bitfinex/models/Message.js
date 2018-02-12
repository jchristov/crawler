function isOpening(msg) {
  return msg && msg.version && msg.event === 'info';
}

function isSubscription(msg) {
  return msg && msg.event === 'subscribed';
}

function isData(msg) {
  return Array.isArray(msg) && msg.length === 2 && Array.isArray(msg[1]);
}

function getType(msg) {
  if (isOpening(msg)) {
    return 'opening';
  }

  if (isSubscription(msg)) {
    return 'subscription';
  }

  if (isData(msg)) {
    return 'data';
  }

  return 'unknown';
}

class Message {
  constructor(rawMsg) {
    this.parsed = JSON.parse(rawMsg);
    this.type = getType(this.parsed);
  }
}

module.exports = Message;
