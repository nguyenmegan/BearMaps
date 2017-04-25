// Global variables

// the SVG.js draw object
var draw = null;

//answers - true: correct, false: incorrect
var correct1 = false;
var correct2 = false;
var correct3 = false;

//boxes- true: filled, false: empty
var isFilled1 = false;
var isFilled2 = false;
var isFilled3 = false;

//number of tries
var tries = 0;
/**
* Create the background
*/
function createBackground() {
  background = draw.image('./bg.svg', 1200, 900);
}

function createTree() {
  tree = draw.image('./tree.svg', 530, 470).attr({
    'x': 450,
    'y': 295,
  });
}

function createDino() {
  dino = draw.image('./dino.svg', 375, 375).attr({
    'x': 820,
    'y': 450,
  });
}

function createRoots() {
  roots = draw.image('./roots.svg', 460, 520).attr({
    'x': 385,
    'y': 370,
  });
}

function createBoxes() {
  box1 = draw.image('./box.svg', 140, 140).attr({
    'x': 270,
    'y': 350,
  });
  box2 = draw.image('./box.svg', 140, 140).attr({
    'x': 270,
    'y': 515,
  });
  box3 = draw.image('./box.svg', 140, 140).attr({
    'x': 345,
    'y': 750,
  });
}

function createInstructions() {
  instructions = draw.text('Click and drag the 3 necessary ingredients into the gray boxes below \n When you are ready to see if your answer is right, click the \"check\" button.').x(20).y(20).font({size: 24, family: 'Arial'});
}

function createCheck() {
  checkGroup = draw.nested();
  shadow = checkGroup.image('./shadow.svg', 270, 120).attr({
    'x': 888,
    'y': 8,
  });
  check = checkGroup.image('./check.svg', 230, 80).attr({
    'x': 900,
    'y': 15,
  });
  check2 = checkGroup.image('./check2.svg', 230, 80).attr({
    'x': 900,
    'y': 15,
  });
  check2.hide();
  checkText = checkGroup.text('Check!').x(940).y(15).font({size: 48, family: 'Arial', fill: '#FF9900'});
  checkGroup.mouseover(function() {
    check2.show();
    checkText.font({fill: '#009999'})
  })
  checkGroup.click(function() {
    tries++;
    if (correct1 && correct2 && correct3) {
      instructions.clear();
      instructions.text = draw.text(function(add) {
        add.tspan('Great job! Plants need ')
        add.tspan('light energy').fill('#ffb23f')
        add.tspan(', ')
        add.tspan('carbon dioxide').fill('#f06')
        add.tspan(' from the air, ')
        add.tspan('water').fill('#4fd0ff')
        add.tspan(' to make their own food, a type of ')
        add.tspan('sugar')
        add.tspan('.')
        add.tspan('Let\'s go to the next step and explore how plants get these elements!').newLine()
      }).x(20).y(20).font({size: 24, family: 'Arial'});
      createFullTree();
      var audio = new Audio('./kid.mp3');
      audio.play();
      dino.animate(500, '<', 10).move(810, 415);
      dino.animate(400, '-', 0).move(750, 420);
      dino.animate(200, '-', 10).move(750, 430);
      dino.animate(600, '<', 0).move(710, 455);
      background.hide();
      shadow.hide();
      check.hide();
      check2.hide();
      checkText.hide();
      oxygenGroup.hide();
      sugarGroup.hide();
      soilGroup.hide();
      heatEnergyGroup.hide();
      carbonDioxideGroup.draggable(false);
      lightEnergyGroup.draggable(false);
      waterGroup.draggable(false);
    } else if (tries < 3){
      reset();
      instructions.text('Try again!');
    } else {
      instructions.text('Nice try, but that is not correct. This was your last chance. \n Click the \"Try Again\" button to restart the quiz!');
      shadow.hide();
      check.hide();
      check2.hide();
      checkText.hide();
      createTryButton();
    }
  })
  checkGroup.mouseout(function() {
    check2.hide();
    checkText.font({fill: '#FF9900'})
  })
}

function createLightEnergy() {
  lightEnergyGroup = draw.nested();
  lightEnergy = lightEnergyGroup .image('./lightenergy.svg', 140, 140).attr({
    'x': 20,
    'y': 135,
  });
  lightEnergyText = lightEnergyGroup .text('Light \n Energy').x(90).y(210).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  lightEnergyRed = lightEnergyGroup.image('./red.svg', 140, 140).attr({
    'x': 20,
    'y': 135,
  }).front().hide();
}

