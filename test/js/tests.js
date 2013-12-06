function check(done, f) {
	try {
		f();
		done();
	} catch (e) {
		done(e);
	}
}

var testDiv = document.createElement('div'),

	isTouch = !! ('ontouchstart' in window) && navigator.userAgent.indexOf('PhantomJS') < 0,
	touchend = isTouch ? 'touchend' : 'mouseup',
	touchmove = isTouch ? 'touchmove' : 'mousemove',
	touchstart = isTouch ? 'touchstart' : 'mousedown';

// append the test div into the body
document.body.appendChild(testDiv);

describe('Tocca.js nojQuery events', function() {


	/**
	 *
	 *
	 * Test the simple tap event
	 *
	 *
	 */
	describe('tap event', function() {
		it('The "tap" event gets fired correctly', function(done) {
			function onEventFired(e) {
				check(done, function() {
					expect(e).to.be.an('object');
					expect(e).to.contain.keys(['x', 'y', 'originalEvent']);
					expect(e.x).to.be.an('number');
					expect(e.x).to.be.equal(99);
					expect(e.y).to.be.an('number');
					expect(e.y).to.be.equal(99);
					expect(e.originalEvent).to.be.an('object');
					expect(e.originalEvent).to.not.be.equal(undefined);
					expect(e.distance).to.be.equal(undefined);
				});
				testDiv.removeEventListener('tap', onEventFired, false);
			}
			testDiv.addEventListener('tap', onEventFired, false);

			simulant.fire(testDiv, touchstart, {
				clientX: 99,
				clientY: 99
			});
			setTimeout(function() {
				simulant.fire(testDiv, touchend, {
					clientX: 99,
					clientY: 99
				});
			}, 20);
		});
	});
	/**
	 *
	 *
	 * Test the double tap event
	 *
	 *
	 */
	describe('dbltap event', function() {
		it('The "dbltap" event gets fired correctly', function(done) {
			function onEventFired(e) {
				check(done, function() {
					expect(e).to.be.an('object');
					expect(e).to.contain.keys(['x', 'y', 'originalEvent']);
					expect(e.x).to.be.an('number');
					expect(e.x).to.be.equal(50);
					expect(e.y).to.be.an('number');
					expect(e.y).to.be.equal(50);
					expect(e.originalEvent).to.be.an('object');
					expect(e.originalEvent).to.not.be.equal(undefined);
					expect(e.distance).to.be.equal(undefined);
				});
				testDiv.removeEventListener('dbltap', onEventFired, false);
			}


			testDiv.addEventListener('dbltap', onEventFired, false);
			simulant.fire(testDiv, touchstart, {
				clientX: 50,
				clientY: 50
			});
			simulant.fire(testDiv, touchend, {
				clientX: 50,
				clientY: 50
			});
			setTimeout(function() {
				simulant.fire(testDiv, touchstart, {
					clientX: 50,
					clientY: 50
				});
				simulant.fire(testDiv, touchend, {
					clientX: 50,
					clientY: 50
				});
			}, 100);
		});
	});
	/**
	 *
	 *
	 * Test all the swipe events
	 *
	 *
	 */
	describe('swipe events', function() {
		it('The "swipeup" event gets fired correctly', function(done) {
			function onEventFired(e) {
				check(done, function() {
					expect(e).to.be.an('object');
					expect(e).to.contain.keys(['x', 'y', 'originalEvent', 'distance']);
					expect(e.x).to.be.an('number');
					expect(e.x).to.be.equal(40);
					expect(e.y).to.be.an('number');
					expect(e.y).to.be.equal(50);
					expect(e.originalEvent).to.be.an('object');
					expect(e.originalEvent).to.not.be.equal(undefined);
					expect(e.distance.y).to.be.equal(400);
					expect(e.distance.x).to.be.equal(10);
				});
				testDiv.removeEventListener('swipeup', onEventFired, false);
			}
			testDiv.addEventListener('swipeup', onEventFired, false);

			var initialY = 450,
				pixelMoved = 401;
			simulant.fire(testDiv, touchstart, {
				clientX: 50,
				clientY: initialY
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: 40,
					clientY: initialY--
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: 40,
				clientY: initialY - pixelMoved
			});
		});
		it('The "swipedown" event gets fired correctly', function(done) {
			function onEventFired(e) {
				check(done, function() {
					expect(e).to.be.an('object');
					expect(e).to.contain.keys(['x', 'y', 'originalEvent', 'distance']);
					expect(e.x).to.be.an('number');
					expect(e.x).to.be.equal(70);
					expect(e.y).to.be.an('number');
					expect(e.y).to.be.equal(850);
					expect(e.originalEvent).to.be.an('object');
					expect(e.originalEvent).to.not.be.equal(undefined);
					expect(e.distance.y).to.be.equal(400);
					expect(e.distance.x).to.be.equal(20);
				});
				testDiv.removeEventListener('swipedown', onEventFired, false);
			}
			testDiv.addEventListener('swipedown', onEventFired, false);

			var initialY = 450,
				pixelMoved = 401;
			simulant.fire(testDiv, touchstart, {
				clientX: 50,
				clientY: initialY
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: 70,
					clientY: initialY++
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: 70,
				clientY: initialY + pixelMoved
			});
		});
		it('The "swipeleft" event gets fired correctly', function(done) {
			function onEventFired(e) {
				check(done, function() {
					expect(e).to.be.an('object');
					expect(e).to.contain.keys(['x', 'y', 'originalEvent', 'distance']);
					expect(e.x).to.be.an('number');
					expect(e.x).to.be.equal(50);
					expect(e.y).to.be.an('number');
					expect(e.y).to.be.equal(40);
					expect(e.originalEvent).to.be.an('object');
					expect(e.originalEvent).to.not.be.equal(undefined);
					expect(e.distance.y).to.be.equal(10);
					expect(e.distance.x).to.be.equal(400);
				});
				testDiv.removeEventListener('swipeleft', onEventFired, false);
			}
			testDiv.addEventListener('swipeleft', onEventFired, false);

			var initialX = 450,
				pixelMoved = 401;
			simulant.fire(testDiv, touchstart, {
				clientX: initialX,
				clientY: 50
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: initialX--,
					clientY: 40
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: initialX - pixelMoved,
				clientY: 40
			});
		});
		it('The "swiperight" event gets fired correctly', function(done) {
			function onEventFired(e) {
				check(done, function() {
					expect(e).to.be.an('object');
					expect(e).to.contain.keys(['x', 'y', 'originalEvent', 'distance']);
					expect(e.x).to.be.an('number');
					expect(e.x).to.be.equal(850);
					expect(e.y).to.be.an('number');
					expect(e.y).to.be.equal(10);
					expect(e.originalEvent).to.be.an('object');
					expect(e.originalEvent).to.not.be.equal(undefined);
					expect(e.distance.y).to.be.equal(40);
					expect(e.distance.x).to.be.equal(400);
				});
				testDiv.removeEventListener('swiperight', onEventFired, false);
			}
			testDiv.addEventListener('swiperight', onEventFired, false);

			var initialX = 450,
				pixelMoved = 401;
			simulant.fire(testDiv, touchstart, {
				clientX: initialX,
				clientY: 50
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: initialX++,
					clientY: 10
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: initialX - pixelMoved,
				clientY: 10
			});
		});
	});

});


