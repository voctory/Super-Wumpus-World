/*
┏-----------------------------------------------┓
|               Super Wumpus World              |
|             	  By Voctor                		|
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

// global variables

var gameStarted = false;
var onMenu = false;
var textVisible = true;
var speed = 20
var i = 0;

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
	     '../assets/hills.png',
	     '../assets/invisiblesprite.png',
	     '../assets/wumpus.png',
	     '../assets/wumpusrunning.png',
	     '../assets/wumpusflipped.png',
	     '../assets/wumpusrunningflipped.png');


// initialize game

game.onload = function(){
	game.bg = new Sprite(1280,720);
 	game.bg.image = game.assets['../assets/background.png'];

	// adding the hills

	game.hills = new Sprite(1280,720);
	game.hills.image = game.assets['../assets/hills.png'];

	// add the floor
 	game.ground = new Sprite(1280,86);
 	game.ground.image = game.assets['../assets/ground.png'];
 	game.ground.x = 0;
 	game.ground.y = game.height - 48;

	// adding start button stuff

	game.startbutton = new Sprite(500,80);
	game.startbutton.image = game.assets['../assets/clicktostart.png'];
	game.startbutton.y = game.height/2 + 50;
	game.startbutton.x = game.width/2 - 250;
	game.startbutton.buttonMode = "left"

	// adding the logo

	game.swwlogo = new Sprite(1000,300);
	game.swwlogo.image = game.assets['../assets/swwlogo.png'];
	game.swwlogo.y = game.height/2 - 280;
	game.swwlogo.x = game.width/2 - 500;

	// adding the invisible sprite

	game.invisiblesprite = new Sprite(1280, 720);
	game.invisiblesprite.image = game.assets['../assets/invisiblesprite.png'];
	game.invisiblesprite.buttonMode = "down";

	// adding the avatar

	game.avatar = new Sprite(100, 187);
	game.avatar.image = game.assets['../assets/wumpus.png'];

	loadmenu()

}

// functions

function loadmenu() {
	game.rootScene.addChild(game.bg);
	game.rootScene.addChild(game.hills);
	game.rootScene.addChild(game.ground);
	game.rootScene.addChild(game.startbutton);
	game.rootScene.addChild(game.swwlogo);
	game.rootScene.addChild(game.invisiblesprite)

	onMenu = true;
	startFlashing()
	game.rootScene.addEventListener(enchant.Event.DOWN_BUTTON_DOWN, startgame);
}

function startgame() {
	// getting rid of old event listners

	game.rootScene.clearEventListener(enchant.Event.DOWN_BUTTON_DOWN);

	// re-adjusting old variables

	gameStarted = true;
	onMenu = false;
	game.invisiblesprite.buttonMode = "";

	// removing old sprites

	game.rootScene.removeChild(game.swwlogo);
	game.rootScene.removeChild(game.startbutton);

	// adding new sprites

	game.rootScene.addChild(game.avatar);
	
	game.rootScene.addEventListener(enchant.Event.RIGHT_BUTTON_DOWN, testingFunc);
	game.rootScene.addEventListener(enchant.Event.LEFT_BUTTON_DOWN, testingFunc);
	game.rootScene.addEventListener(enchant.Event.UP_BUTTON_DOWN, testingFunc);
}

function gamegravity(){
	if (gameStarted == true && onMenu == false && !game.avatar.intersect(game.ground)) {
		game.avatar.y = game.avatar.y + 10;
		setTimeout(function(){ 
			gamegravity()
		}, 10)
	}
}

function gamejump(){
	if (gameStarted == true && onMenu == false && game.avatar.intersect(game.ground)) {
		jumpstageone()
		setTimeout(function() {
			i = 0
			gamegravity()
		}, 200)
	}
}

function jumpstageone() {
	setTimeout(function(){
		if (i < 40) {
			game.avatar.y = game.avatar.y - 5
			i++
			jumpstageone()
		}
		else {
			return true;
		}
	}, 1)
}

function testingFunc(arg) {
	console.log(arg.type)
	if (arg.type == "rightbuttondown") {
		game.avatar.rotation = 0
		game.avatar.x = game.avatar.x + speed
		runningAnimation("right")
		gamegravity()
	}
	else if (arg.type == "leftbuttondown") {
		game.avatar.x = game.avatar.x - speed
		runningAnimation("left")
		gamegravity()
	}
	else if (arg.type == "upbuttondown") {
		gamejump()
	}
}

function runningAnimation(clicked) {
	if (clicked == "right") {
		game.avatar.image = game.assets['../assets/wumpusrunning.png'];
		setTimeout(function() {
			game.avatar.image = game.assets['../assets/wumpus.png'];
		}, 100)
	}
	else if (clicked == "left") {
		game.avatar.image = game.assets['../assets/wumpusrunningflipped.png'];
		setTimeout(function() {
			game.avatar.image = game.assets['../assets/wumpusflipped.png'];
		}, 100)
	}
}

function startFlashing() {
	setTimeout(function() {
		if (textVisible == true) {
			game.rootScene.removeChild(game.startbutton);
			textVisible = false;
			startFlashing()
		}
		else {
			if (gameStarted != true) {
				game.rootScene.addChild(game.startbutton);
				textVisible = true;
				startFlashing()
			}
		}
	}, 500)
}

game.onenterframe = function(){

}

game.start();