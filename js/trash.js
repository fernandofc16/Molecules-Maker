function Trash(image, imageOver, x, y, size) {
  this.x = x;
  this.y = y;
  this.image = image;
  this.imageOver = imageOver;
  this.selectedImage = image;
  this.size = size;

  this.draw = function(context2D) {
    context2D.drawImage(this.selectedImage, this.x, this.y, this.size, this.size);
  }

  this.checkAtomsOverTrash = function(atoms, molecules) {
    for (i in atoms) {
      if (this.x < atoms[i].x + atoms[i].radius * 2 &&
        this.x + this.size > atoms[i].x &&
        this.y < atoms[i].y + atoms[i].radius * 2 &&
        this.size + this.y > atoms[i].y) {
        this.selectedImage = this.imageOver;
        return;
      }
    }

    for (i in molecules) {
      var molecule = molecules[i];

      for (j in molecule.atoms) {
        var atom = molecule.atoms[j];

        if (this.x < atom.x + atom.radius * 2 &&
          this.x + this.size > atom.x &&
          this.y < atom.y + atom.radius * 2 &&
          this.size + this.y > atom.y) {
          this.selectedImage = this.imageOver;
          return;
        }
      }
    }

    this.selectedImage = this.image;
  }

  this.checkAtomsInsideTrash = function(atoms) {
    for (i in atoms) {
      var atom = atoms[i];

      if (this.x < atom.x + atom.radius * 2 &&
        this.x + this.size > atom.x &&
        this.y < atom.y + atom.radius * 2 &&
        this.size + this.y > atom.y) {
        atoms.splice(atoms.indexOf(atom), 1);
        return;
      }
    }
  }

  this.checkMoleculesInsideTrash = function(molecules, molecule3D) {
    for (i in molecules) {
      var molecule = molecules[i];

      for (j in molecule.atoms) {
        var atom = molecule.atoms[j];

        if (this.x < atom.x + atom.radius * 2 &&
          this.x + this.size > atom.x &&
          this.y < atom.y + atom.radius * 2 &&
          this.size + this.y > atom.y) {
          molecules.splice(molecules.indexOf(molecule), 1);
          if (molecule.selectedMolecule) molecule3D.removeAtoms();
          return;
        }
      }
    }
  }

}
