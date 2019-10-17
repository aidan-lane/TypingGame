class Player {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.hp = 3;
    this.currentString = "";
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    //draw current hp
    for(let i = 0;i<this.hp;i++) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.x + i*30 - 14, this.y - 27, 20, 20);
    }
  }
}
