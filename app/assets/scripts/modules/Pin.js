class Pin{

  constructor(id, knocked) {
    this.id = id || 0
    this.knocked = knocked || false
  }

  setKnocked(bool) {
      this.knocked = bool
      return this
  }

  isKnocked() {
      return this.knocked
  }

  reset() {
    this.setKnocked(false)
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
    return `<div class="pins__pin${this.isKnocked() ? ' pins__pin--knocked' : ''}"></div>`
  }

}

export default Pin
