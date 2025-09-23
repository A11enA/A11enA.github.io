/*
 * TODO 4: Create a modularized index.js, 
 * pass in window and createjs
 */

(function(window, createjs) {
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
  bg.graphics
  .beginFill("#fcb1b1ff")
  .drawCircle(350, 350, 275) //x,y,radius


    
  // CREATE A CIRCLE //

  const eyeContainer = new createjs.Container();
  const blinkContainer = new createjs.Container();

  eyeContainer.x = 300;
  eyeContainer.y = 300;

  const leftEye = new createjs.Shape();
  const rightEye = new createjs.Shape();
  const mouth = new createjs.Shape();
  const blinkLeft = new createjs.Shape();
  const blinkRight = new createjs.Shape();
  

  leftEye.graphics
    .beginFill("#eeffbaff")
    .drawCircle( 0 ,20 ,25) // x, y, radius

  rightEye.graphics
    .beginFill("#fff200ff")
    .drawCircle(150 ,20 ,25) // x, y, radius

    blinkLeft.graphics
    .beginFill("#fcb1b1ff")
    .drawCircle( 0 ,15 ,25) // x, y, radius

    blinkRight.graphics
    .beginFill("#fcb1b1ff")
    .drawCircle(150 ,15 ,25) // x, y, radius

  mouth.graphics
    .beginFill("#ff4141ff")
    .drawCircle(120 ,500 ,25) // x, y, radius
    
    
    mouth.scaleX = 3

  // ADD DISPLAY OBJECTS TO STAGE //
  blinkContainer.addChild(blinkLeft, blinkRight)
  eyeContainer.addChild(leftEye, rightEye, blinkContainer);
  stage.addChild(bg, eyeContainer, mouth);

  stage.update();


  // TODO 8: Listen to the 'tick' event  //
  let tickHandler = createjs.Ticker.on("tick", onTick); // action/event, bithandler(reaction)
  

  // TODO 9: Handle the 'tick' event //
  var scaleFactor = .1
  var scaleFactorPosition = 50

  var blinkScaleFactor = .00000001
  var blinkScaleFactorPosition = 500
  function onTick(event) {
    // X5, up to 5, down to .5
mouth.scaleY -= scaleFactor
mouth.y += scaleFactorPosition

blinkContainer.scaleY -= blinkScaleFactor
blinkContainer.y += blinkScaleFactorPosition

     if (mouth.scaleY >= 2){
       scaleFactor = -scaleFactor
       scaleFactorPosition = -scaleFactorPosition
     } else if (mouth.scaleY <= .5){
      scaleFactor = -scaleFactor
      scaleFactorPosition = -scaleFactorPosition
     }

     if (blinkContainer.scaleY >= 1.5){
       blinkScaleFactor = -blinkScaleFactor
        blinkScaleFactorPosition = -blinkScaleFactorPosition
     } else if (blinkContainer.scaleY <= 1){
      blinkScaleFactor = -blinkScaleFactor
      blinkScaleFactorPosition = -blinkScaleFactorPosition
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
}(window, window.createjs));
