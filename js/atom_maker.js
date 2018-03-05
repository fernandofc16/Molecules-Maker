function AtomMaker(x, y, size, image_en, image_pt, atomImage, type) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.image_en = image_en;
  this.image_pt = image_pt;
  this.language = "en";
  this.image = image_en;
  this.atomImage = atomImage;
  this.type = type;

  this.draw = function(context2D) {
    context2D.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  this.wasClicked = function(x, y) {
    return this.x <= x && this.x + this.size >= x &&
      this.y <= y && this.y + this.size >= y;
  }

  this.changeLanguage = function() {
    switch (this.language) {
      case "en":
        this.language = "pt";
        this.image = this.image_pt;
        break;
      case "pt":
        this.language = "en";
        this.image = this.image_en;
        break;
    }
  }

  this.makeAtom = function(atoms) {
    switch (this.type) {
      case 0:
        atoms.push(new Atom(this.x + this.size, this.y + (this.size / 2) - (this.size * 0.3), (this.size * 0.3), this.atomImage, 0));
        break;
      case 1:
        atoms.push(new Atom(this.x + this.size, this.y + (this.size / 2) - (this.size * 0.5), (this.size * 0.5), this.atomImage, 1));
        break;
      case 2:
        atoms.push(new Atom(this.x + this.size, this.y + (this.size / 2) - (this.size * 0.4), (this.size * 0.4), this.atomImage, 2));
        break;
      case 3:
        atoms.push(new Atom(this.x + this.size, this.y + (this.size / 2) - (this.size * 0.45), (this.size * 0.45), this.atomImage, 3));
    }
  }

}
