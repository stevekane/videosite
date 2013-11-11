var testVideo1 = {
  id: 0,
  title: "A short screencast on promises",
  description: "We are going to dive into the internals of RSVP.js",
  transcript: "Promises are powerful abstractions that wrap up async operations and transform them into reified objects that may be passed around your system.  Because the operation itself has been encapsulated, we are able to call methods on this object in order to inspect its current state, its current value, and use them to return new promises.  blah blah blah",
  mp4_url: "/videos/test.mp4",
  webm_url: "",
  publication_date: new Date(),
  duration: 400,
  keywords: "promises async ember rsvp",
  slug: "on-promises"
};

var testVideo2 = {
  id: 1,
  title: "Promises and nodejs",
  description: "Analyze how promises may be used in node to clean up code",
  transcript: "Promises are powerful abstractions that wrap up async operations and transform them into reified objects that may be passed around your system.  Because the operation itself has been encapsulated, we are able to call methods on this object in order to inspect its current state, its current value, and use them to return new promises.  blah blah blah",
  mp4_url: "/videos/test.mp4",
  webm_url: "",
  publication_date: new Date(),
  duration: 400,
  keywords: "promises async node q rsvp",
  slug: "promises-and-node"
};

var testVideo3 = {
  id: 2,
  title: "Push Ember away from your application",
  description: "How can we write an application to be agnostic about frameworks",
  transcript: "Promises are powerful abstractions that wrap up async operations and transform them into reified objects that may be passed around your system.  Because the operation itself has been encapsulated, we are able to call methods on this object in order to inspect its current state, its current value, and use them to return new promises.  blah blah blah",
  mp4_url: "/videos/test.mp4",
  webm_url: "",
  publication_date: new Date(),
  duration: 400,
  keywords: "ember javascript layers proxies",
  slug: "pushing-ember-away"
};

module.exports = [
  testVideo1,
  testVideo2,
  testVideo3
];
