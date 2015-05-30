/* === messages broker === */

export default function(app, options) {
  options = options || {};
  //this.subscriptions = options.subscriptions|| [];

  /* Use:
   broker.addSubscription("posts:one", function(data) {
      console.log("Hello", data)
   })

   res.app.emit('posts:one', "World!")
   */

  this.addSubscription = function (eventName, callback) {
    app.on(eventName, (data) => {
      console.log("BROKER", eventName);
      callback(data)
    })
  };

  //TODO: removeSubscription
  //TODO: list all possible actions in the process

  app.on('users:getall', (data) => {
    console.log("BROKER:",'users:getall', data)
  });

  return this;
}