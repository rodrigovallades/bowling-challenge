import Frame from './Frame'

class Bowling {

  constructor() {
    this.frames = []
    this.remainingPins = 10
  }

  init() {
    this.setFrames(this.createFrames())
    this.setFrames(this.createFrames(10))
  }

  isFinished() {
    return this.getRemaining() === 0
  }

  roll() {
    if (this.isFinished()) return
    let rollNumber = this.randomRoll(this.remainingPins)
    this.remainingPins = this.frames[0].roll(rollNumber)
  }

  randomRoll(max) {
    return Math.floor(Math.random() * (max + 1))
  }

  getRemaining() {
    return this.remainingPins
  }

  setRemaining(remaining) {
    this.remainingPins = remaining
  }

  getScore() {
    let score = 0
    this.frames.map(frame => score += frame.getScore())

    return score
  }

  createFrames(num) {
    let frames = [...Array(num)].map((frame, i) => {
      frame = new Frame()
      return frame
    })

    frames.map((frame, i) => {
      frame.id = i+1
      // initiate first frame as current
      if (i === 0) frame.setCurrent(true)
      // the last frame doesn't have a 'next' element
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

  reset() {
    this.init()
    this.setRemaining(10)
  }

  render() {
    const score = this.getScore().toString()
    let framesHtml = ``

    this.frames.map(frame => framesHtml += frame.render())

    return `
      <div class='row'>
        <div class='frames'>${framesHtml}</div>
      </div>
      <div class='row row--centered'>
        <div class="total-score ${this.isFinished() ? 'total-score--finished' : ''}">Total score:<span class="total-score__number">${score}</span></div>
      </div>
    `
  }

}

export default Bowling
