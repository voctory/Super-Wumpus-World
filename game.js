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
	     '../assets/flappywumpuslogo2.png',
	     '../assets/swwlogo.png',
	     '../assets/clicktostart.png',
	     '../assets/hills.png');


// initialize game

game.onload = function(){
	game.bg = new Sprite(1280,720);
 	game.bg.image = game.assets['../assets/background.png'];

 	// add game.bg to rootScene
	game.rootScene.addChild(game.bg);

	// adding the hills

	game.hills = new Sprite(1280,720);
	game.hills.image = game.assets['../assets/hills.png'];

	game.rootScene.addChild(game.hills);

	// add the floor
 	game.ground = new Sprite(1280,86);
 	game.ground.image = game.assets['../assets/ground.png'];
 	game.ground.x = 0;
 	game.ground.y = game.height - 48;

 	// add game.ground to rootScene
	game.rootScene.addChild(game.ground);

	// adding startbutton stuff

	game.startbutton = new Sprite(500,80);
	game.startbutton.image = game.assets['../assets/clicktostart.png'];
	game.startbutton.y = game.height/2 + 50;
	game.startbutton.x = game.width/2 - 250;
	game.startbutton.buttonMode = "left"

	game.rootScene.addChild(game.startbutton);

	// adding the logo

	game.swwlogo = new Sprite(1000,300);
	game.swwlogo.image = game.assets['../assets/swwlogo.png'];
	game.swwlogo.y = game.height/2 - 280;
	game.swwlogo.x = game.width/2 - 500;

	game.rootScene.addChild(game.swwlogo);
	startFlashing()

} // end game.onload #initialize game

var textVisible = true;

function startFlashing() {
	setTimeout(function() {
		if (textVisible == true) {
			game.rootScene.removeChild(game.startbutton);
			textVisible = false;
			startFlashing()
		}
		else {
			game.rootScene.addChild(game.startbutton);
			textVisible = true;
			startFlashing()
		}
	}, 500)
}

game.onenterframe = function(){

}

game.start();
