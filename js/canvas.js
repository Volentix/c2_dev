var stage = new createjs.Stage("volentix-bg");
var circle = new createjs.Bitmap("library/src/assets/volentix_wheel_1.svg");
circle.rotation
stage.addChild(circle);

$(function(){
  stage.update();
});
