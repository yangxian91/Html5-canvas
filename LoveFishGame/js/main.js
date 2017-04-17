var CANVASWIDTH = 800;
var CANVASHEIGHT = 600;

var canvas1;
var canvas2;

var context1;
var context2;

var lastTime;
var deltaTime;


var bgPic = new Image();

var ane;
var fruit;
var mom;

var mx;
var my;

var baby;

var data;
var wave;
var dust;

var babyLifeIcon = new Image();
var fruitIcon = new Image();
var blueIcon = new Image();
var gameStart = false;


window.onload = game;

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameLoop();
	
}
function onPlay(){
	document.getElementById("play").style.display = "none";
	gameStart = true;
}

function init(){
	canvas1 = document.getElementById("canvas1");  //fishes, dust, UI, circle
	canvas1.width = CANVASWIDTH;
	canvas1.height = CANVASHEIGHT;
	context1 = canvas1.getContext("2d");
	
	canvas2 = document.getElementById("canvas2");  //background, ane, fruits
	canvas2.width = CANVASWIDTH;
	canvas2.height = CANVASHEIGHT;
	context2 = canvas2.getContext("2d");
	
	canvas1.addEventListener("mousemove", onMouseMove, false);
	
	bgPic.src = "img/background.jpg";
	babyLifeIcon.src = "img/baby.png";
	fruitIcon.src = "img/fruit.png";
	blueIcon.src = "img/blue.png";
	
	ane = new aneObj();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	mom = new momObj();
	mom.init();
	mx = mom.x;
	my = mom.y;
	
	baby = new babyObj();
	baby.init();
	
	data = new dataObj();
	wave = new waveObj();
	wave.init();
	
	dust = new dustObj();
	dust.init();
}

function gameLoop(){
	window.requestAnimFrame(gameLoop); // setInterval, setTimeout, frame per second
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 80) deltaTime = 80;
	
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	
	context1.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
	mom.draw();
	baby.draw();
	
	if(gameStart){
		momFruitCollision();
		momBabyCollision();
	}
	
	data.draw();
	wave.draw();
	dust.draw();
}

function onMouseMove(e){
	if(data.gameOver || !gameStart) return;
	if(e.offsetX || e.layerX){
		mx = e.offsetX == undefined ? e.layerX : e.offsetX;
		my = e.offsetY == undefined ? e.layerY : e.offsetY;
	}
}
