var pubsub = require("pubsub");
var loadScript = require("load-script");

module.exports = requireSDK;

function requireSDK (url, global) {
  var onReady = pubsub();

  var hasManualTrigger;
  var isLoading;
  var isLoaded;

  load.trigger = setManualTrigger;

  return load;

  function isAlreadyLoaded () {
    return window[global];
  }

  function load (callback) {
    if (isAlreadyLoaded() || isLoaded) {
      return callback && callback(undefined, window[global]);
    }

    callback && onReady.subscribe(callback);

    if (isLoading) return;

    isLoading = true;

    if (!url) return;

    loadScript(url, function (error) {
      if (hasManualTrigger) return;

      if (error) {
        isLoaded = true;
        return onReady.publish(error);
      }

      trigger();
    });

  };

  function trigger () {
    isLoaded = true;
    onReady.publish(undefined, global ? window[global] : undefined);
  }

  function setManualTrigger () {
    hasManualTrigger = true;
    return trigger;
  }


}
