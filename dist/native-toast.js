(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.nativeToast = factory());
}(this, (function () { 'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var prevToast = null;

var icons = {
  warning: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6\" /></svg>",
  success: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M2 20 L12 28 30 4\" /></svg>",
  info: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M16 14 L16 23 M16 8 L16 10\" /><circle cx=\"16\" cy=\"16\" r=\"14\" /></svg>",
  error: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25\" /></svg>"
};

var Toast = function Toast(ref) {
  if ( ref === void 0 ) ref = {};
  var message = ref.message; if ( message === void 0 ) message = '';
  var position = ref.position; if ( position === void 0 ) position = 'bottom';
  var timeout = ref.timeout; if ( timeout === void 0 ) timeout = 3000;
  var el = ref.el; if ( el === void 0 ) el = document.body;
  var square = ref.square; if ( square === void 0 ) square = false;
  var type = ref.type; if ( type === void 0 ) type = '';
  var debug = ref.debug; if ( debug === void 0 ) debug = false;
  var edge = ref.edge; if ( edge === void 0 ) edge = false;

  if (prevToast) {
    prevToast.destroy();
  }

  this.message = message;
  this.position = position;
  this.el = el;
  this.timeout = timeout;

  this.toast = document.createElement('div');
  this.toast.className = "native-toast native-toast-" + (this.position);

  if (type) {
    this.toast.className += " native-toast-" + type;
    this.message = "<span class=\"native-toast-icon-" + type + "\">" + (icons[type] || '') + "</span>" + (this.message);
  }

  this.toast.innerHTML = this.message;

  if (edge) {
    this.toast.className += ' native-toast-edge';
  }

  if (square) {
    this.toast.style.borderRadius = '3px';
  }

  this.el.appendChild(this.toast);

  prevToast = this;

  this.show();
  if (!debug) {
    this.hide();
  }
};

Toast.prototype.show = function show () {
    var this$1 = this;

  setTimeout(function () {
    this$1.toast.classList.add('native-toast-shown');
  }, 300);
};

Toast.prototype.hide = function hide () {
    var this$1 = this;

  setTimeout(function () {
    this$1.destroy();
  }, this.timeout);
};

Toast.prototype.destroy = function destroy () {
    var this$1 = this;

  if (!this.toast) { return }

  this.toast.classList.remove('native-toast-shown');

  setTimeout(function () {
    if (this$1.toast) {
      this$1.el.removeChild(this$1.toast);
      this$1.toast = null;
    }
  }, 300);
};

function toast(options) {
  return new Toast(options)
}

var loop = function () {
  var type = list[i];

  toast[type] = function (options) { return toast(index({}, {type: type}, options)); };
};

for (var i = 0, list = ['success', 'info', 'warning', 'error']; i < list.length; i += 1) loop();

return toast;

})));
