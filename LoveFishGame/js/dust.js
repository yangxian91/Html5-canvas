//漂浮物
var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.picNo = [];
	this.arg;
	
	this.dustPics = [];
	
}

dustObj.prototype.num = 15;
dustObj.prototype.init = function(){
	for (var i = 0; i < 7; i++) {
		this.dustPics[i] = new Image();
		this.dustPics[i].src = "img/dust"+ i +".png";
	}
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * CANVASWIDTH;
		this.y[i] = Math.random() * CANVASHEIGHT;
		this.amp[i] = 20 + Math.random() * 25;
		this.picNo[i] = Math.floor(Math.random() * 7);
	}
	this.arg = 0;
}

dustObj.prototype.draw = function(){
	this.arg += deltaTime * 0.001;
	var l = Math.sin(this.arg);
	for (var i = 0; i < this.num; i++) {
		context1.drawImage(this.dustPics[this.picNo[i]], this.x[i]+ l*this.amp[i], this.y[i]);
	}
}
