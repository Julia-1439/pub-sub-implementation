class SimplePubSub {
  #events; // map event names to subscribers
  constructor() {
    this.#events = new Map();
  }

  subscribe(event, callback) {
    if (!this.#events.has(event)) this.#events.set(event, new Set());
    const subscribers = this.#events.get(event);
    subscribers.add(callback);
  }

  // NOTE: I imagine subscribers that used anonymous functions will not be able to unsubscribe 
  unsubscribe(event, callback) {
    if (!this.#events.has(event)) return;
    const subscribers = this.#events.get(event);
    subscribers.delete(callback);
  }

  publish(event, data) {
    if (!this.#events.has(event)) return;
    const subscribers = this.#events.get(event);
    subscribers.forEach((callback) => callback(data));
  }
}

export const pubSub = new SimplePubSub();