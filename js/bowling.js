// Frame class
class Frame{

  constructor() {
    this.rolls = []
    this.score = 0
    this.current = false
    this.next = null
    this.addNextScore = 0
  }

}

// Bowling class
class Bowling {

  constructor() {
    this.frames = []
    this.remainingPins = 10
  }

}
