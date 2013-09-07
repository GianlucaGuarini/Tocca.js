/**
*
* Version: 0.0.2
* Author: Gianluca Guarini
* Contact: gianluca.guarini@gmail.com
* Website: http://www.gianlucaguarini.com/
* Twitter: @gianlucaguarini
*
* Copyright (c) 2013 Gianluca Guarini
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
**/

(function(doc, win) {
	'use strict';
	if (typeof doc.createEvent !== 'function') return false; // no touch events here
	// helpers
	var useJquery = typeof jQuery != 'undefined',
		setListener = function(elm, events, callback) {
			var eventsArray = events.split(' '),
				i = eventsArray.length;
			while (i--) {
				elm.addEventListener(eventsArray[i], callback, false);
			}
		},
		getPointerEvent = function(event) {
			return event.targetTouches ? event.targetTouches[0] : event;
		},
		sendEvent = function(elm, eventName, originalEvent, data) {
			data = data || {};
			data.x = currX;
			data.y = currY;
			if (useJquery)
				jQuery(elm).trigger(eventName, data);
			else {
				var customEvent = doc.createEvent('Event');
				customEvent.originalEvent = originalEvent;
				for (var key in data) {
					customEvent[key] = data[key];
				}
				customEvent.initEvent(eventName, true, true); 
				elm.dispatchEvent(customEvent);
			}
		};

	var touchStarted = false, // detect if a touch event is sarted
		swipeTreshold = win.SWIPE_TRESHOLD || 80,
		taptreshold = win.TAP_TRESHOLD || 200,
		tapNum = 0,
		currX, currY, cachedX, cachedY, tapTimer;

	//setting the events listeners
	setListener(doc, 'touchstart mousedown', function(e) {
		var pointer = getPointerEvent(e);
		// caching the current x
		cachedX = currX = pointer.pageX;
		// caching the current y
		cachedY = currY = pointer.pageY;
		// a touch event is detected
		touchStarted = true;
		tapNum ++;
		// detecting if after 200ms the finger is still in the same position
		clearTimeout(tapTimer);
		tapTimer = setTimeout(function() {
			if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
				// Here you get the Tap event
				sendEvent(e.target, (tapNum == 2) ? 'dpltap' : 'tap', e);
			}
			tapNum = 0;
		}, taptreshold);

	});
	setListener(doc, 'touchend mouseup touchcancel', function(e) {
		var eventsArr = [],
			deltaY = cachedY - currY,
			deltaX = cachedX - currX;
		touchStarted = false;
		if (deltaX <= -swipeTreshold)
			eventsArr.push('swiperight');

		if (deltaX >= swipeTreshold)
			eventsArr.push('swipeleft');

		if (deltaY <= -swipeTreshold)
			eventsArr.push('swipedown');

		if (deltaY >= swipeTreshold)
			eventsArr.push('swipeup');
		if (eventsArr.length) {
			for (var i = 0; i < eventsArr.length; i++) {
				var eventName = eventsArr[i];
				sendEvent(e.target, eventName, e,{
					distance:{
						x:Math.abs(deltaX),
						y:Math.abs(deltaY)
					}
				});
			}
		}
	});
	setListener(doc, 'touchmove mousemove', function(e) {
		var pointer = getPointerEvent(e);
		currX = pointer.pageX;
		currY = pointer.pageY;
	});
}(document, window));