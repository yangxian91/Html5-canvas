var dataObj = function(){
	this.fruitNum = 0; //大鱼迟到果实数量
	this.isDouble = 1; // 是否吃到蓝色果实，是分数加倍*2
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
	this.babyLifeNum = 3; //小鱼生命值
}

dataObj.prototype.draw = function(){
	context1.save();
	context1.font = "bold 30px Arial";
	context1.fillStyle = "white";
	context1.textAlign = "center";
	context1.textBaseline = "middle";
	
	//果实数量
	context1.fillText(this.fruitNum, CANVASWIDTH*0.5, CANVASHEIGHT - 50);
	context1.drawImage(fruitIcon, CANVASWIDTH*0.5 - 20 - fruitIcon.width/2, CANVASHEIGHT - 40);
	context1.drawImage(blueIcon, CANVASWIDTH*0.5 + 20 - blueIcon.width/2, CANVASHEIGHT - 40);
	//小鱼生命值显示
	for (var i = 0; i < this.babyLifeNum; i++) {
		context1.drawImage(babyLifeIcon, 30 + i*40, 20);
	}
	//分数
	context1.fillText("SCORE: "+this.score, CANVASWIDTH*0.5, 40);
	
	//游戏结束---
	if(this.gameOver){
		this.alpha += 0.02;
		if(this.alpha >= 1){
			this.alpha = 1;
		}
		context1.font = "bold 50px Arial";
		context1.shadowBlur = 20;
		context1.shadowColor = "red";
		context1.fillStyle = "rgba(255, 255,255,"+ this.alpha +")";
		context1.fillText("GAMEOVER", CANVASWIDTH/2, CANVASHEIGHT/2);
	}
	context1.restore();
}

dataObj.prototype.addScore = function(){
	this.score += this.fruitNum * 10 * this.isDouble;
	this.fruitNum = 0; 
	this.isDouble = 1;
}
