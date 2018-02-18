import Bowling from './modules/Bowling'

(function() {
  var bowlGameEl,
      playBtn

  const bowlingGame = new Bowling()

  function renderGame() {
    bowlGameEl.innerHTML = bowlingGame.render()
  };

  function onLoad() {
    bowlingGame.init()
    bowlGameEl = document.getElementById('bowling')
    playBtn = document.getElementById('bowling-btn')
    playBtn.addEventListener('click', play, false)
    renderGame()
  };

  function play() {
    bowlingGame.roll()
    renderGame()

    if (bowlingGame.isFinished()) onFinish()
  };

  function onFinish() {
    playBtn.remove()
  };

  document.addEventListener('DOMContentLoaded', onLoad)
}())
