## require-sdk

JavaScript library for making sure given SDK is loaded and executed. Designed for popular APIs like Youtube, Rdio, Soundcloud etc.

See `tests.js` for examples.

## Install

```bash
$ npm install require-sdk
```

## Usage

```js
requireSDK = require('require-sdk')

requireFoo = requireSDK('http://foo.com/api.js')

requireFoo(function () {
  // foo.com/api.js loaded
  Foo('do something')
})

requireFoo(function () {
  // you can add multiple callbacks.
  // it lets you easily wrap all your SDK dependent code
  // and makes your code look meaningful
})
```

Check if it's already loaded:

```js
var requireFoo = requireSDK('https://www.youtube.com/iframe_api', 'YT') // Doesn't attempt to load if window.YT is defined
```

Manually trigger the load event if custom conditions required:

```js
var requireFoo = requireSDK('https://youtube.com/iframe_api', 'YT')
window.onYouTubeIframeAPIReady = requireFoo.trigger() // load event delays until onYouTubeIframeAPIReady is called
```

## Libraries Based On It

* [rdio-js-api](http://github.com/azer/rdio-js-api)
* [soundcloud-stream](http://github.com/azer/soundcloud-stream)
* [youtube-video](http://github.com/azer/youtube-video)
