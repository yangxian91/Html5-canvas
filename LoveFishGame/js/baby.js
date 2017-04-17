var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye = [];
	this.babyBody = [];
	this.babyTail = [];
	
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	
	this.babyBodyTimer = 0;
	this.babybodyCount = 0;
	
	this.endX = 0;
	this.endY = 0;
}

babyObj.prototype.init = function(){
	this.x = CANVASWIDTH/2 + 100;
	this.y = CANVASHEIGHT/2;
	this.angle = 0;
	
	for(var k=0; k<20; k++){
		this.babyBody[k] = new Image();
		this.babyBody[k].src = "img/babyFade"+ k + ".png";
	}
	
	for(var j=0; j<2; j++){
		this.babyEye[j] = new Image();
		this.babyEye[j].src = "img/babyEye"+ j +".png";
	}
	
	for (var i = 0; i < 8; i++) {
		this.babyTail[i] = new Image();
		this.babyTail[i].src = "img/babyTail"+ i +".png";
	}
	
}

babyObj.prototype.draw = function(){
	if(data.gameOver){
		//小鱼死亡后，不动
		this.x = this.endX;
		this.y = this.endY;
	}else{
		this.x = lerpDistance(mom.x, this.x, 0.98);
		this.y = lerpDistance(mom.y, this.y, 0.98);
	}
	
	
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; 
	
	//角度趋近
	this.angle = lerpAngle(beta, this.angle, 0.6);
	
	//小鱼尾巴动
	if(!data.gameOver){
		this.babyTailTimer += deltaTime;
		if(this.babyTailTimer > 50){
			this.babyTailCount = (this.babyTailCount+1) % 8;
			this.babyTailTimer %= 50;
		}
	}
	
	//小鱼眼睛 没间隔几秒 眨一次眼
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) %2;
		this.babyEyeTimer %= this.babyEyeInterval;
		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.babyEyeInterval = 200;
		}
		
	}
	
	if(gameStart){
		//小鱼身体随着时间变白，除非吃到大鱼喂的食物
		this.babyBodyTimer += deltaTime;
		if(this.babyBodyTimer > 300){
			this.babybodyCount ++;
			this.babyBodyTimer = 0;
			if(this.babybodyCount > 19){
				if(data.babyLifeNum <= 0){
					this.babybodyCount = 19;
					//game over
					data.gameOver = true;
					this.endX = this.x;
					this.endY = this.y;
				}else{
					this.babybodyCount = 0;
					data.babyLifeNum --;
				}
				
			}
		}
	}
	
	
	context1.save();
	
	context1.translate(this.x, this.y);
	context1.rotate(this.angle);
	
	var babyTailPic = this.babyTail[this.babyTailCount];
	context1.drawImage(babyTailPic, -babyTailPic.width/2+24, -babyTailPic.height/2);
	
	var babyBodyPic = this.babyBody[this.babybodyCount];
	context1.drawImage(babyBodyPic, - babyBodyPic.width/2, - babyBodyPic.height/2);
	
	var babyEyePic = this.babyEye[this.babyEyeCount];
	context1.drawImage(babyEyePic, -babyEyePic.width/2, -babyEyePic.height/2);
	
	context1.restore();
}
