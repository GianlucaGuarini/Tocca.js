// bind polyfill by  Andrea Giammarchi https://github.com/WebReflection/micro-env/blob/master/src/Function/bind.js
Function.bind || (Function.prototype.bind = function(c) {
	var f = this;
	return function() {
		return f.apply(c, arguments);
	};
});