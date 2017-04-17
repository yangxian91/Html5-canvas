//海葵 
var aneObj = function(){
	//start point, control point , end point(sin)
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = []; //海葵摆动幅度
	this.arg = 0;
//	this.height = [];
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = CANVASHEIGHT - 200 - Math.random() * 50;
//		this.height[i] = 200 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
}

aneObj.prototype.draw = function(){
	this.arg += deltaTime * 0.001;
	var l = Math.sin(this.arg);
	
	context2.save();
	context2.globalAlpha = 0.6;
	context2.strokeStyle = "#3b154e";
		context2.lineWidth = 20;
		context2.lineCap = "round";
	for (var i = 0; i < this.num; i++) {
		context2.beginPath();
		context2.moveTo(this.rootx[i], CANVASHEIGHT);
//		context2.lineTo(this.x[i], CANVASHEIGHT);
		this.headx[i] = this.rootx[i]+ l * this.amp[i];
		context2.quadraticCurveTo(this.rootx[i], CANVASHEIGHT - 150, this.headx[i], this.heady[i]);
		
		context2.stroke();
		
	}
	context2.restore();
}
