/*
 * TODO 4: Create a modularized index.js,
 * pass in window and createjs
 */

(function (window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage("canvas");

  // TODO 6: Set the framerate of the Ticker

  createjs.Ticker.framerate = 30;

  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */

  // INIT CREATEJS //

  // CREATE A BACKGROUND //
  const bg = new createjs.Shape();

  // console.log(bg, canvas.width);
  bg.graphics.beginFill("#62360fff").drawCircle(350, 350, 275); //x,y,radius

  // CREATE A CIRCLE //

  const eyeContainer = new createjs.Container();
  const lidContainer = new createjs.Container();
  const lashContainer = new createjs.Container();
  const frameContainer = new createjs.Container();
  const lenseContainer = new createjs.Container();
  const glasses = new createjs.Container();

  eyeContainer.x = 300;
  eyeContainer.y = 300;

  const leftEye = new createjs.Shape();
  const rightEye = new createjs.Shape();
  const mouth = new createjs.Shape();
  const lidLeft = new createjs.Shape();
  const lidRight = new createjs.Shape();
  const lashLeft = new createjs.Shape();
  const lashRight = new createjs.Shape();
  const leftFrame = new createjs.Shape();
  const rightFrame = new createjs.Shape();
  const leftLense = new createjs.Shape();
  const rightLense = new createjs.Shape();


  
  leftLense.graphics.beginFill("#97c4ffff").drawCircle(0, 20, 100); // x, y, radius

  rightLense.graphics.beginFill("#97c4ffff").drawCircle(150, 20, 100); // x, y, radius
  
  leftFrame.graphics.beginFill("#62360fff").drawCircle(0, 1, 100); // x, y, radius

  rightFrame.graphics.beginFill("#62360fff").drawCircle(150, 1, 100); // x, y, radius
  
  leftEye.graphics.beginFill("#eeffbaff").drawCircle(0, 20, 25); // x, y, radius

  rightEye.graphics.beginFill("#fff200ff").drawCircle(150, 20, 25); // x, y, radius

  lashLeft.graphics.beginFill("#000000ff").drawCircle(0, 25, 25); // x, y, radius

  lashRight.graphics.beginFill("#000000ff").drawCircle(150, 25, 25); // x, y, radius
  
  lidLeft.graphics.beginFill("#62360fff").drawCircle(0, 15, 25); // x, y, radius

  lidRight.graphics.beginFill("#62360fff").drawCircle(150, 15, 25); // x, y, radius

  mouth.graphics.beginFill("#ff4141ff").drawCircle(120, 500, 25); // x, y, radius

  mouth.scaleX = 3;

  lidContainer.y = -5

  // ADD DISPLAY OBJECTS TO STAGE //
  lenseContainer.addChild(leftLense,rightLense);
  frameContainer.addChild(leftFrame, rightFrame);
  glasses.addChild(lenseContainer, frameContainer);
  lashContainer.addChild(lashLeft,lashRight);
  lidContainer.addChild(lashContainer, lidLeft,lidRight,);
  eyeContainer.addChild(glasses, leftEye, rightEye, lidContainer);
  stage.addChild(bg, eyeContainer, mouth);

  stage.update();

  // TODO 8: Listen to the 'tick' event  //
  let tickHandler = createjs.Ticker.on("tick", onTick); // action/event, bithandler(reaction)

  // TODO 9: Handle the 'tick' event //
  var scaleFactor = 0.1;
  var scaleFactorPosition = 50;

  var blinkScaleFactor = .01;

  function onTick(event) {
    // X5, up to 5, down to .5
    mouth.scaleY -= scaleFactor;
    mouth.y += scaleFactorPosition;

    lidContainer.scaleY -= blinkScaleFactor;

    if (mouth.scaleY >= 2) {
      scaleFactor = -scaleFactor;
      scaleFactorPosition = -scaleFactorPosition;
    } else if (mouth.scaleY <= 0.5) {
      scaleFactor = -scaleFactor;
      scaleFactorPosition = -scaleFactorPosition;
    }

    if (lidContainer.scaleY <= .1) {
      blinkScaleFactor = -blinkScaleFactor;
    } else if (lidContainer.scaleY >= 1) {
      blinkScaleFactor = -blinkScaleFactor;
    }

    update(event);
  }

  /*
   * TODO 10: Implement an update Function, after making
   * changes to assets, it must call stage.update();
   */

  function update(event) {
    stage.update();
  }
})(window, window.createjs);
