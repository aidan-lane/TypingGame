const characters = "abcdefghijklmnopqrstuvwxyz ";

class Block {
  constructor(x, y, w, h, maxA, maxN) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.adj = adjectives[Math.floor(Math.random()*adjectives.length)];
    while(this.adj.length > maxA) {
      this.adj = adjectives[Math.floor(Math.random()*adjectives.length)];
    }

    this.noun = nouns[Math.floor(Math.random()*nouns.length)];
    while(this.noun.length > maxN) {
      this.noun = nouns[Math.floor(Math.random()*nouns.length)];
    }

    this.string = this.adj + " " + this.noun;
  }

  draw(ctx) {
    ctx.fillStyle = "#9df18c";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#fc5757";
    ctx.font = "bold 20px Arial";
    ctx.fillText(this.adj, this.x + (this.width/2) - ctx.measureText(this.adj).width/2, this.y + 20);
    ctx.fillText(this.noun, this.x + (this.width/2) - ctx.measureText(this.noun).width/2, this.y + 38);
  }
}
