var molecules_maker = SAGE2_App.extend({

  init: function(data) {

    this.SAGE2Init("div", data);

    this.resizeEvents = "continuous";
    this.path = this.resrcPath;

    this.canvas2D = document.createElement("canvas");
    this.canvas2D.setAttribute('id', 'canvas2D');
    this.canvas2D.width = data.width / 2;
    this.canvas2D.height = data.height;
    this.element.append(this.canvas2D);
    this.context2D = this.canvas2D.getContext("2d");

    this.render = new THREE.WebGLRenderer();
    this.render.setSize(data.width / 2, data.height);
    this.canvas3D = this.render.domElement;
    this.canvas3D.setAttribute('id', 'canvas3D');
    this.element.append(this.canvas3D);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, data.width / 2 / data.height, 1, 3000);
    this.camera.position.set(0, 0, 70);

    this.molecule3D = new Molecule3DBuilder(this);
    this.isDraggingMolecule3D = false;
    this.autoRotateMolecule = true;

    this.light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.light);
    this.pointLight = new THREE.PointLight(0xffffff, 0.3);
    this.pointLight.position.z = 100;
    this.scene.add(this.pointLight);

    this.startMouseX = 0;
    this.startMouseY = 0;

    this.hydrogenAtomImage = new Image();
    this.carbonAtomImage = new Image();
    this.oxygenAtomImage = new Image();
    this.nitrogenAtomImage = new Image();
    this.hydrogenTableEN = new Image();
    this.carbonTableEN = new Image();
    this.oxygenTableEN = new Image();
    this.nitrogenTableEN = new Image();
    this.hydrogenTablePT = new Image();
    this.carbonTablePT = new Image();
    this.oxygenTablePT = new Image();
    this.nitrogenTablePT = new Image();
    this.atomMakers = new Array();
    this.trashImage = new Image();
    this.trashOverImage = new Image();
    this.hydrogenAtomImage.src = this.resrcPath + "/img/hydrogen_atom.png";
    this.carbonAtomImage.src = this.resrcPath + "/img/carbon_atom.png";
    this.oxygenAtomImage.src = this.resrcPath + "/img/oxygen_atom.png";
    this.nitrogenAtomImage.src = this.resrcPath + "/img/nitrogen_atom.png";
    this.hydrogenTableEN.src = this.resrcPath + "/img/hydrogen_table_en.png";
    this.carbonTableEN.src = this.resrcPath + "/img/carbon_table_en.png";
    this.oxygenTableEN.src = this.resrcPath + "/img/oxygen_table_en.png";
    this.nitrogenTableEN.src = this.resrcPath + "/img/nitrogen_table_en.png";
    this.hydrogenTablePT.src = this.resrcPath + "/img/hydrogen_table_pt.png";
    this.carbonTablePT.src = this.resrcPath + "/img/carbon_table_pt.png";
    this.oxygenTablePT.src = this.resrcPath + "/img/oxygen_table_pt.png";
    this.nitrogenTablePT.src = this.resrcPath + "/img/nitrogen_table_pt.png";
    this.trashImage.src = this.resrcPath + "/img/trash.png";
    this.trashOverImage.src = this.resrcPath + "/img/trash_over.png";

    this.buttonsSize = data.height * 0.1;

    this.atoms = new Array();
    this.molecules = new Array();

    this.trash = new Trash(this.trashImage, this.trashOverImage, this.canvas2D.width - (this.buttonsSize + 10), 10, this.buttonsSize);
    this.counterConn = new CounterConnections(10, 10, this.buttonsSize);
    this.completeWithHydrogenButton = new AuxiliarButton(10, (this.buttonsSize + 20), this.buttonsSize, ["Complete", "with", "Hydrogen"], ["Completar", "com", "Hidrogênio"]);
    this.createBenzene = new AuxiliarButton((this.buttonsSize + 20), 10, this.buttonsSize, ["  Create", "", " Benzene"], ["    Criar", "", " Benzeno"]);
    this.languageButton = new LanguageButton(this.canvas2D.width - (this.buttonsSize + 10), this.canvas2D.height - (this.buttonsSize + 10), this.buttonsSize);

    this.atomMakers = new Array();
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize + 10), this.buttonsSize, this.hydrogenTableEN, this.hydrogenTablePT, this.hydrogenAtomImage, 0));
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize * 3 + 30), this.buttonsSize, this.carbonTableEN, this.carbonTablePT, this.carbonAtomImage, 1));
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize * 2 + 20), this.buttonsSize, this.oxygenTableEN, this.oxygenTablePT, this.oxygenAtomImage, 2));
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize * 4 + 40), this.buttonsSize, this.nitrogenTableEN, this.nitrogenTablePT, this.nitrogenAtomImage, 3));

    this.currentWidth = data.width;
    this.currentHeight = data.height;

    this.usersDragging = new Array();

    this.controls.addButton({
      type: "zoom-in",
      position: 4,
      identifier: "ZoomIn"
    });
    this.controls.addButton({
      type: "zoom-out",
      position: 6,
      identifier: "ZoomOut"
    });
    this.controls.addButton({
      type: "loop",
      position: 2,
      identifier: "Loop"
    });
    this.controls.finishedAddingControls();

    this.log('molecules maker initialized');
  },

  draw: function(date) {

    this.context2D.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height);
    this.context2D.fillStyle = "white";
    this.context2D.fillRect(0, 0, this.canvas2D.width, this.canvas2D.height);

    this.trash.draw(this.context2D);

    for (i in this.atoms) {
      this.atoms[i].draw(this.context2D);
      for (j in this.atoms) {
        if (this.atoms[i] != this.atoms[j]) this.atoms[i].checkConnections(this.atoms[j], this.atoms, null, null, this.molecules, this.counterConn);
      }
    }

    for (i in this.molecules) {
      var mol = this.molecules[i];
      mol.draw(this.context2D);
      mol.checkConnections(this.atoms, this.molecules, this.counterConn);
      for (j in mol.atoms) {
        for (k in this.atoms) {
          if (mol.atoms[j] != this.atoms[k]) mol.atoms[j].checkConnections(this.atoms[k], this.atoms, mol, null, null, this.counterConn);
        }
      }
    }

    for (i in this.atomMakers) {
      this.atomMakers[i].draw(this.context2D);
    }

    this.counterConn.draw(this.context2D);
    this.completeWithHydrogenButton.draw(this.context2D);
    this.createBenzene.draw(this.context2D);
    this.languageButton.draw(this.context2D);

    if (this.autoRotateMolecule) this.molecule3D.rotateMolecule(0.05, 0, 0.05);

    this.render.render(this.scene, this.camera);
  },

  resizeAtoms: function(atoms, difX, difY) {

    for (i in atoms) {
      var atom = atoms[i];
      atom.x *= difX;
      atom.y *= difY;
      switch (atom.type) {
        case 0:
          atom.radius = this.buttonsSize * 0.3;
          break;
        case 1:
          atom.radius = this.buttonsSize * 0.5;
          break;
        case 2:
          atom.radius = this.buttonsSize * 0.4;
          break;
        case 3:
          atom.radius = this.buttonsSize * 0.45;
          break;
      }
    }
  },

  resizeApp: function(resizeData) {

    this.render.setSize(this.element.clientWidth / 2, this.element.clientHeight);
    this.canvas3D = this.render.domElement;

    this.camera.setViewOffset(this.sage2_width, this.sage2_height,
      resizeData.leftViewOffset, resizeData.topViewOffset,
      resizeData.localWidth, resizeData.localHeight);

    this.camera.position.set(0, 0, 70);
  },

  resize: function(date) {

    this.canvas2D.width = this.element.clientWidth / 2;
    this.canvas2D.height = this.element.clientHeight;

    this.buttonsSize = this.element.clientHeight * 0.1;

    this.trash = new Trash(this.trashImage, this.trashOverImage, this.canvas2D.width - (this.buttonsSize + 10), 10, this.buttonsSize);
    this.counterConn = new CounterConnections(10, 10, this.buttonsSize);
    this.completeWithHydrogenButton = new AuxiliarButton(10, (this.buttonsSize + 20), this.buttonsSize, ["Complete", "with", "Hydrogen"], ["Completar", "com", "Hidrogênio"]);
    this.createBenzene = new AuxiliarButton((this.buttonsSize + 20), 10, this.buttonsSize, ["  Create", "", " Benzene"], ["    Criar", "", " Benzeno"]);
    this.languageButton = new LanguageButton(this.canvas2D.width - (this.buttonsSize + 10), this.canvas2D.height - (this.buttonsSize + 10), this.buttonsSize);

    this.atomMakers = new Array();
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize + 10), this.buttonsSize, this.hydrogenTableEN, this.hydrogenTablePT, this.hydrogenAtomImage, 0));
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize * 3 + 30), this.buttonsSize, this.carbonTableEN, this.carbonTablePT, this.carbonAtomImage, 1));
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize * 2 + 20), this.buttonsSize, this.oxygenTableEN, this.oxygenTablePT, this.oxygenAtomImage, 2));
    this.atomMakers.push(new AtomMaker(10, this.canvas2D.height - (this.buttonsSize * 4 + 40), this.buttonsSize, this.nitrogenTableEN, this.nitrogenTablePT, this.nitrogenAtomImage, 3));

    var difX = (this.element.clientWidth / this.currentWidth);
    var difY = (this.element.clientHeight / this.currentHeight);

    this.resizeAtoms(this.atoms, difX, difY);
    for (m in this.molecules) {
      this.resizeAtoms(this.molecules[m].atoms, difX, difY);
    }

    this.currentWidth = this.element.clientWidth;
    this.currentHeight = this.element.clientHeight;
    this.resizeApp();
    this.refresh(date);
  },

  move: function(date) {
    this.refresh(date);
  },

  setUserDraggingInfo: function(id, position) {

    for (u in this.usersDragging) {
      var user = this.usersDragging[u];
      if (user.id == id) {
        user.startMouseX = position.x;
        user.startMouseY = position.y;
        return;
      }
    }

    this.usersDragging.push({
      "id": id,
      "startMouseX": position.x,
      "startMouseY": position.y
    });
  },

  getUserById: function(id) {

    for (u in this.usersDragging) {
      var user = this.usersDragging[u];
      if (user.id == id) return user;
    }
    return null;
  },

  event: function(eventType, position, user_id, data, date) {

    if (eventType === "pointerPress" && (data.button === "left")) {
      this.startMouseX = (position.x);
      this.startMouseY = (position.y);

      this.setUserDraggingInfo(user_id.id, position);

      for (i in this.atoms) {
        if (this.atoms[i].isMouseOver(position.x, position.y)) {
          this.atoms[i].isDragging = true;
          this.atoms[i].userIdentifier = user_id.id;
        }
      }

      for (i in this.molecules) {
        var mol = this.molecules[i];
        if (mol.isMouseOver(position.x, position.y)) {
          mol.isDragging = true;
          mol.userIdentifier = user_id.id;
        }
      }

      for (i in this.atomMakers) {
        if (this.atomMakers[i].wasClicked(position.x, position.y)) this.atomMakers[i].makeAtom(this.atoms);
      }

      if (this.counterConn.wasClicked(position.x, position.y)) this.counterConn.increment();

      if (this.completeWithHydrogenButton.wasClicked(position.x, position.y)) {
        for (i in this.molecules) {
          this.completeWithHydrogenButton.completeMoleculeWithHydrogen(this.molecules[i], this.hydrogenAtomImage);
        }
      }

      if (this.createBenzene.wasClicked(position.x, position.y)) this.createBenzene.createBenzene(this.molecules, this.carbonAtomImage);

      if (this.languageButton.wasClicked(position.x, position.y)) {
        this.languageButton.changeLanguage();
        this.completeWithHydrogenButton.changeLanguage();
        this.createBenzene.changeLanguage();
        this.counterConn.changeLanguage();
        for (i in this.atomMakers) {
          this.atomMakers[i].changeLanguage();
        }
      }

      this.isDraggingMolecule3D = (position.x > this.sage2_width / 2 && position.x < this.sage2_width);

      this.log("DraggingMolecule3D: " + this.isDraggingMolecule3D);
      this.log("this.sage2_width: " + this.sage2_width);
      this.log("position.x: " + position.x);

      if (data.identifier == "rotationButton") {
        if (autoRotateMolecule) {
          autoRotateMolecule = false;
          moleculeRotationButton.innerHTML = "Auto-rotation";
        } else {
          autoRotateMolecule = true;
          moleculeRotationButton.innerHTML = "Manually Rotation";
        }
      }

    } else if (eventType === "pointerDblClick") {

      this.meshes = new Array();

      for (i in this.molecules) {
        var mol = this.molecules[i];
        if (mol.isMouseOver(position.x, position.y)) {

          for (i in this.molecules) {
            this.molecules[i].resetUsesInMesh();
          }

          for (i in this.atoms) {
            this.atoms[i].hasBeenUsedInMesh = false;
          }

          var firstAtom = mol.atoms[0];
          this.molecule3D.removeAtoms();
          this.molecule3D.setFirstAtom(firstAtom);
          this.molecule3D.buildMolecule(firstAtom, this.scene, 1);
          mol.selectedMolecule = true;
        } else {
          mol.selectedMolecule = false;
        }
      }

    } else if (eventType === "pointerMove") {

      var userMoving = this.getUserById(user_id.id);
      for (i in this.atoms) {
        if (this.atoms[i].isDragging && this.atoms[i].userIdentifier == user_id.id) {
          // this.atoms[i].move(position.x - this.startMouseX, position.y - this.startMouseY);
          this.atoms[i].move(position.x - userMoving.startMouseX, position.y - userMoving.startMouseY);
          this.setUserDraggingInfo(user_id.id, position);
          this.startMouseX = (position.x);
          this.startMouseY = (position.y);
        }
      }

      for (i in this.molecules) {
        if (this.molecules[i].isDragging && this.molecules[i].userIdentifier == user_id.id) {
          // this.molecules[i].move(position.x - this.startMouseX, position.y - this.startMouseY);
          this.molecules[i].move(position.x - userMoving.startMouseX, position.y - userMoving.startMouseY);
          this.setUserDraggingInfo(user_id.id, position);
          this.startMouseX = (position.x);
          this.startMouseY = (position.y);
        }
      }

      this.trash.checkAtomsOverTrash(this.atoms, this.molecules);

      if (this.isDraggingMolecule3D && !this.autoRotateMolecule) {
        var rotationY = (position.x - this.startMouseX) * 0.0007;
        var rotationX = (position.y - this.startMouseY) * 0.0007;
        // var rotationZ = Math.sqrt(Math.pow(rotationX, 2) + Math.pow(rotationY, 2));
        this.molecule3D.rotateMolecule(rotationX, -rotationY, 0);
      }

    } else if (eventType === "pointerRelease" && (data.button === "left")) {

      for (i in this.atoms) {
        this.atoms[i].isDragging = false;
        this.atoms[i].userIdentifier = null;
      }

      for (i in this.molecules) {
        this.molecules[i].isDragging = false;
        this.molecules[i].userIdentifier = null;
      }

      this.trash.checkAtomsInsideTrash(this.atoms);
      this.trash.checkMoleculesInsideTrash(this.molecules, this.molecule3D);
      this.isDraggingMolecule3D = false;

    } else if (eventType === "pointerScroll") {

      var zMAX = 140;
      var zMIN = 20;

      this.camera.position.z -= data.wheelDelta * 0.05;
      this.camera.position.z = Math.max(Math.min(this.camera.position.z, zMAX), zMIN);

    } else if (eventType === "widgetEvent") {

      switch (data.identifier) {
        case "Loop":
          this.autoRotateMolecule = !this.autoRotateMolecule;
          break;
        case "ZoomIn":
          this.camera.position.z = Math.max(Math.min(this.camera.position.z - 20, 140), 20);
          break;
        case "ZoomOut":
          this.camera.position.z = Math.max(Math.min(this.camera.position.z + 20, 140), 20);
          break;
      }
    }
  }
});
