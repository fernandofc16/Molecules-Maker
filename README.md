## Molecules Maker <img src="https://github.com/fernandofc16/Molecules-Maker/blob/master/img/icon.png" width="30" height="30"> 

### A model to build organic molecules (currently 4 atoms available) and visualize them in a 3D perspective.

- [SAGE2](#sage2)
- [Installation](#install)
- [Application](#app)

## <a name="sage2"></a>SAGE2
First of all you must install SAGE2 in order to use the application.
The tutorial e archives for installation are available at http://sage2.sagecommons.org/.
Once intalled, configure and start the SAGE2 server side.

## <a name="install"></a>Installation
There are 3 ways of installing a new application in SAGE2 server:
1) Go to your 'Documents/' folder system and find the directory 'SAGE2_Media/apps/', create a paste named 'molecules_maker' and copy the archives to this directory.
2) With your device connected in SAGE2 panel server, click and drag a zipped file containing the archives in the SAGE2 application client side.
3) Go to your SAGE2 installed folder in your system and find dorectory 'public/uploads/apps/', create a paste named 'molecules_maker' and copy the archives to this directory.

**Note:** Recommended to follow the first or second installation option.

## <a name="app"></a>Application

- **Language Button**
You may toggle the language between english and portuguese.
![Language Button](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/language_button.jpg)

- **Atoms Buttons**
Here you may spawn and object of the desired atom to build your molecules.
Atoms available: Carbon, hydrogen, nitrogen, oxygen.
![Atoms Buttons](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/atoms_buttons.jpg)

- **Auxiliar Buttons**
  - Complete with Hydrogen: It will complete the remaining connections with hydrogen atoms of all molecules that are in you working area (canvas 2D).
  - Create Benzene: Creates a benzene molecule with a better shape visualization.
  - 1/2/3 Connection: You may click in this button to change the amount of connections the atoms will make when you connect them.
![Auxiliar Buttons](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/auxiliar_buttons.jpg)

- **Trash**
To delete an atom or a molecule you just have to click and drag the same on trash.
Be careful if you release the atom or molecule with any part of it crossing the trash, it will be deleted.
![Trash](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/trash.jpg)

- **Building 2D Molecules**
Simple as dragging atoms near the side of another, it will automatically detect the side of collision and connect them in those sides.
![Build 2D Molecule](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/build_2d_molecule.jpg)

- **Building 3D Model**
Just double click on the molecule you desire to build the 3D model
Molecule marked in blue indicate the current molecule in 3D visualization.
![Build 3D Model](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/doubleclick_build3D.jpg)

- **Widget Menu**
Use the left button of mouse (or any other device) to open the widget menu, it has 3 options by sign:
  - **+** Zoom In: the plus sign zoom in the 3D model visualization.
  - **-** Zoom Out: the minus sign zoom out the 3D model visualization.
  - **⟳** Loop: toggle the button to change the 3D model from auto rotation to manual rotation.
  **Note:** In manual rotation mode click and drag on 3D canvas to rotate the model.
![Widget Menu](https://github.com/fernandofc16/Molecules-Maker/blob/master/screen_shots/widget_menu.jpg)
