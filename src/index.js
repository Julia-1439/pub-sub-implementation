#!/usr/bin/node
import { pubSub } from "./simple-pubsub.js";

// data-processor-1.js
// *imports `pubSub`*
pubSub.subscribe("DATA_SENT", (data) => {
  console.log(`*does something with ${data}*`);
});

// data-processor-2.js
// *imports `pubSub`*
pubSub.subscribe("DATA_SENT", (data) => {
  console.log(`*throws the data in the trash*`);
});

// data-sender.js
// *imports `pubSub`*
pubSub.publish("DATA_SENT", 90);