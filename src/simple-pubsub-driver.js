import { simplePubSub } from "./simple-pubsub.js";

export function run() {
  // data-processor-1.js
  // *imports `simplePubSub`*
  simplePubSub.subscribe("DATA_SENT", (data) => {
    console.log(`*does something with ${data}*`);
  });

  // data-processor-2.js
  // *imports `simplePubSub`*
  simplePubSub.subscribe("DATA_SENT", (data) => {
    console.log(`*throws the data in the trash*`);
  });

  // data-sender.js
  // *imports `simplePubSub`*
  simplePubSub.publish("DATA_SENT", 90);
}
