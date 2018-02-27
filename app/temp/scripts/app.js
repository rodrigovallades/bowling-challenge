/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Bowling = __webpack_require__(1);

	var _Bowling2 = _interopRequireDefault(_Bowling);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	  var bowlingGameEl, playBtn, resetBtn;

	  var bowlingGame = new _Bowling2.default();

	  function renderGame() {
	    bowlingGameEl.innerHTML = bowlingGame.render();
	  };

	  function onLoad() {
	    bowlingGame.init();
	    bowlingGameEl = document.getElementById('bowling');
	    playBtn = document.getElementById('play-btn');
	    resetBtn = document.getElementById('reset-btn');
	    playBtn.addEventListener('click', play, false);
	    resetBtn.addEventListener('click', reset, false);
	    renderGame();
	  };

	  function play() {
	    bowlingGame.roll();
	    renderGame();

	    if (bowlingGame.isFinished()) {
	      onFinish();
	    }
	  };

	  function reset() {
	    bowlingGame.reset();
	    renderGame();
	    if (playBtn.classList.contains('btn--disabled')) playBtn.classList.remove('btn--disabled');
	  };

	  function onFinish() {
	    playBtn.classList.add('btn--disabled');
	  };

	  document.addEventListener('DOMContentLoaded', onLoad);
	})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Frame = __webpack_require__(2);

	var _Frame2 = _interopRequireDefault(_Frame);

	var _Pin = __webpack_require__(3);

	var _Pin2 = _interopRequireDefault(_Pin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bowling = function () {
	  function Bowling() {
	    _classCallCheck(this, Bowling);

	    this.frames = [];
	    this.pins = [];
	    this.remainingPins = 10;
	  }

	  _createClass(Bowling, [{
	    key: 'init',
	    value: function init() {
	      this.setFrames(this.createFrames(10));
	      this.setPins(this.createPins(10));
	    }
	  }, {
	    key: 'isFinished',
	    value: function isFinished() {
	      return this.getRemaining() === 0;
	    }
	  }, {
	    key: 'roll',
	    value: function roll() {
	      if (this.isFinished()) return;
	      var currentFrame = this.getCurrentFrame();
	      var rollNumber = this.randomRoll(this.remainingPins);
	      this.remainingPins = this.frames[0].roll(rollNumber);

	      this.resetPins();
	      this.getPins().map(function (pin, i) {
	        pin.setKnocked(i >= 10 - currentFrame.getRollsScore());
	      });
	    }
	  }, {
	    key: 'randomRoll',
	    value: function randomRoll(max) {
	      return Math.floor(Math.random() * (max + 1));
	    }
	  }, {
	    key: 'getCurrentFrame',
	    value: function getCurrentFrame() {
	      return this.getFrames().find(function (frame) {
	        return frame.isCurrent();
	      });
	    }
	  }, {
	    key: 'resetPins',
	    value: function resetPins() {
	      this.getPins().map(function (pin) {
	        return pin.reset();
	      });
	    }
	  }, {
	    key: 'getRemaining',
	    value: function getRemaining() {
	      return this.remainingPins;
	    }
	  }, {
	    key: 'setRemaining',
	    value: function setRemaining(remaining) {
	      this.remainingPins = remaining;
	    }
	  }, {
	    key: 'getScore',
	    value: function getScore() {
	      var score = 0;
	      this.frames.map(function (frame) {
	        return score += frame.getScore();
	      });

	      return score;
	    }
	  }, {
	    key: 'createFrames',
	    value: function createFrames(num) {
	      var frames = [].concat(_toConsumableArray(Array(num))).map(function (frame, i) {
	        frame = new _Frame2.default();
	        return frame;
	      });

	      frames.map(function (frame, i) {
	        frame.id = i + 1;
	        // initiate first frame as current
	        if (i === 0) frame.setCurrent(true);
	        // the last frame doesn't have a 'next' element
	        if (i < frames.length - 1) frame.setNext(frames[i + 1]);
	      });

	      return frames;
	    }
	  }, {
	    key: 'createPins',
	    value: function createPins(num) {
	      var pins = [].concat(_toConsumableArray(Array(num))).map(function (pin, i) {
	        pin = new _Pin2.default(i, false);
	        return pin;
	      });

	      return pins;
	    }
	  }, {
	    key: 'setFrames',
	    value: function setFrames(frames) {
	      this.frames = frames;
	    }
	  }, {
	    key: 'setPins',
	    value: function setPins(pins) {
	      this.pins = pins;
	    }
	  }, {
	    key: 'getFrames',
	    value: function getFrames() {
	      return this.frames;
	    }
	  }, {
	    key: 'getPins',
	    value: function getPins() {
	      return this.pins;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.init();
	      this.setRemaining(10);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var score = this.getScore().toString();
	      var framesHtml = '',
	          pinsHtml = '';

	      this.getFrames().map(function (frame) {
	        return framesHtml += frame.render();
	      });
	      this.getPins().map(function (pin, i) {
	        pinsHtml += pin.render();
	        if (i == 3 || i == 6 || i == 8) {
	          pinsHtml += '<br>';
	        }
	      });

	      return '\n      <div class=\'frames\'>' + framesHtml + '</div>\n      <div class=\'pins\'>' + pinsHtml + '</div>\n      <div class="total-score' + (this.isFinished() ? ' total-score--finished' : '') + '">Total score:<span class="total-score__number">' + score + '</span></div>      \n    ';
	    }
	  }]);

	  return Bowling;
	}();

	exports.default = Bowling;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Frame = function () {
	  function Frame() {
	    _classCallCheck(this, Frame);

	    this.id = 0;
	    this.rolls = [];
	    this.score = 0;
	    this.current = false;
	    this.next = null;
	    this.addNextScore = 0;
	  }

	  _createClass(Frame, [{
	    key: 'getScore',
	    value: function getScore() {
	      return this.score;
	    }
	  }, {
	    key: 'getRollsScore',
	    value: function getRollsScore() {
	      if (this.rolls.length) {
	        return this.rolls.reduce(function (a, b) {
	          return a + b;
	        });
	      }
	    }
	  }, {
	    key: 'setCurrent',
	    value: function setCurrent(bool) {
	      this.current = bool;
	      return this;
	    }
	  }, {
	    key: 'isCurrent',
	    value: function isCurrent() {
	      return this.current;
	    }
	  }, {
	    key: 'isLast',
	    value: function isLast() {
	      return this.next === null;
	    }
	  }, {
	    key: 'isFinished',
	    value: function isFinished() {
	      return this.isStrike() || this.rolls.length === 2;
	    }
	  }, {
	    key: 'isSpare',
	    value: function isSpare() {
	      return this.rolls.length >= 2 && this.rolls[0] + this.rolls[1] === 10;
	    }
	  }, {
	    key: 'isStrike',
	    value: function isStrike() {
	      return this.rolls.length >= 1 && this.rolls[0] === 10;
	    }
	  }, {
	    key: 'getNext',
	    value: function getNext() {
	      return this.next;
	    }
	  }, {
	    key: 'setNext',
	    value: function setNext(frame) {
	      this.next = frame;
	    }
	  }, {
	    key: 'moveNext',
	    value: function moveNext() {
	      this.setCurrent(false).getNext().setCurrent(true);
	    }
	  }, {
	    key: 'roll',
	    value: function roll(num) {

	      if (!this.isCurrent()) {

	        if (this.addNextScore > 0) {
	          this.addNextScore--;
	          this.score += num;
	        }

	        return this.getNext().roll(num);
	      }

	      this.score += num;
	      this.rolls.push(num);

	      if (this.isFinished()) {
	        this.addNextScore = this.isStrike() ? 2 : this.isSpare() ? 1 : 0;

	        if (!this.isLast()) {
	          this.moveNext();
	        } else {
	          return 0;
	        }
	      }

	      return this.isStrike() || this.isFinished() ? 10 : 10 - this.getScore();
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var scoreString = this.score || '',
	          roll1String = this.rolls[0] || '',
	          roll2String = this.rolls[1] || '',
	          activeClass = void 0;

	      if (this.rolls.length > 0) {
	        roll1String = this.isStrike() ? 'X' : this.rolls[0];
	      }

	      if (this.rolls.length > 1) {
	        roll2String = this.isSpare() ? '/' : this.rolls[1];
	      }

	      return '\n      <div class="frames__frame' + (this.isCurrent() && !this.isFinished() ? ' frames__frame--active' : '') + (this.isFinished() ? ' frames__frame--finished' : '') + '">\n        <div class="frames__frame__title">' + this.id + '</div>\n        <div class="frames__frame__roll frames__frame__roll--1' + (this.isCurrent() && !this.isFinished() && this.rolls.length === 0 ? ' frames__frame__roll--active' : '') + '">' + roll1String + '</div>\n        <div class="frames__frame__roll frames__frame__roll--2' + (this.isCurrent() && !this.isFinished() && this.rolls.length > 0 ? ' frames__frame__roll--active' : '') + '"">' + roll2String + '</div>\n        <div class="frames__frame__score">' + scoreString + '</div>\n      </div>\n    ';
	    }
	  }]);

	  return Frame;
	}();

	exports.default = Frame;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pin = function () {
	  function Pin(id, knocked) {
	    _classCallCheck(this, Pin);

	    this.id = id || 0;
	    this.knocked = knocked || false;
	  }

	  _createClass(Pin, [{
	    key: 'setKnocked',
	    value: function setKnocked(bool) {
	      this.knocked = bool;
	      return this;
	    }
	  }, {
	    key: 'isKnocked',
	    value: function isKnocked() {
	      return this.knocked;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.setKnocked(false);
	    }
	  }, {
	    key: 'roll',
	    value: function roll(num) {

	      if (!this.isCurrent()) {

	        if (this.addNextScore > 0) {
	          this.addNextScore--;
	          this.score += num;
	        }

	        return this.getNext().roll(num);
	      }

	      this.score += num;
	      this.rolls.push(num);

	      if (this.isFinished()) {
	        this.addNextScore = this.isStrike() ? 2 : this.isSpare() ? 1 : 0;

	        if (!this.isLast()) {
	          this.moveNext();
	        } else {
	          return 0;
	        }
	      }

	      return this.isStrike() || this.isFinished() ? 10 : 10 - this.getScore();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<div class="pins__pin' + (this.isKnocked() ? ' pins__pin--knocked' : '') + '"></div>';
	    }
	  }]);

	  return Pin;
	}();

	exports.default = Pin;

/***/ })
/******/ ]);