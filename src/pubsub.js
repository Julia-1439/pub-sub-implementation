/**
 * @see https://medium.com/@ignatovich.dm/implementing-the-pub-sub-pattern-in-javascript-a-guide-for-beginners-44714a76d8c7
 * @module PubSub exports a single pubsub interface. The difference between this
 * module and 'simple-pubsub.js' is having a better tracked subscriber system,
 * allowing for easier unsubscribing when needed.
 */

class PubSub {
  #events; // map event names to subscribers
  constructor() {
    this.#events = new Map();
  }

  subscribe(event, callback) {
    if (!this.#events.has(event)) this.#events.set(event, new Set());
    const subscribers = this.#events.get(event);
    const id = subscribers.size;
    subscribers.add({ id, callback });
    return id;
  }

  // runtime: linear time on number of events. should be okay since unsubbing I imagine to be a less common process
  unsubscribe(event, id) {
    if (!this.#events.has(event)) return;
    let subscribers = this.#events.get(event);
    subscribers = new Set(
      [...subscribers].filter((subscriber) => subscriber.id !== id)
    ); // there's no built-in "filter" method for Set, so this is the workaround
    this.#events.set(event, subscribers);
  }

  publish(event, data) {
    if (!this.#events.has(event)) return;
    const subscribers = this.#events.get(event);
    subscribers.forEach((subscriber) => subscriber.callback(data));
  }
}

export const pubSub = new PubSub();
