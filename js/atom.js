function Atom(x, y, radius, image, type) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.isDragging = false;
  this.type = type; //0 - hydrogen //1 - carbon //2 - oxygen //3 - nitrogen
  this.meshIndex = null;
  this.hasBeenUsedInMesh = false;
  this.userIdentifier = null;
  this.amountOfAtomsConnected = 0;
  this.img = image;

  this.topSide = [
    [this.x, this.y],
    [this.x + this.radius * 2, this.y]
  ];
  this.botSide = [
    [this.x, this.y + this.radius * 2],
    [this.x + this.radius * 2, this.y + this.radius * 2]
  ];
  this.rightSide = [
    [this.x + this.radius * 2, this.y],
    [this.x + this.radius * 2, this.y + this.radius * 2]
  ];
  this.leftSide = [
    [this.x, this.y],
    [this.x, this.y + this.radius * 2]
  ];

  switch (type) {
    case 0:
      this.connections = 1;
      this.totalConnections = 1;
      this.meshRadius = 2;
      break;
    case 1:
      this.connections = 4;
      this.totalConnections = 4;
      this.meshRadius = 4;
      break;
    case 2:
      this.connections = 2;
      this.totalConnections = 2;
      this.meshRadius = 3;
      break;
    case 3:
      this.connections = 3;
      this.totalConnections = 3;
      this.meshRadius = 3.5;
      break;
  }

  this.atomsConnected = new Array();
  this.sidesConnected = new Array(false, false, false, false);
  this.sidesConnectionType = new Array(null, null, null, null);
  this.meshPosition = null;

  this.draw = function(context2D) {
    context2D.drawImage(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
  }

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.updateSides();
  }

  this.updateSides = function() {
    this.topSide = [
      [this.x, this.y],
      [this.x + this.radius * 2, this.y]
    ];
    this.botSide = [
      [this.x, this.y + this.radius * 2],
      [this.x + this.radius * 2, this.y + this.radius * 2]
    ];
    this.rightSide = [
      [this.x + this.radius * 2, this.y],
      [this.x + this.radius * 2, this.y + this.radius * 2]
    ];
    this.leftSide = [
      [this.x, this.y],
      [this.x, this.y + this.radius * 2]
    ];
  }

  this.isMouseOver = function(mouseX, mouseY) {
    return (mouseX >= this.x && mouseX <= (this.x + this.radius * 2) && mouseY >= this.y && mouseY <= (this.y + this.radius * 2));
  }

  this.checkConnections = function(atom, atoms, molecule, molecule2, molecules, counter) {

    var hasConnected = false;

    if (this.connections - counter.connections >= 0 && atom.connections - counter.connections >= 0) {
      var difX = atom.x;
      var difY = atom.y;

      if (this.checkHorizontalSideIntersection(this.topSide, atom.botSide) && !this.sidesConnected[0] && !atom.sidesConnected[2]) {
        console.log("TOP SIDE COLLIDED");
        this.atomsConnected[0] = atom;
        this.sidesConnected[0] = true;
        this.sidesConnectionType[0] = counter.connections;
        atom.sidesConnected[2] = true;
        atom.sidesConnectionType[2] = counter.connections;
        atom.x = this.x + this.radius - atom.radius;
        atom.y = (this.y - atom.radius * 2) + atom.radius * 0.15;
        hasConnected = true;
      }

      if (this.checkVerticalSideIntersection(this.rightSide, atom.leftSide) && !this.sidesConnected[1] && !atom.sidesConnected[3]) {
        console.log("RIGHT SIDE COLLIDED");
        this.atomsConnected[1] = atom;
        this.sidesConnected[1] = true;
        this.sidesConnectionType[1] = counter.connections;
        atom.sidesConnected[3] = true;
        atom.sidesConnectionType[3] = counter.connections;
        atom.y = this.y + this.radius - atom.radius;
        atom.x = (this.x + this.radius * 2) - atom.radius * 0.15;
        hasConnected = true;
      }

      if (this.checkHorizontalSideIntersection(this.botSide, atom.topSide) && !this.sidesConnected[2] && !atom.sidesConnected[0]) {
        console.log("BOT SIDE COLLIDED");
        this.atomsConnected[2] = atom;
        this.sidesConnected[2] = true;
        this.sidesConnectionType[2] = counter.connections;
        atom.sidesConnected[0] = true;
        atom.sidesConnectionType[0] = counter.connections;
        atom.x = this.x + this.radius - atom.radius;
        atom.y = (this.y + this.radius * 1.95) - atom.radius * 0.15;
        hasConnected = true;
      }

      if (this.checkVerticalSideIntersection(this.leftSide, atom.rightSide) && !this.sidesConnected[3] && !atom.sidesConnected[1]) {
        console.log("LEFT SIDE COLLIDED");
        this.atomsConnected[3] = atom;
        this.sidesConnected[3] = true;
        this.sidesConnectionType[3] = counter.connections;
        atom.sidesConnected[1] = true;
        atom.sidesConnectionType[1] = counter.connections;
        atom.y = this.y + this.radius - atom.radius;
        atom.x = (this.x - atom.radius * 2) + atom.radius * 0.15;
        hasConnected = true;
      }

      if (hasConnected) {
        difX -= atom.x;
        difY -= atom.y;

        if (molecule2 != null) {
          for (i in molecule2.atoms) {
            var atom2 = molecule2.atoms[i];
            if (atom2 != atom) {
              atom2.x += difX * -1;
              atom2.y += difY * -1;
            }
          }
        }

        atom.updateSides();
        this.connections -= counter.connections;
        atom.connections -= counter.connections;
        this.amountOfAtomsConnected += 1;
        atom.amountOfAtomsConnected += 1;

        if (molecule2 != null) {
          molecule.connections.push(new Connection(atom, this, counter.connections));
          for (i in molecule2.connections) {
            molecule.connections.push(molecule2.connections[i]);
          }
          for (i in molecule2.atoms) {
            molecule.atoms.push(molecule2.atoms[i]);
          }
          molecules.splice(molecules.indexOf(molecule2), 1);
        } else if (molecule != null) {
          molecule.connections.push(new Connection(atom, this, counter.connections));
          molecule.atoms.push(atom);
          atoms.splice(atoms.indexOf(atom), 1);
        } else {
          var newMol = new Molecule();
          newMol.connections.push(new Connection(atom, this, counter.connections));
          newMol.atoms.push(this);
          newMol.atoms.push(atom);
          molecules.push(newMol);
          atoms.splice(atoms.indexOf(atom), 1);
          atoms.splice(atoms.indexOf(this), 1);
        }

        hasConnected = false;
      }
    }
  }

  this.checkHorizontalSideIntersection = function(sideA, sideB) {
    x1 = sideA[0][0];
    y1 = sideA[0][1];
    x2 = sideA[1][0];
    x3 = sideB[0][0];
    y3 = sideB[0][1];
    x4 = sideB[1][0];
    y4 = sideB[1][1];
    return ((x1 <= x3 && x2 >= x3 || x1 <= x4 && x2 >= x4) && y1 > y3 - 10 && y1 < y3 + 10);
  }

  this.checkVerticalSideIntersection = function(sideA, sideB) {
    x1 = sideA[0][0];
    y1 = sideA[0][1];
    y2 = sideA[1][1];
    x3 = sideB[0][0];
    y3 = sideB[0][1];
    x4 = sideB[1][0];
    y4 = sideB[1][1];
    return ((y1 <= y3 && y2 >= y3 || y1 <= y4 && y2 >= y4) && x1 > x3 - 10 && x1 < x3 + 10);
  }

}