describe('Tocca.js validate events', function() {

	/**
	 *
	 *
	 * Test the tap event
	 *
	 *
	 */
	describe('tap event', function() {
		it('The "tap" event must not be triggered if the pointer position is changed', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});

			}
			testDiv.addEventListener('tap', onEventFired, false);

			simulant.fire(testDiv, touchstart, {
				clientX: 99,
				clientY: 99
			});

			setTimeout(function() {
				simulant.fire(testDiv, touchmove, {
					clientX: 28,
					clientY: 28
				});
				setTimeout(function() {
					simulant.fire(testDiv, touchend);
				}, 20);

				setTimeout(function() {
					check(done, function() {
						expect(eventObject).to.be.equal(false);
						testDiv.removeEventListener('tap', onEventFired, false);
					});
				}, 500);
			}, 20);
		});
		it('The "tap" event must not be triggered becouse out of the time range defined', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});
			}
			testDiv.addEventListener('tap', onEventFired, false);

			simulant.fire(testDiv, touchstart, {
				clientX: 99,
				clientY: 99
			});
			setTimeout(function() {
				simulant.fire(testDiv, touchend);
				setTimeout(function() {
					check(done, function() {
						expect(eventObject).to.be.equal(false);
						testDiv.removeEventListener('tap', onEventFired, false);
					});
				}, 500);
			}, 220);

		});
	});
	/**
	 *
	 *
	 * Test the dbltap event
	 *
	 *
	 */
	describe('dbltap event', function() {
		it('The "dbltap" event must not be triggered because out of the time range defined', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});
			}
			testDiv.addEventListener('dbltap', onEventFired, false);
			simulant.fire(testDiv, touchstart, {
				clientX: 99,
				clientY: 99
			});
			simulant.fire(testDiv, touchmove, {
				clientX: 58,
				clientY: 58
			});
			simulant.fire(testDiv, touchend);
			setTimeout(function() {
				simulant.fire(testDiv, touchstart, {
					clientX: 98,
					clientY: 98
				});
				simulant.fire(testDiv, touchend);
				setTimeout(function() {
					check(done, function() {
						expect(eventObject).to.be.equal(false);
						testDiv.removeEventListener('dbltap', onEventFired, false);
					});
				}, 500);
			}, 200);

		});

	});
	/**
	 *
	 *
	 * Test the dbltap event
	 *
	 *
	 */
	describe('swipe events', function() {
		it('The "swipeup" event must not be triggered because the swipe movement is too short', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});
			}
			testDiv.addEventListener('swipeup', onEventFired, false);
			var initialY = 450,
				pixelMoved = 50;
			simulant.fire(testDiv, touchstart, {
				clientX: 50,
				clientY: initialY
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: 40,
					clientY: initialY--
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: 40,
				clientY: initialY - pixelMoved
			});
			setTimeout(function() {
				check(done, function() {
					expect(eventObject).to.be.equal(false);
					testDiv.removeEventListener('swipeup', onEventFired, false);
				});
			}, 500);
		});
		it('The "swipedown" event must not be triggered because the swipe movement is too short', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});
			}
			testDiv.addEventListener('swipedown', onEventFired, false);
			var initialY = 450,
				pixelMoved = 50;
			simulant.fire(testDiv, touchstart, {
				clientX: 50,
				clientY: initialY
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: 40,
					clientY: initialY++
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: 40,
				clientY: initialY + pixelMoved
			});
			setTimeout(function() {
				check(done, function() {
					expect(eventObject).to.be.equal(false);

					testDiv.removeEventListener('swipedown', onEventFired, false);
				});
			}, 500);
		});
		it('The "swipeleft" event must not be triggered because the swipe movement is too short', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});
			}
			testDiv.addEventListener('swipeleft', onEventFired, false);
			var initialX = 450,
				pixelMoved = 70;
			simulant.fire(testDiv, touchstart, {
				clientX: initialX,
				clientY: 50
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: initialX--,
					clientY: 50
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: initialX - pixelMoved,
				clientY: 50
			});
			setTimeout(function() {
				check(done, function() {
					expect(eventObject).to.be.equal(false);

					testDiv.removeEventListener('swipeleft', onEventFired, false);
				});
			}, 500);
		});

		it('The "swiperight" event must not be triggered because the swipe movement is too short', function(done) {
			var eventObject = false;

			function onEventFired(e) {
				check(done, function() {
					eventObject = e;
					expect(true).to.be.equal(false);
				});
			}
			testDiv.addEventListener('swiperight', onEventFired, false);
			var initialX = 450,
				pixelMoved = 70;
			simulant.fire(testDiv, touchstart, {
				clientX: initialX,
				clientY: 50
			});
			var i = pixelMoved;
			while (i--) {
				simulant.fire(testDiv, touchmove, {
					clientX: initialX++,
					clientY: 50
				});
			}
			simulant.fire(testDiv, touchend, {
				clientX: initialX + pixelMoved,
				clientY: 50
			});
			setTimeout(function() {
				check(done, function() {
					expect(eventObject).to.be.equal(false);

					testDiv.removeEventListener('swiperight', onEventFired, false);
				});
			}, 500);
		});
	});

});