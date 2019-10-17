class Particle {
  constructor(x, y, speed, color, lifetime) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
    this.lifetime = lifetime;
    this.lifeCounter = 0;

    //generate random direction between <[-1, 1], [-1, 1]>
    this.dx = (Math.random() * 2) - 1;
    this.dy = (Math.random() * 2) - 1;
    if(this.dx == 0) this.dx = 0.1;
    if(this.dy == 0) this.dy = 0.1;
    this.size = Math.floor(Math.random()*15); //random size
  }

  draw(ctx, canvas) {
    this.lifeCounter++;

    ctx.fillStyle = this.color; //same color as block
    ctx.fillRect(this.x, this.y, this.size, this.size);

    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    if(this.x <= 0 || this.x >= canvas.width) {
      this.dx = -this.dx;
    }
    if(this.y <= 0 || this.y >= canvas.height) {
      this.dy = -this.dy;
    }
  }
}
