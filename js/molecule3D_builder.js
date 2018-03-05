function Molecule3DBuilder(sage2) {
  this.meshes = new Array();
  this.mesh = null;
  this.molecule3D = new THREE.Object3D();
  this.geometry = null;
  this.index = -1;
  this.direction = -1;
  this.sage2 = sage2;

  this.hydrogenMaterial = new THREE.MeshPhongMaterial({
    color: 0xeafd92,
    reflectivity: 1
  });

  this.nitrogenMaterial = new THREE.MeshPhongMaterial({
    color: 0x849afa,
    reflectivity: 1
  });

  this.oxygenMaterial = new THREE.MeshPhongMaterial({
    color: 0xe8536b,
    reflectivity: 1
  });

  this.carbonMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ffa0,
    reflectivity: 1
  });

  this.setFirstAtom = function(atom) {
    this.setMeshAtom(atom.type);
    this.mesh.position.set(0, 0, 0);
    this.meshes.push(this.mesh);
    atom.meshIndex = 0;
  }

  this.buildMolecule = function(atom, scene, direction) {
    var twoAtomsDirection = 1;
    var threeAtomsSidesUsed = [false, false, false, false];

    for (j in atom.atomsConnected) {
      var atomConnected = atom.atomsConnected[j];

      if (atomConnected != undefined && !atomConnected.hasBeenUsedInMesh) {
        this.setMeshAtom(atomConnected.type);
        var scale = (atom.meshRadius + atomConnected.meshRadius) * 0.5;
        var emptySides = [];

        if (atom.totalConnections == 4 && atom.amountOfAtomsConnected == 2 && atom.connections == 0) {

          for (s in atom.sidesConnected) {
            if (atom.sidesConnected[s] == false) emptySides.push(s);
          }

          if (j == 0 && this.hasNumberInEmptySides(1, emptySides) || j == 1 && this.hasNumberInEmptySides(0, emptySides)) {
            this.mesh.position.x = this.meshes[atom.meshIndex].position.x + scale * 1.1;
            this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
            this.mesh.position.z = this.meshes[atom.meshIndex].position.z + scale * 1.1;
          } else if (j == 2 && this.hasNumberInEmptySides(3, emptySides) || j == 3 && this.hasNumberInEmptySides(2, emptySides)) {
            this.mesh.position.x = this.meshes[atom.meshIndex].position.x - scale * 1.1;
            this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
            this.mesh.position.z = this.meshes[atom.meshIndex].position.z - scale * 1.1;
          } else if (j == 1 && this.hasNumberInEmptySides(2, emptySides) || j == 2 && this.hasNumberInEmptySides(1, emptySides)) {
            this.mesh.position.x = this.meshes[atom.meshIndex].position.x + scale * 1.1;
            this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
            this.mesh.position.z = this.meshes[atom.meshIndex].position.z - scale * 1.1;
          } else if (j == 0 && this.hasNumberInEmptySides(3, emptySides) || j == 3 && this.hasNumberInEmptySides(0, emptySides)) {
            this.mesh.position.x = this.meshes[atom.meshIndex].position.x - scale * 1.1;
            this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
            this.mesh.position.z = this.meshes[atom.meshIndex].position.z + scale * 1.1;
          }

          twoAtomsDirection *= -1;

        } else if (atom.totalConnections == 4 && atom.amountOfAtomsConnected == 3 && atom.connections == 0) {

          if (atom.sidesConnectionType[j] == 2) {
            for (s in atom.sidesConnected) {
              if (atom.sidesConnected[s] == false) emptySides.push(s);
            }

            emptySides.push(j);
            this.sage2.log(emptySides);

            if (this.checkSidesEmptyAreEqual(0, 1, emptySides)) {
              this.sage2.log("SIDE: 0 1");
              this.mesh.position.x = this.meshes[atom.meshIndex].position.x + scale * 1.1;
              this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
              this.mesh.position.z = this.meshes[atom.meshIndex].position.z + scale * 1.1;

            } else if (this.checkSidesEmptyAreEqual(0, 2, emptySides)) {
              this.sage2.log("SIDE: 0 2");
              this.mesh.position.x = this.meshes[atom.meshIndex].position.x;
              this.mesh.position.y = this.meshes[atom.meshIndex].position.y + scale * direction * 1.5;
              this.mesh.position.z = this.meshes[atom.meshIndex].position.z;

            } else if (this.checkSidesEmptyAreEqual(0, 3, emptySides)) {
              this.sage2.log("SIDE: 0 3");
              this.mesh.position.x = this.meshes[atom.meshIndex].position.x - scale * 1.1;
              this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
              this.mesh.position.z = this.meshes[atom.meshIndex].position.z + scale * 1.1;

            } else if (this.checkSidesEmptyAreEqual(1, 2, emptySides)) {
              this.sage2.log("SIDE: 1 2");
              this.mesh.position.x = this.meshes[atom.meshIndex].position.x + scale * 1.1;
              this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
              this.mesh.position.z = this.meshes[atom.meshIndex].position.z - scale * 1.1;

            } else if (this.checkSidesEmptyAreEqual(1, 3, emptySides)) {
              this.sage2.log("SIDE: 1 3");
              this.mesh.position.x = this.meshes[atom.meshIndex].position.x;
              this.mesh.position.y = this.meshes[atom.meshIndex].position.y - scale * direction * 1.5;
              this.mesh.position.z = this.meshes[atom.meshIndex].position.z;

            } else if (this.checkSidesEmptyAreEqual(2, 3, emptySides)) {
              this.sage2.log("SIDE: 2 3");
              this.mesh.position.x = this.meshes[atom.meshIndex].position.x - scale * 1.1;
              this.mesh.position.y = this.meshes[atom.meshIndex].position.y;
              this.mesh.position.z = this.meshes[atom.meshIndex].position.z - scale * 1.1;

            }
          } else {
            this.setAtomPosition(scale, direction, atom, j);
          }

        } else {
          this.setAtomPosition(scale, direction, atom, j);
        }

        this.meshes.push(this.mesh);
        atomConnected.hasBeenUsedInMesh = true;
        atomConnected.meshIndex = this.meshes.length - 1;
        this.buildMolecule(atomConnected, scene, direction * -1);
      }
    }

    for (m in this.meshes) {
      this.molecule3D.add(this.meshes[m]);
    }

    scene.add(this.molecule3D);
  }

  this.hasNumberInEmptySides = function(n, sidesEmpty) {
    for (i in sidesEmpty) {
      if (n == sidesEmpty[i]) return true;
    }
    return false;
  }

  this.checkSidesEmptyAreEqual = function(x, y, sidesEmpty) {
    this.sage2.log("CHECK SIDES FUNCTION");
    return x == sidesEmpty[0] && y == sidesEmpty[1] || x == sidesEmpty[1] && y == sidesEmpty[0];
  }

  this.setAtomPosition = function(scale, direction, atom, j) {
    if (j == 0) {
      this.mesh.position.x = this.meshes[atom.meshIndex].position.x;
      this.mesh.position.y = this.meshes[atom.meshIndex].position.y + scale * direction;
      this.mesh.position.z = this.meshes[atom.meshIndex].position.z + scale * 1.3;
    } else if (j == 1) {
      this.mesh.position.x = this.meshes[atom.meshIndex].position.x + scale * 1.3;
      this.mesh.position.y = this.meshes[atom.meshIndex].position.y - scale * direction;
      this.mesh.position.z = this.meshes[atom.meshIndex].position.z;
    } else if (j == 2) {
      this.mesh.position.x = this.meshes[atom.meshIndex].position.x;
      this.mesh.position.y = this.meshes[atom.meshIndex].position.y + scale * direction;
      this.mesh.position.z = this.meshes[atom.meshIndex].position.z - scale * 1.3;
    } else if (j == 3) {
      this.mesh.position.x = this.meshes[atom.meshIndex].position.x - scale * 1.3;
      this.mesh.position.y = this.meshes[atom.meshIndex].position.y - scale * direction;
      this.mesh.position.z = this.meshes[atom.meshIndex].position.z;
    }
  }

  this.setMeshAtom = function(type) {
    if (type == 0) {
      this.geometry = new THREE.SphereGeometry(2, 16, 16);
      this.mesh = new THREE.Mesh(this.geometry, this.hydrogenMaterial);
    } else if (type == 1) {
      this.geometry = new THREE.SphereGeometry(4, 16, 16);
      this.mesh = new THREE.Mesh(this.geometry, this.carbonMaterial);
    } else if (type == 2) {
      this.geometry = new THREE.SphereGeometry(3, 16, 16);
      this.mesh = new THREE.Mesh(this.geometry, this.oxygenMaterial);
    } else if (type == 3) {
      this.geometry = new THREE.SphereGeometry(3.5, 16, 16);
      this.mesh = new THREE.Mesh(this.geometry, this.nitrogenMaterial);
    }
  }

  this.rotateMolecule = function(x, y, z) {
    this.molecule3D.rotation.x += x;
    this.molecule3D.rotation.y += y;
    this.molecule3D.rotation.z += z;
  }

  this.removeAtoms = function() {

    for (i in this.molecule3D.children) {
      this.molecule3D.remove(this.molecule3D.children[i]);
    }

    for (i = this.molecule3D.children.length - 1; i >= 0; i--) {
      this.molecule3D.remove(this.molecule3D.children[i]);
    }

    this.molecule3D.remove(this.molecule3D.children[0]);
    this.meshes = new Array();
  }
  
}
