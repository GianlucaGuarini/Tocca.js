Tocca.js
========


[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]

[![MIT License][license-image]][license-url]

[![Sauce Test Status][saucelabs-image]][saucelabs-url]

Super lightweight script ( 1.57kB ) to detect via Javascript events like 'tap' 'dbltap' 'swipeup'  'swipedown'  'swipeleft'  'swiperight' on any kind of device.

<a href="http://gianlucaguarini.github.io/Tocca.js/demo-fun.html" target="_blank">Demo</a>

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
<pre lang="html">
&lt;script src="path/to/Tocca.js"&gt;&lt;/script&gt;
</pre>

Once you have included Tocca.js you will be able to catch all the new events:

<pre lang="javascript">
elm.addeventListener('tap',function(e){});
elm.addeventListener('dbltap',function(e){});
elm.addeventListener('swipeleft',function(e){});
elm.addeventListener('swiperight',function(e){});
elm.addeventListener('swipeup',function(e){});
elm.addeventListener('swipedown',function(e){});
</pre>

It works with jQuery as well:
<pre lang="javascript">
$(elm).on('tap',function(e,data){});
$(elm).on('dbltap',function(e,data){});
$(elm).on('swipeleft',function(e,data){});
$(elm).on('swiperight',function(e,data){});
$(elm).on('swipeup',function(e,data){});
$(elm).on('swipedown',function(e,data){});
</pre>

## API and Examples

Anytime you will use a Tocca.js event the callback function will receive a special event object containing the following properties

 - <code>x</code> { Int }: latest x position of pointer at the end of the event
 - <code>y</code> { Int }: latest y position of pointer at the end of the event
 - <code>originalEvent</code> { Object }: the original javascript native event that has been triggered
 - <code>distance</code>: this property is available only for the swipe events
 	- <code>x</code> { Int }: the x absolute difference between the beginning and the end of the swipe gesture
 	- <code>y</code> { Int }: the y absolute difference between the beginning and the end of the swipe gesture

Examples:

<pre lang="javascript">
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
</pre>


Anyway you can combine Tocca.js with the default javascript touch events:

 - <code>touchmove</code>
 - <code>touchstart</code>
 - <code>touchend</code>
 - <code>touchcancel</code>

To disable the default touch behaviours (zoom on double tap, scroll on swipe...) on a certain element via javascript you can always use the following snippet:

<pre lang="javascript">
elm.addEventListener('touchmove',function(e){e.preventDefault()});
elm.addEventListener('touchstart',function(e){e.preventDefault()});
elm.addEventListener('touchend',function(e){e.preventDefault()});
</pre>


## Configuration

Whenever you want to configure the plugin events settings you can do that simply specifying two constants before including Tocca.js into the page

<pre lang="html">
&lt;script&gt;
var SWIPE_THRESHOLD = 80, // default value
	DBL_TAP_THRESHOLD || 50, // range of time in which a dbltap event could be detected
	TAP_THRESHOLD = 200, // range of time in which a tap event could be detected
	TAP_PRECISION = 60 / 2, // default value (touch events boundaries)
	JUST_ON_TOUCH_DEVICES = false; // default value ( decide whether you want to use the Tocca.js events only on the touch devices )
&lt;/script&gt;
&lt;script src="path/to/Tocca.js"&gt;&lt;/script&gt;
</pre>

## Browser Support

Actually the script has been tested on all the modern browsers but it need a better testing phase over several platforms: Chrome 29+ Firefox 23+ Opera 12+ Safari 5+

It works on mobile/tablet browsers and on desktop browsers as well.

On the old browsers all the Tocca.js events cannot be triggered.

## Changelog

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

[travis-url]:https://travis-ci.org/GianlucaGuarini/Tocca.js
[travis-image]: https://img.shields.io/travis/GianlucaGuarini/Tocca.js.svg?style=flat-square

[saucelabs-image]:https://saucelabs.com/browser-matrix/Toccajs.svg
[saucelabs-url]:https://saucelabs.com/u/Toccajs

[license-url]: LICENSE
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square