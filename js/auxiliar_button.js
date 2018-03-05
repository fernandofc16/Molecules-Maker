function AuxiliarButton(x, y, size, text_en, text_pt) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.text_en = text_en;
  this.text_pt = text_pt;
  this.text = text_en;
  this.language = "en";
  this.fontSize = size * 0.2;

  this.draw = function(context2D) {
    context2D.fillStyle = "black";
    context2D.fillRect(this.x, this.y, this.size, this.size);
    context2D.fillStyle = "white";
    context2D.font = this.fontSize + "px Arial";
    context2D.fillText(this.text[0], this.x + (this.size * 0.05), this.y + (this.size * 0.3));
    context2D.fillText(this.text[1], this.x + (this.size * 0.35), this.y + (this.size * 0.6));
    context2D.fillText(this.text[2], this.x + (this.size * 0.05), this.y + (this.size * 0.85));
  }

  this.wasClicked = function(x, y) {
    return this.x <= x && this.x + this.size >= x &&
      this.y <= y && this.y + this.size >= y;
  }

  this.changeLanguage = function() {
    switch (this.language) {
      case "en":
        this.language = "pt";
        this.text = this.text_pt;
        break;
      case "pt":
        this.language = "en";
        this.text = this.text_en;
        break;
    }
  }

  this.completeMoleculeWithHydrogen = function(molecule, hydrogenImage) {

    for (i in molecule.atoms) {
      var atom = molecule.atoms[i];
      for (j in atom.sidesConnected) {
        if (atom.sidesConnected[j] == false && atom.connections > 0) {

          var hydrogenAtom = new Atom(atom.x, atom.y - (this.size * 0.3), (this.size * 0.3), hydrogenImage, 0);
          var position = j;

          if (position == 0) {
            hydrogenAtom = new Atom(atom.x + atom.radius - (this.size * 0.3), (atom.y - (this.size * 0.3) * 2) + (this.size * 0.3) * 0.15, (this.size * 0.3), hydrogenImage, 0);
          } else if (position == 1) {
            hydrogenAtom = new Atom((atom.x + atom.radius * 2) - atom.radius * 0.1, atom.y + atom.radius - (this.size * 0.3), (this.size * 0.3), hydrogenImage, 0);
          } else if (position == 2) {
            hydrogenAtom = new Atom(atom.x + atom.radius - (this.size * 0.3), (atom.y + atom.radius * 1.95) - (this.size * 0.3) * 0.15, (this.size * 0.3), hydrogenImage, 0);
          } else {
            hydrogenAtom = new Atom((atom.x - (this.size * 0.3) * 2) + (this.size * 0.3) * 0.15, atom.y + atom.radius - (this.size * 0.3), (this.size * 0.3), hydrogenImage, 0);
          }

          atom.atomsConnected[j] = hydrogenAtom;
          atom.sidesConnected[j] = true;
          atom.connections -= 1;
          atom.amountOfAtomsConnected += 1;
          hydrogenAtom.connections -= 1;
          hydrogenAtom.amountOfAtomsConnected += 1;
          molecule.connections.push(new Connection(hydrogenAtom, atom, 1));
          molecule.atoms.push(hydrogenAtom);
        }
      }
    }
  }

  this.createBenzene = function(molecules, carbonImage) {

    var benzeneMolecule = new Molecule();
    var c1 = new Atom((this.size * 5), (this.size), (this.size * 0.5), carbonImage, 1);
    c1.connections = 1;
    c1.amountOfAtomsConnected = 3;
    c1.sidesConnected[0] = true;
    c1.sidesConnected[1] = true;
    c1.sidesConnected[2] = true;
    benzeneMolecule.atoms.push(c1);

    var c2 = new Atom((this.size * 5), (this.size * 1.8), (this.size * 0.5), carbonImage, 1);
    c2.connections = 1;
    c2.amountOfAtomsConnected = 3;
    c2.sidesConnected[0] = true;
    c2.sidesConnected[1] = true;
    c2.sidesConnected[2] = true;
    benzeneMolecule.atoms.push(c2);
    benzeneMolecule.connections.push(new Connection(c1, c2, 1));
    c1.atomsConnected[2] = c2;

    var c3 = new Atom((this.size * 5.7), (this.size * 2.2), (this.size * 0.5), carbonImage, 1);
    c3.connections = 1;
    c3.amountOfAtomsConnected = 3;
    c3.sidesConnected[0] = true;
    c3.sidesConnected[1] = true;
    c3.sidesConnected[3] = true;
    benzeneMolecule.atoms.push(c3);
    benzeneMolecule.connections.push(new Connection(c2, c3, 2));
    c2.atomsConnected[1] = c3;

    var c4 = new Atom((this.size * 6.4), (this.size * 1.8), (this.size * 0.5), carbonImage, 1);
    c4.connections = 1;
    c4.amountOfAtomsConnected = 3;
    c4.sidesConnected[0] = true;
    c4.sidesConnected[2] = true;
    c4.sidesConnected[3] = true;
    benzeneMolecule.atoms.push(c4);
    benzeneMolecule.connections.push(new Connection(c3, c4, 1));
    c3.atomsConnected[1] = c4;

    var c5 = new Atom((this.size * 6.4), (this.size), (this.size * 0.5), carbonImage, 1);
    c5.connections = 1;
    c5.amountOfAtomsConnected = 3;
    c5.sidesConnected[0] = true;
    c5.sidesConnected[2] = true;
    c5.sidesConnected[3] = true;
    benzeneMolecule.atoms.push(c5);
    benzeneMolecule.connections.push(new Connection(c4, c5, 2));
    c4.atomsConnected[0] = c5;

    var c6 = new Atom((this.size * 5.7), (this.size * 0.55), (this.size * 0.5), carbonImage, 1);
    c6.connections = 1;
    c6.amountOfAtomsConnected = 3;
    c6.sidesConnected[1] = true;
    c6.sidesConnected[2] = true;
    c6.sidesConnected[3] = true;
    benzeneMolecule.atoms.push(c6);
    benzeneMolecule.connections.push(new Connection(c5, c6, 1));
    benzeneMolecule.connections.push(new Connection(c6, c1, 2));
    c5.atomsConnected[3] = c6;
    c6.atomsConnected[3] = c1;
    molecules.push(benzeneMolecule);
  }
}
