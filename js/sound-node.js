class SoundNode {
  constructor(frequency, volume) {
    this.frequency = frequency
    this.volume = volume
    this.color = this.determineColor()
    this.size = this.determineSize()
    this.position = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  }

  // Color dependent on frequency, higher = lighter
  determineColor() { }

  // Color dependent on volume, louder = bigger
  determineSize() { }

  update(){ }
}
