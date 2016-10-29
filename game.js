/*
┏-----------------------------------------------┓
|               Flappy Wumpus                   |
|             By A Generic Gamer                |
| Adapted from Goma Games Workshop: Flappy Flap |
|  By using this code you acknowledge and agree |
|      to the license in the master branch      |
┗-----------------------------------------------┛
*/



enchant(); // initialize
var game = new Core(1280, 720); // game stage
game.scale = 1;
game.fps = 60;
game.started = false;
game.distance = 0; // initial value, don't change
offset = {top: 0, left: 0};

// settings
game.gravity = 0.5;
game.flap_strength = 9;
game.fly_speed = 3.5;
game.obstacle_frequency = 50;

// binding
// audio stuff
var backgroundAudio=false;

window.onload = function() {
		backgroundAudio=document.getElementById("bg-audio");
    backgroundAudio.volume=0.3;
}

// preload assets
game.preload('../assets/background.png',
	     '../assets/ground.png',
	     '../assets/play.png',
	     '../assets/flappywumpuslogo2.png');


// initialize game

game.onload = function(){
	game.bg = new Sprite(1280,720);
  game.bg.image = game.assets['../assets/background.png'];

  // add game.bg to rootScene
	game.rootScene.addChild(game.bg);

	// add the floor
  game.ground = new Sprite(1280,86);
  game.ground.image = game.assets['../assets/ground.png'];
  game.ground.x = 0;
  game.ground.y = game.height - 48;

  // add game.ground to rootScene
	game.rootScene.addChild(game.ground);
	
	// adding mute button
	

	// adding playbutton stuff

	game.playbutton = new Sprite(300,100);
	game.playbutton.image = game.assets['../assets/play.png'];
	game.playbutton.y = game.height/2 + 50;
	game.playbutton.x = game.width/2 - 150;
	game.playbutton.buttonMode = "left"

	game.rootScene.addChild(game.playbutton);

	// adding the logo

	game.flappylogo = new Sprite(464,206);
	game.flappylogo.image = game.assets['../assets/flappywumpuslogo2.png'];
	game.flappylogo.y = game.height/2 - 200;
	game.flappylogo.x = game.width/2 - 225;

	game.rootScene.addChild(game.flappylogo);

} // end game.onload #initialize game

game.onenterframe = function(){

}

game.start();
