//果实
var fruitObj = function(){
	this.alive = [];  //boolean
	this.x = [];
	this.y = [];
	this.l = [];
	this.aneNo = []; //果实在哪个海葵上
	this.speed = [];
	this.orange = new Image();
	this.blue = new Image();
	this.fruitType = [];
}

fruitObj.prototype.num = 30;
fruitObj.prototype.appearNum = 10;//屏幕一次出现果实总数
fruitObj.prototype.init = function(){
	for (var i=0; i<this.num; i++) {
		this.alive[i] = false;
		this.speed[i] = Math.random() * 0.01 + 0.005;
		this.born(i);
		
	}
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}

fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		
		if(this.alive[i]){
			
			if(this.l[i] <= 14){
				//果实在长大的过程中，随着海葵的摆动而动
				this.x[i] = ane.headx[this.aneNo[i]];
				this.y[i] = ane.heady[this.aneNo[i]];
				this.l[i] += this.speed[i] * deltaTime;
			}else{
				this.y[i] -= this.speed[i]* 5 * deltaTime;
			}
			
			var fruitPic = this.blue;
			if(this.fruitType[i] == "orange"){
				fruitPic = this.orange;
			}
			context2.drawImage(fruitPic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i]*0.5, this.l[i], this.l[i]);
			
			if(this.y[i] < 10){
				this.alive[i] = false;
			}
			
		}
		
	}
}

fruitObj.prototype.born = function(i){
	this.aneNo[i] = Math.floor(Math.random()*ane.num);
//	this.x[i] = ane.headx[aneID];
//	this.y[i] = ane.heady[aneID];
	this.l[i] = 0;
	
	this.fruitType[i] = Math.random() > 0.3 ? "orange" : "blue";
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

function fruitMonitor(){
	var count = 0;
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			count ++;
		}
	}
	if(count < fruit.appearNum){
		//出生新果实
		sendFruit();
		return;
	}
}

function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
			fruit.alive[i] = true;
			return;
		}
	}
}
