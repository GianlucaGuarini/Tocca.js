Tocca.js
========

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]

[![MIT License][license-image]][license-url]

[![CDNJS](https://img.shields.io/cdnjs/v/Tocca.js.svg)](https://cdnjs.com/libraries/Tocca.js)

Super lightweight script ( ~1kB ) to detect via Javascript events like 'tap' 'longtap' 'dbltap' 'swipeup'  'swipedown'  'swipeleft'  'swiperight' on any kind of device.

<a href="http://gianlucaguarini.github.io/Tocca.js/demo-fun.html" target="_blank">Demo</a>

### Donations

If this project helped getting your job done consider making a donation for all the time I spend to bring it to you

[![Donate][donate-image]][paypal-link]

## Installation

### Npm
```bash
$ npm install tocca
```

### Bower
```
$ bower install Tocca.js -save
```

## Usage

Include the script into your page:
``` html
<script src="path/to/Tocca.js"></script>
```

Once you have included Tocca.js you will be able to catch all the new events:

``` javascript
elm.addEventListener('tap',function(e){});
elm.addEventListener('dbltap',function(e){});
elm.addEventListener('longtap',function(e){});
elm.addEventListener('swipeleft',function(e){});
elm.addEventListener('swiperight',function(e){});
elm.addEventListener('swipeup',function(e){});
elm.addEventListener('swipedown',function(e){});
```

It works with jQuery as well:
``` javascript
$(elm).on('tap',function(e,data){});
$(elm).on('dbltap',function(e,data){});
$(elm).on('longtap',function(e,data){});
$(elm).on('swipeleft',function(e,data){});
$(elm).on('swiperight',function(e,data){});
$(elm).on('swipeup',function(e,data){});
$(elm).on('swipedown',function(e,data){});
```

Tocca.js supports also the inline events if you are using Riot.js!
``` html
<div ontap="function(e){})"></div>
<div ondbltap="function(e){})"></div>
<div onlongtap="function(e){})"></div>
<div onswipeleft="function(e){})"></div>
<div onswiperight="function(e){})"></div>
<div onswipeup="function(e){})"></div>
<div onswipedown="function(e){})"></div>
```

## API and Examples

Anytime you will use a Tocca.js event the callback function will receive a special event object containing the following properties

 - <code>x</code> { Int }: latest x position of pointer at the end of the event
 - <code>y</code> { Int }: latest y position of pointer at the end of the event
 - <code>originalEvent</code> { Object }: the original javascript native event that has been triggered
 - <code>distance</code>: this property is available only for the swipe events
  - <code>x</code> { Int }: the x absolute difference between the beginning and the end of the swipe gesture
  - <code>y</code> { Int }: the y absolute difference between the beginning and the end of the swipe gesture

Examples:

``` javascript
elm.addEventListener('dbltap',function (e){
  console.log(e.x);
  console.log(e.y);
});
elm.addEventListener('swipeup',function (e){
  console.log(e.x);
  console.log(e.y);
  console.log(e.distance.x);
  console.log(e.distance.y);
});

// with jQuery

$(elm).on('dbltap',function (e,data){
  console.log(data.x);
  console.log(data.y);
});
$(elm).on('swipeup',function (e,data){
  console.log(data.x);
  console.log(data.y);
  console.log(data.distance.x);
  console.log(data.distance.y);
});
```


Anyway you can combine Tocca.js with the default javascript touch events:

 - <code>touchmove</code>
 - <code>touchstart</code>
 - <code>touchend</code>
 - <code>touchcancel</code>

To disable the default touch behaviours (zoom on double tap, scroll on swipe...) on a certain element via javascript you can always use the following snippet:

``` javascript
elm.addEventListener('touchmove',function(e){e.preventDefault()});
elm.addEventListener('touchstart',function(e){e.preventDefault()});
elm.addEventListener('touchend',function(e){e.preventDefault()});
```


## Configuration

Whenever you want to configure the plugin events settings you can do that simply specifying two constants before including Tocca.js into the page

``` html
<script>
var SWIPE_THRESHOLD = 100, // default value
  DBL_TAP_THRESHOLD = 200, // range of time in which a dbltap event could be detected,
  LONG_TAP_THRESHOLD = 1000, // range of time after which a longtap event could be detected
  TAP_THRESHOLD = 150, // range of time in which a tap event could be detected
  TAP_PRECISION = 60 / 2, // default value (touch events boundaries)
  JUST_ON_TOUCH_DEVICES = false, // default value ( decide whether you want to use the Tocca.js events only on the touch devices )
  IGNORE_JQUERY = false; // default value ( will not use jQuery events, even if jQuery is detected )
</script>
<script src="path/to/Tocca.js"></script>
```

In Tocca.js 1.1.0 you can also configure/get the internal options via function:
```js
window.tocca({
  useJquery: your new option
  swipeThreshold: your new option
  tapThreshold: your new option
  dbltapThreshold: your new option
  longtapThreshold: your new option
  tapPrecision: your new option
  justTouchEvents: your new option
})

console.log(window.tocca()) // will always return the current internal options
```

## Browser Support

Actually the script has been tested on all the modern browsers but it need a better testing phase over several platforms: Chrome 29+ Firefox 23+ Opera 12+ Safari 5+

It works on mobile/tablet browsers and on desktop browsers as well.

On the old browsers all the Tocca.js events cannot be triggered.

## Changelog

### 2.0.9

-  fixed: removed `const` variables

### 2.0.8

-  fixed: [70](https://github.com/GianlucaGuarini/Tocca.js/issues/70)

### 2.0.7

-  fixed: [69](https://github.com/GianlucaGuarini/Tocca.js/issues/69)

### 2.0.6

-  update: improve multiple touches events detection

### 2.0.5

-  fixed: [#65](https://github.com/GianlucaGuarini/Tocca.js/issues/65)

### 2.0.4

-  fixed: [#62](https://github.com/GianlucaGuarini/Tocca.js/issues/62)

### 2.0.3

-  fixed: [#51](https://github.com/GianlucaGuarini/Tocca.js/issues/51) [#54](https://github.com/GianlucaGuarini/Tocca.js/issues/54)
-  fixed: the PointerUp event is not always dispatched on Chrome and Android devices, prioritize always the `touch*` over `pointer*` events


### 2.0.1

-  fixed: https://github.com/GianlucaGuarini/Tocca.js/issues/47

### 2.0.0

-  fixed: https://github.com/GianlucaGuarini/Tocca.js/issues/44
-  added: support for the [new `pointerevents`](https://developers.google.com/web/updates/2016/10/pointer-events)

### 1.1.0

-  added: the possibility to configure via function the internal tocca options
-  added: the `IGNORE_JQUERY` option

### 1.0.1

-  fixed: https://github.com/GianlucaGuarini/Tocca.js/issues/37

### 1.0.0
Thanks to [@AndyOGo](https://github.com/AndyOGo) for his help on this release

-  fixed: #34 #35
-  fixed: more reliable and performant events on the hybrid devices
-  fixed: multiple events dispatched on `tap`

### 0.2.0
-  added: `longtap` event and the `LONG_TAP_THRESHOLD` variable
-  fixed: inconsistencies and issues across the hybrid devices

### 0.1.7
-  added: `longtap` event and the `LONG_TAP_THRESHOLD` variable

### 0.1.5
-  added: support for the inline events

### 0.1.4
 - fixed: `dbltap` https://github.com/GianlucaGuarini/Tocca.js/pull/16
 - updated: node devDependecies updated

### 0.1.3
 - fixed: `dbltap` issue https://github.com/GianlucaGuarini/Tocca.js/issues/14

### 0.1.2
 - updated: no more deferred `tap` events, a `tap` event gets triggered immediately if it's in the `TAP_THRESHOLD` time range
 - updated: a `tap` event will always come first a `dbltap` event

### 0.1.1
 - updated: better and faster tap events detection
 - updated: node devDependecies updated
 - added: DBL_TAP_THRESHOLD option

### 0.1.0
 - bugfix: optimizing the support for the microsoft hybrid devices (IE10/IE11)

### 0.0.8
 - 'touchcancel' event removed to fix and android issue on page scroll

### 0.0.7
 - nothing important (just a workaround to fix the tests on the motherfucker Phantomjs)

### 0.0.6
 - bugfix: do not set the mouse event listeners on any touch device and vice versa
 - added: new JUST_ON_TOUCH_DEVICES option to block all the Tocca.js events on the no-touch devices

### 0.0.5
 - tap precision option included

### 0.0.4
 - <code>dpltap</code> renamed <code>dbltap</code>
 - new demo added demo-fun.html

### 0.0.3
 - Tests added

### 0.0.2
 - Android Bug fix


## What does Tocca mean?!

'Tocca' is the second person singular of the imperative Italian verb 'Toccare' that means to touch.

[npm-url]: https://npmjs.org/package/tocca
[npm-version-image]: http://img.shields.io/npm/v/tocca.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/tocca.svg?style=flat-square

[paypal-link]:https://www.paypal.me/GianlucaGuarini
[donate-image]:https://img.shields.io/badge/donate-%E2%9D%A4-brightgreen.svg?style=flat-square

[travis-url]:https://travis-ci.org/GianlucaGuarini/Tocca.js
[travis-image]: https://img.shields.io/travis/GianlucaGuarini/Tocca.js.svg?style=flat-square

[license-url]: LICENSE
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
