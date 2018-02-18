import Bowling from './modules/Bowling'

(function() {
  var bowlingGameEl,
      playBtn,
      resetBtn

  const bowlingGame = new Bowling()

  function renderGame() {
    bowlingGameEl.innerHTML = bowlingGame.render()
  };

  function onLoad() {
    bowlingGame.init()
    bowlingGameEl = document.getElementById('bowling')
    playBtn = document.getElementById('play-btn')
    resetBtn = document.getElementById('reset-btn')
    playBtn.addEventListener('click', play, false)
    resetBtn.addEventListener('click', reset, false)
    renderGame()
  };

  function play() {
    bowlingGame.roll();
    renderGame();

    if (bowlingGame.isFinished()) {
        onFinish();
    }
  };

  function reset() {
    bowlingGame.reset()
    renderGame()
    if (playBtn.classList.contains('btn--disabled')) playBtn.classList.remove('btn--disabled')
  };

  function onFinish() {
    playBtn.classList.add('btn--disabled')
  };

  document.addEventListener('DOMContentLoaded', onLoad)
}())
