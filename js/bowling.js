// Frame class
class Frame{

  constructor() {
    this.rolls = []
    this.score = 0
    this.current = false
    this.next = null
    this.addNextScore = 0
  }

  getScore() {
      return this.score
  }

  setCurrent(bool) {
      this.current = bool
      return this
  }

  isCurrent() {
      return this.current
  }

  isLast() {
      return this.next === null
  }

  isFinished() {
      return this.isStrike() || this.rolls.length === 2
  }

  isSpare() {
      return this.rolls.length >= 2 && (this.rolls[0] + this.rolls[1]) === 10
  }

  isStrike() {
      return this.rolls.length >= 1 && this.rolls[0] === 10
  }

  getNext() {
      return this.next
  }

  setNext(frame) {
      this.next = frame
  }

  moveNext() {
      this.setCurrent(false).getNext().setCurrent(true)
  }

  roll(num) {

    if (!this.isCurrent()) {

      if (this.addNextScore > 0) {
        this.addNextScore--
        this.score += num
      }

      return this.getNext().roll(num)
    }

    this.score += num

    this.rolls.push(num)

    if (this.isFinished()) {
      this.addNextScore = this.isStrike() ? 2 : this.isSpare() ? 1 : 0

      if (!this.isLast()) {
        this.moveNext()
      } else {
        return 0;
      }
    }

    return this.isStrike() || this.isFinished() ? 10 : (10 - this.getScore())
  }

  render() {

    let scoreString = this.score || '',
        roll1String = this.rolls[0] || '',
        roll2String = this.rolls[1] || ''

    if (this.rolls.length > 0) {
      roll1String = this.isStrike() ? 'X' : this.rolls[0]
    }

    if (this.rolls.length > 1) {
      roll2String = this.isSpare() ? '/' : this.rolls[1]
    }

    return `
      <div class="frames__frame">
        <div class="frames__frame__roll frames__frame__roll--1">${roll1String}</div>
        <div class="frames__frame__roll frames__frame__roll--2">${roll2String}</div>
        <div class="frames__frame__score">${scoreString}</div>
      </div>
    `
  }

}

// Bowling class
class Bowling {

  constructor() {
    this.frames = []
    this.remainingPins = 10
  }

  init() {
    this.setFrames(this.createFrames())
  }

  isFinished() {
    return this.getRemaining() === 0
  }

  roll() {
    let rollNumber = this.randomRoll(this.remainingPins)
    this.remainingPins = this.frames[0].roll(rollNumber)
  }

  randomRoll(max) {
    return Math.floor(Math.random() * (max + 1))
  }

  getRemaining() {
    return this.remainingPins
  }

  getScore() {
    let score = 0
    this.frames.map(frame => score += frame.getScore())

    return score
  }

  createFrames() {
    let frames = [...Array(10)].map((frame, i) => {
      frame = new Frame()
      // initiate first frame as current
      if (i === 0) frame.setCurrent(true)
      return frame
    })

    // the last frame doesn't have a 'next' element
    frames.map((frame, i) => {
      if (i < frames.length-1) frame.setNext(frames[i+1])
    })

    return frames
  }

  setFrames(frames) {
    this.frames = frames
  }

  getFrames() {
    return this.frames
  }

  render() {
    const score = this.getScore().toString()
    let framesHtml = ``

    this.frames.map(frame => framesHtml += frame.render())

    return `
      <div class='frames'>${framesHtml}</div>
      <p class="frame-total-score">Overall Score <span class="frame-total-score-figure">${score}</span></p>
    `
  }

}

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
