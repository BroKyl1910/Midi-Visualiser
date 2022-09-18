class SoundNode {
  constructor(frequency, volume, renderer) {
    this.frequency = frequency
    this.volume = volume
    this.renderer = renderer
    this.color = this.determineColor()
    this.radius = this.determineRadius()
    this.position = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }
    this.sprite = this.getSprite()
    this.visible = true
  }

  getSprite(){
    return this.#createSprite(this.renderer);
  }

  // Color dependent on frequency, higher = lighter
  determineColor() {
    return Math.random()*0xFFFFFF<<0
  }

  // Radius dependent on volume, louder = bigger
  determineRadius() {
    return this.volume;
  }

  update() {
    this.radius -= 1;
    if (this.radius <= 5) this.visible = false
  }

  #createSprite(renderer) {
    let NodeGraphics = new PIXI.Graphics()
    NodeGraphics.clear();
    NodeGraphics.beginFill(this.color)
    NodeGraphics.drawCircle(0, 0, this.radius/2)
    NodeGraphics.endFill()

    var texture = renderer.generateTexture(NodeGraphics)
    var sprite = new PIXI.Sprite(texture)
    sprite.position.x = this.position.x - 0.5 * this.radius
    sprite.position.y = this.position.y - 0.5 * this.radius
    return sprite
  }
}
