class Frame{

  constructor() {
    this.id = 0
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
        roll2String = this.rolls[1] || '',
        activeClass


    if (this.rolls.length > 0) {
      roll1String = this.isStrike() ? 'X' : this.rolls[0]
    }

    if (this.rolls.length > 1) {
      roll2String = this.isSpare() ? '/' : this.rolls[1]
    }

    return `
      <div class="frames__frame${this.isCurrent() && !this.isFinished() ? ' frames__frame--active' : ''}${this.isFinished() ? ' frames__frame--finished' : ''}">
        <div class="frames__frame__title">${this.id}</div>
        <div class="frames__frame__roll frames__frame__roll--1${this.isCurrent() && !this.isFinished() && this.rolls.length === 0 ? ' frames__frame__roll--active' : ''}">${roll1String}</div>
        <div class="frames__frame__roll frames__frame__roll--2${this.isCurrent() && !this.isFinished() && this.rolls.length > 0 ? ' frames__frame__roll--active' : ''}"">${roll2String}</div>
        <div class="frames__frame__score">${scoreString}</div>
      </div>
    `
  }

}

export default Frame
