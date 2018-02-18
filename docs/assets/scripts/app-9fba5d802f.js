!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var i=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(i);!function(){function e(){a.innerHTML=u.render()}function t(){u.init(),a=document.getElementById("bowling"),o=document.getElementById("play-btn"),l=document.getElementById("reset-btn"),o.addEventListener("click",n,!1),l.addEventListener("click",i,!1),e()}function n(){u.roll(),e(),u.isFinished()&&s()}function i(){u.reset(),e(),o.classList.contains("btn--disabled")&&o.classList.remove("btn--disabled")}function s(){o.classList.add("btn--disabled")}var a,o,l,u=new r.default;document.addEventListener("DOMContentLoaded",t)}()},function(e,t,n){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=function(){function e(){r(this,e),this.frames=[],this.remainingPins=10}return s(e,[{key:"init",value:function(){this.setFrames(this.createFrames())}},{key:"isFinished",value:function(){return 0===this.getRemaining()}},{key:"roll",value:function(){if(!this.isFinished()){var e=this.randomRoll(this.remainingPins);this.remainingPins=this.frames[0].roll(e)}}},{key:"randomRoll",value:function(e){return Math.floor(Math.random()*(e+1))}},{key:"getRemaining",value:function(){return this.remainingPins}},{key:"setRemaining",value:function(e){this.remainingPins=e}},{key:"getScore",value:function(){var e=0;return this.frames.map(function(t){return e+=t.getScore()}),e}},{key:"createFrames",value:function(){var e=[].concat(i(Array(10))).map(function(e,t){return e=new o.default,0===t&&e.setCurrent(!0),e.id=t+1,e});return e.map(function(t,n){n<e.length-1&&t.setNext(e[n+1])}),e}},{key:"setFrames",value:function(e){this.frames=e}},{key:"getFrames",value:function(){return this.frames}},{key:"reset",value:function(){this.init(),this.setRemaining(10)}},{key:"render",value:function(){var e=this.getScore().toString(),t="";return this.frames.map(function(e){return t+=e.render()}),"\n      <div class='row'>\n        <div class='frames'>"+t+"</div>\n      </div>\n      <div class='row row--centered'>\n        <div class=\"total-score "+(this.isFinished()?"total-score--finished":"")+'">Total score:<span class="total-score__number">'+e+"</span></div>\n      </div>\n    "}}]),e}();t.default=l},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){n(this,e),this.id=0,this.rolls=[],this.score=0,this.current=!1,this.next=null,this.addNextScore=0}return i(e,[{key:"getScore",value:function(){return this.score}},{key:"setCurrent",value:function(e){return this.current=e,this}},{key:"isCurrent",value:function(){return this.current}},{key:"isLast",value:function(){return null===this.next}},{key:"isFinished",value:function(){return this.isStrike()||2===this.rolls.length}},{key:"isSpare",value:function(){return this.rolls.length>=2&&this.rolls[0]+this.rolls[1]===10}},{key:"isStrike",value:function(){return this.rolls.length>=1&&10===this.rolls[0]}},{key:"getNext",value:function(){return this.next}},{key:"setNext",value:function(e){this.next=e}},{key:"moveNext",value:function(){this.setCurrent(!1).getNext().setCurrent(!0)}},{key:"roll",value:function(e){if(!this.isCurrent())return this.addNextScore>0&&(this.addNextScore--,this.score+=e),this.getNext().roll(e);if(this.score+=e,this.rolls.push(e),this.isFinished()){if(this.addNextScore=this.isStrike()?2:this.isSpare()?1:0,this.isLast())return 0;this.moveNext()}return this.isStrike()||this.isFinished()?10:10-this.getScore()}},{key:"render",value:function(){var e=this.score||"",t=this.rolls[0]||"",n=this.rolls[1]||"";return this.rolls.length>0&&(t=this.isStrike()?"X":this.rolls[0]),this.rolls.length>1&&(n=this.isSpare()?"/":this.rolls[1]),'\n      <div class="frames__frame'+(this.isCurrent()&&!this.isFinished()?" frames__frame--active":"")+(this.isFinished()?" frames__frame--finished":"")+'">\n        <div class="frames__frame__title">'+this.id+'</div>\n        <div class="frames__frame__roll frames__frame__roll--1'+(this.isCurrent()&&!this.isFinished()&&0===this.rolls.length?" frames__frame__roll--active":"")+'">'+t+'</div>\n        <div class="frames__frame__roll frames__frame__roll--2'+(this.isCurrent()&&!this.isFinished()&&this.rolls.length>0?" frames__frame__roll--active":"")+'"">'+n+'</div>\n        <div class="frames__frame__score">'+e+"</div>\n      </div>\n    "}}]),e}();t.default=r}]);