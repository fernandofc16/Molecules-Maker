function Molecule() {
  this.atoms = new Array();
  this.isDragging = false;
  this.touchIdentifier = null;
  this.connections = new Array();
  this.selectedMolecule = false;
  this.userIdentifier = null;

  this.draw = function(context2D) {
    for (i in this.connections) {
      this.connections[i].draw(context2D);
    }

    for (i in this.atoms) {
      let atom = this.atoms[i];
      if (this.selectedMolecule) {
        context2D.fillStyle = "rgba(0, 0, 255, 0.1)";
        context2D.beginPath();
        context2D.arc(atom.x + atom.radius, atom.y + atom.radius, atom.radius * 0.85, 0, Math.PI * 2);
        context2D.closePath();
        context2D.fill();
      }
      atom.draw(context2D);
    }
  }

  this.move = function(x, y) {
    for (i in this.atoms) {
      this.atoms[i].move(x, y);
    }
    this.updateConnections(x, y);
  }

  this.updateConnections = function(x, y) {
    for (i in this.connections) {
      this.connections[i].x += x;
      this.connections[i].y += y;
    }
  }

  this.isMouseOver = function(mouseX, mouseY) {
    for (i in this.atoms) {
      if (this.atoms[i].isMouseOver(mouseX, mouseY)) return true;
    }
    return false;
  }

  this.resetUsesInMesh = function() {
    for (i in this.atoms) {
      this.atoms[i].hasBeenUsedInMesh = false;
    }
  }

  this.checkConnections = function(atoms, molecules, counterConn) {

    for (i in molecules) {
      var mol = molecules[i];
      if (this != mol) {
        for (k in this.atoms) {
          var thisAtom = this.atoms[k];
          for (l in mol.atoms) {
            var otherMolAtom = mol.atoms[l];
            if (thisAtom.connections > 0 && otherMolAtom.connections > 0) {
              thisAtom.checkConnections(otherMolAtom, atoms, this, mol, molecules, counterConn);
            }
          }
        }
      }
    }

  }

}

function Connection(atom1, atom2, connections) {
  this.atom1 = atom1;
  this.atom2 = atom2;

  this.counter = connections;

  this.draw = function(context2D) {
    context2D.beginPath();
    switch (this.counter) {
      case 1:
        context2D.moveTo(atom1.x + atom1.radius, atom1.y + atom1.radius);
        context2D.lineTo(atom2.x + atom2.radius, atom2.y + atom2.radius);
        break;
      case 2:
        context2D.moveTo(atom1.x + atom1.radius - 5, atom1.y + atom1.radius - 5);
        context2D.lineTo(atom2.x + atom2.radius - 5, atom2.y + atom2.radius - 5);
        context2D.moveTo(atom1.x + atom1.radius + 5, atom1.y + atom1.radius + 5);
        context2D.lineTo(atom2.x + atom2.radius + 5, atom2.y + atom2.radius + 5);
        break;
      case 3:
        context2D.moveTo(atom1.x + atom1.radius, atom1.y + atom1.radius);
        context2D.lineTo(atom2.x + atom2.radius, atom2.y + atom2.radius);
        context2D.moveTo(atom1.x + atom1.radius - 10, atom1.y + atom1.radius - 10);
        context2D.lineTo(atom2.x + atom2.radius - 10, atom2.y + atom2.radius - 10);
        context2D.moveTo(atom1.x + atom1.radius + 10, atom1.y + atom1.radius + 10);
        context2D.lineTo(atom2.x + atom2.radius + 10, atom2.y + atom2.radius + 10);
        break;
    }
    context2D.strokeStyle = "blue";
    context2D.lineWidth = 3;
    context2D.stroke();
  }
}