function lightEnergyDrag() {
  lightEnergyGroup .draggable(function(x, y) {
    this.front();
    return { x: x < 1177, y: y < 762}
  }).on("dragend", function() {
    correct2 = false;
    if (this.x() > 180  && this.x() < 320  && this.y() > 145 && this.y() < 285) {
      if (isFilled1 == false) {
        this.move(250, 215); //snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > 180  && this.x() < 320  && this.y() > 310 && this.y() < 450) {
      if (isFilled2 == false) {
        this.move(250, 380);  //snap to box2
        correct2 = true;
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > 255  && this.x() < 395  && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(325, 615); //snap to box3
        isFilled3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == 250 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == 250 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == 325 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  lightEnergyGroup.mouseover(function() {
    lightEnergyRed.show();
  })
  lightEnergyGroup.mouseout(function() {
    lightEnergyRed.hide();
  })
}

function createCarbonDioxide() {
  carbonDioxideGroup = draw.nested();
  carbonDioxide = carbonDioxideGroup.image('./carbondioxide.svg', 140, 140).attr({
    'x': 165,
    'y': 135,
  });
  carbonDioxideText = carbonDioxideGroup.text('Carbon \n Dioxide').x(235).y(210).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  carbonDioxideRed = carbonDioxideGroup.image('./red.svg', 140, 140).attr({
    'x': 165,
    'y': 135,
  }).front().hide();
}
function carbonDioxideDrag() {
  carbonDioxideGroup.draggable(function(x, y) {
    this.front();
    return { x: x < 1032, y: y < 762}
  }).on("dragend", function() {
    correct1 = false;
    if (this.x() > 35  && this.x() < 175  && this.y() > 145 && this.y() < 285) {
      if (isFilled1 == false) {
        this.move(105, 215);
        correct1 = true; //snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > 35  && this.x() < 175  && this.y() > 310 && this.y() < 450) {
      if (isFilled2 == false) {
        this.move(105, 380);  //snap to box2
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > 110  && this.x() < 250  && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(180, 615); //snap to box3
        isFilled3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == 105 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == 105 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == 180 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  carbonDioxideGroup.mouseover(function() {
    carbonDioxideRed.show();
  })
  carbonDioxideGroup.mouseout(function() {
    carbonDioxideRed.hide();
  })
}

function createOxygen() {
  oxygenGroup = draw.nested();
  oxygen = oxygenGroup.image('./oxygen.svg', 140, 140).attr({
    'x': 310,
    'y': 135,
  });
  oxygenText = oxygenGroup.text('Oxygen').x(380).y(220).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  oxygenRed = oxygenGroup.image('./red.svg', 140, 140).attr({
    'x': 310,
    'y': 135,
  }).front().hide();
}
function oxygenDrag() {
  oxygenGroup.draggable(function(x, y) {
    this.front();
    return { x: x < 887, y: y < 762}
  }).on("dragend", function() {
    if (this.x() > -110  && this.x() < 30  && this.y() > 145 && this.y() < 285) {
      if (!isFilled1) {
        this.move(-40, 215); //snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -110  && this.x() < 30  && this.y() > 310 && this.y() < 450) {
      if (isFilled2 == false) {
        this.move(-40, 380);  //snap to box2
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -35  && this.x() < 105  && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(35, 615); //snap to box3
        isFilled3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == -40 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == -40 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == 35 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  oxygenGroup.mouseover(function() {
    oxygenRed.show();
  })
  oxygenGroup.mouseout(function() {
    oxygenRed.hide();
  })
}

function createSugar() {
  sugarGroup = draw.nested();
  sugar = sugarGroup.image('./sugar.svg', 140, 140).attr({
    'x': 455,
    'y': 135,
  });
  sugarText = sugarGroup.text('Sugar').x(525).y(240).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  sugarRed = sugarGroup.image('./red.svg', 140, 140).attr({
    'x': 455,
    'y': 135,
  }).front().hide();
}

function sugarDrag() {
  sugarGroup.draggable(function(x, y) {
    this.front();
    return { x: x < 742, y: y < 897}
  }).on("dragend", function() {
    if (this.x() > -255  && this.x() < -115  && this.y() > 145 && this.y() < 285) {
      if (isFilled1 == false) {
        this.move(-185, 215);//snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -255  && this.x() < -115  && this.y() > 310 && this.y() < 450) {
      if (isFilled2 == false) {
        this.move(-185, 380);  //snap to box2
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -180  && this.x() < -40  && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(-110, 615); //snap to box3
        isFilled3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == -185 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == -185 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == -110 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  sugarGroup.mouseover(function() {
    sugarRed.show();
  })
  sugarGroup.mouseout(function() {
    sugarRed.hide();
  })
}

function createWater() {
  waterGroup = draw.nested();
  water = waterGroup.image('./water.svg', 140, 140).attr({
    'x': 600,
    'y': 135,
  });
  waterText = waterGroup.text('Water').x(670).y(230).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  waterRed = waterGroup.image('./red.svg', 140, 140).attr({
    'x': 600,
    'y': 135,
  }).front().hide();
}

function waterDrag() {
  waterGroup.draggable(function(x, y) {
    this.front();
    return { x: x < 597, y: y < 762}
  }).on("dragend", function() {
    correct3 = false;
    if (this.x() > -400  && this.x() < -260 && this.y() > 145 && this.y() < 285) {
      if (isFilled1 == false) {
        this.move(-330, 215); //snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -400  && this.x() < -260 && this.y() > 310 && this.y() < 450) {
      if (isFilled2 == false) {
        this.move(-330, 380);  //snap to box2
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -325  && this.x() < -185 && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(-255, 615); //snap to box3
        isFilled3 = true;
        correct3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == -330 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == -330 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == -255 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  waterGroup.mouseover(function() {
    waterRed.show();
  })
  waterGroup.mouseout(function() {
    waterRed.hide();
  })
}

function createSoil() {
  soilGroup = draw.nested();
  soil = soilGroup.image('./soil.svg', 140, 140).attr({
    'x': 745,
    'y': 135,
  });
  soilText = soilGroup.text('Soil').x(815).y(230).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  soilRed = soilGroup.image('./red.svg', 140, 140).attr({
    'x': 745,
    'y': 135,
  }).front().hide();
}

function soilDrag() {
  soilGroup.draggable(function(x, y) {
    this.front();
    return { x: x < 452, y: y < 762}
  }).on("dragend", function() {
    if (this.x() > -545 && this.x() < -405  && this.y() > 145 && this.y() < 285) {
      if (isFilled1 == false) {
        this.move(-475, 215); //snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -545 && this.x() < -405 && this.y() > 310 && this.y() < 450) {
      if (isFilled2 == false) {
        this.move(-475, 380);  //snap to box2
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -470 && this.x() < -330 && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(-400, 615); //snap to box3
        isFilled3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == -475 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == -475 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == -400 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  soilGroup.mouseover(function() {
    soilRed.show();
  })
  soilGroup.mouseout(function() {
    soilRed.hide();
  })
}

function createHeatEnergy() {
  heatEnergyGroup = draw.nested();
  heatEnergy = heatEnergyGroup.image('./heatenergy.svg', 140, 140).attr({
    'x': 890,
    'y': 135,
  });
  heatEnergyText = heatEnergyGroup.text('Heat \n Energy').x(960).y(210).font({size: 24, family: 'Arial', anchor: 'middle', weight: 'bold'});
  heatRed = heatEnergyGroup.image('./red.svg', 140, 140).attr({
    'x': 890,
    'y': 135,
  }).front().hide();
}

function heatEnergyDrag() {
  heatEnergyGroup.draggable(function(x, y) {
    this.front();
    return { x: x < 307, y: y < 762}
  }).on("dragend", function() {
    if (this.x() > -690 && this.x() < -550 && this.y() > 145 && this.y() < 285) {
      if (isFilled1 == false) {
        this.move(-620, 215); //snap to box1
        isFilled1 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -690  && this.x() < -550 && this.y() > 310 && this.y() < 450) {
      if (isFilled1 == false) {
        this.move(-620, 380);  //snap to box2
        isFilled2 = true;
      } else {
        this.move(0, 0);
      }
    } else if (this.x() > -615 && this.x() < -475 && this.y() > 545 && this.y() < 685) {
      if (isFilled3 == false) {
        this.move(-545, 615); //snap to box3
        isFilled3 = true;
      } else {
        this.move(0, 0);
      }
    } else {
      this.move(0, 0);
    }
  }).on("dragstart", function() {
    if (this.x() == -620 && this.y() == 215) {
      isFilled1 = false;
    } else if (this.x() == -620 && this.y() == 380) {
      isFilled2 = false;
    } else if (this.x() == -545 && this.y() == 615) {
      isFilled3 = false;
    }
  });
  heatEnergyGroup.mouseover(function() {
    heatRed.show();
  })
  heatEnergyGroup.mouseout(function() {
    heatRed.hide();
  })
}

function createTryButton() {
  tryGroup = draw.nested();
  tryButton = tryGroup.image('./try.svg', 160, 70).attr({
    'x': 1020,
    'y': 20,
  });
  tryText = tryGroup.text('Try Again').x(1037).y(33).font({size: 30, family: 'Arial'});
  tryGroup.click(function() {
    location.reload();
  })
}

function createFullTree() {
  fullTree = draw.image('./fulltree.svg', 1200, 900).back();
}

//reset all but 3 correct ones
function reset() {
  if (!correct1) {
    carbonDioxideGroup.move(0, 0);
    isFilled1 = false;
  }
  if (!correct2) {
    lightEnergyGroup.move(0, 0);
    isFilled2 = false;
  }
  if (!correct3) {
    waterGroup.move(0, 0);
    isFilled3 = false;
  }
  oxygenGroup.move(0, 0);
  sugarGroup.move(0, 0);
  soilGroup.move(0, 0);
  heatEnergyGroup.move(0, 0);
}

function init() {

  // create the SVG.js draw object
  draw = SVG('model');

  createBackground();

  createRoots();

  createTree();

  createDino();

  //create grey boxes
  createBoxes();

  createInstructions();

  //create Check button
  createCheck();

  createHeatEnergy();
  heatEnergyDrag();

  createSoil();
  soilDrag();

  createLightEnergy();
  lightEnergyDrag();

  createWater();
  waterDrag();

  createCarbonDioxide();
  carbonDioxideDrag();

  createOxygen();
  oxygenDrag();

  createSugar();
  sugarDrag();
}
