function CounterConnections(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.connections = 1;
  this.fontSizeNumber = size * 0.7;
  this.fontSizeText = size * 0.19;
  this.text = "connection";

  this.draw = function(context2D) {
    context2D.fillStyle = "black";
    context2D.fillRect(this.x, this.y, this.size, this.size);
    context2D.fillStyle = "white";
    context2D.font = this.fontSizeNumber + "px Arial";
    context2D.fillText(this.connections, this.x + (this.size * 0.3), this.y + (this.size * 0.6));
    context2D.font = this.fontSizeText + "px Arial";
    context2D.fillText(this.text, this.x + (this.size * 0.05), this.y + (this.size * 0.85));
  }

  this.wasClicked = function(x, y) {
    return this.x <= x && this.x + this.size >= x &&
      this.y <= y && this.y + this.size >= y;
  }

  this.increment = function() {
    this.connections > 2 ? this.connections = 1 : this.connections += 1;
  }

  this.changeLanguage = function() {
    if (this.text == "connection") {
      this.text = "  conexão";
    } else {
      this.text = "connection";
    }
  }
}
