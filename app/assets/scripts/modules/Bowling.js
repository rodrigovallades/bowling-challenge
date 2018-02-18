import Frame from './Frame'
import Pin from './Pin'

class Bowling {

  constructor() {
    this.frames = []
    this.pins = []
    this.remainingPins = 10
  }

  init() {
    this.setFrames(this.createFrames(10))
    this.setPins(this.createPins(10))
  }

  isFinished() {
    return this.getRemaining() === 0
  }

  roll() {
    if (this.isFinished()) return
    const currentFrame = this.getCurrentFrame()
    const rollNumber = this.randomRoll(this.remainingPins)
    this.remainingPins = this.frames[0].roll(rollNumber)

    this.resetPins()
    this.getPins().map((pin, i) => {
      pin.setKnocked(i >= 10 - currentFrame.getRollsScore())
    })

  }

  randomRoll(max) {
    return Math.floor(Math.random() * (max + 1))
  }

  getCurrentFrame() {
    return this.getFrames().find(frame => frame.isCurrent())
  }

  resetPins() {
    this.getPins().map(pin => pin.reset())
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

  createPins(num) {
    let pins = [...Array(num)].map((pin, i) => {
      pin = new Pin(i, false)
      return pin
    })

    return pins
  }

  setFrames(frames) {
    this.frames = frames
  }

  setPins(pins) {
    this.pins = pins
  }

  getFrames() {
    return this.frames
  }

  getPins() {
    return this.pins
  }

  reset() {
    this.init()
    this.setRemaining(10)
  }

  render() {
    const score = this.getScore().toString()
    let framesHtml = ``,
        pinsHtml = ``

    this.getFrames().map(frame => framesHtml += frame.render())
    this.getPins().map(pin => pinsHtml += pin.render())

    return `
      <div class='row'>
        <div class='frames'>${framesHtml}</div>
      </div>
      <div class='row'>
        <div class='pins'>${pinsHtml}</div>
      </div>
      <div class='row row--centered'>
        <div class="total-score ${this.isFinished() ? 'total-score--finished' : ''}">Total score:<span class="total-score__number">${score}</span></div>
      </div>
    `
  }

}

export default Bowling
