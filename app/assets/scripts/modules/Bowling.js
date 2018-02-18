import Frame from './Frame'

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
      <div class='row'>
        <div class='frames'>${framesHtml}</div>
      </div>
      <div class='row'>
        <div class="total-score">Total score <span class="total-score__number">${score}</span></p>
      </div>
    `
  }

}

export default Bowling
