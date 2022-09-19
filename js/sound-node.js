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
    this.sprite = null;
    this.visible = true
  }

  // Color dependent on frequency, higher = lighter
  determineColor() {
    let val = this.volume / 255;
    let rgb = [val, val, val]
    return PIXI.utils.rgb2hex(rgb);
  }

  // Radius dependent on volume, louder = bigger
  determineRadius() {
    return this.volume;
  }

  update(delta) {
    this.radius -= Math.random() * 5 * delta;
    if (this.radius <= 5) this.visible = false
  }

  getSprite(){
    return this.#createSprite();
  }

  #createSprite() {
    let nodeGraphics = new PIXI.Graphics()
    nodeGraphics.clear();
    nodeGraphics.beginFill(this.color)
    nodeGraphics.drawCircle(0, 0, this.radius)
    nodeGraphics.endFill()

    var texture = this.renderer.generateTexture(nodeGraphics)
    var sprite = new PIXI.Sprite(texture)
    sprite.position.x = this.position.x - this.radius;
    sprite.position.y = this.position.y - this.radius;
    return sprite
  }
}
