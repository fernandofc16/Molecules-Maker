function LanguageButton(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.fontSizeNumber = size * 0.7;
  this.text = "EN";

  this.draw = function(context2D) {
    context2D.fillStyle = "black";
    context2D.fillRect(this.x, this.y, this.size, this.size);
    context2D.fillStyle = "white";
    context2D.font = this.fontSizeNumber + "px Arial";
    context2D.fillText(this.text, this.x + (this.size * 0.015), this.y + (this.size * 0.75));
  }

  this.wasClicked = function(x, y) {
    return this.x <= x && this.x + this.size >= x &&
      this.y <= y && this.y + this.size >= y;
  }

  this.changeLanguage = function() {
    if (this.text == "EN") {
      this.text = "PT";
    } else {
      this.text = "EN";
    }
  }
}
