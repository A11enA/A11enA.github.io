/*
 * TODO 4: Create a modularized index.js, 
 * pass in window and createjs
 */

(function(window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage("canvas");

  // TODO 6: Set the framerate of the Ticker
  
createjs.Ticker.framerate = 60;

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

  eyeContainer.x = 300;
  eyeContainer.y = 300;

  const leftEye = new createjs.Shape();
  const rightEye = new createjs.Shape();
  const mouth = new createjs.Shape();
  

  leftEye.graphics
    .beginFill("#eeffbaff")
    .drawCircle( 0 ,20 ,25) // x, y, radius

  rightEye.graphics
    .beginFill("#fff200ff")
    .drawCircle(150 ,20 ,25) // x, y, radius

  mouth.graphics
    .beginFill("#ff4141ff")
    .drawCircle(200 ,450 ,25) // x, y, radius
    
    
    mouth.scaleX = 3

  // ADD DISPLAY OBJECTS TO STAGE //
  eyeContainer.addChild(leftEye, rightEye);
  stage.addChild(bg, eyeContainer, mouth);

  stage.update();


  // TODO 8: Listen to the 'tick' event  //
  let tickHandler = createjs.Ticker.on("tick", onTick); // action/event, bithandler(reaction)
  

  // TODO 9: Handle the 'tick' event //
  
  function onTick(event) {

    if (mouth.scale >= 5){
      mouth.scaleX--
    } else if (mouth.scale <= 0){
      mouth.scaleX++
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
