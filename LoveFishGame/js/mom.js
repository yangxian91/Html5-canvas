var momObj = function(){
	this.x;
	this.y;
	this.angle;
	
	this.bigEye = [];
	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;
	
	this.bigBody = [];
	this.bigBodyBlue = [];
	this.bigBodyTimer = 0;
	this.bigBodyCount = 0;
	
	this.bigTail = [];
	this.bigTailTimer = 0;
	this.bigTailCount = 0;
}

momObj.prototype.init = function(){
	this.x = CANVASWIDTH * 0.5;
	this.y = CANVASHEIGHT * 0.5;
	this.angle = 0;
	
	for (var i = 0; i < 8; i++) {
		this.bigTail[i] = new Image();
		this.bigTail[i].src = "img/bigTail"+ i +".png";
	}
	
	for (var j=0; j<2; j++) {
		this.bigEye[j] = new Image();
		this.bigEye[j].src = "img/bigEye"+ j +".png";
	}
	
	for (var k=0; k<8; k++) {
		this.bigBody[k] = new Image();
		this.bigBodyBlue[k] = new Image();
		this.bigBody[k].src = "img/bigEat"+ k +".png";
		this.bigBodyBlue[k].src = "img/bigEatBlue"+ k +".png";
	}
	
}

momObj.prototype.draw = function(){
	//大鱼向鼠标位置 趋近
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	//大鱼和鼠标的角度
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; 
	
	//角度趋近
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	//大鱼尾巴动画
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50){
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}
	
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer = 0;
		
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random() * 2000 + 2000;
		}else{
			this.bigEyeInterval = 200;
		}
	}
	
//	this.bigBodyTimer += deltaTime;
//	if(this.bigBodyTimer > 300){
//		this.bigBodyCount = (this.bigBodyCount + 1) % 8;
//		this.bigBodyTimer %= 300;
//	}

	context1.save();
	context1.translate(this.x, this.y);
	context1.rotate(this.angle);
	
	var bigTailPic = this.bigTail[this.bigTailCount];
	context1.drawImage(bigTailPic, -bigTailPic.width/2 + 30, -bigTailPic.height/2);
	
	var bigbodyPic = this.bigBody[this.bigBodyCount];
	if(data.isDouble == 2){
		bigbodyPic = this.bigBodyBlue[this.bigBodyCount];
	}
	context1.drawImage(bigbodyPic, -bigbodyPic.width/2, -bigbodyPic.height/2);
	
	var bigEyePic = this.bigEye[this.bigEyeCount];
	context1.drawImage(bigEyePic, -bigEyePic.width/2, -bigEyePic.height/2);
	
	
	context1.restore();
}
