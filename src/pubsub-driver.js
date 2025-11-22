import { pubSub } from "./pubsub.js";

export function run() {
  // data-processor-1.js
  // *imports `pubSub`*
  const subId1 = pubSub.subscribe("DATA_SENT", (data) => {
    console.log(`*does something with ${data}*`);
  });

  // data-processor-2.js
  // *imports `pubSub`*
  const subId2 = pubSub.subscribe("DATA_SENT", (data) => {
    console.log(`*throws the data in the trash*`);
  });

  // data-sender.js
  // *imports `pubSub`*
  pubSub.publish("DATA_SENT", 90);

  // data-processor-2.js
  pubSub.unsubscribe("DATA_SENT", subId2);

  // data-sender.js
  pubSub.publish("DATA_SENT", 120);
}
