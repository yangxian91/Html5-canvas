//特效

var waveObj = function(){
	this.x = []; 
	this.y = [];
	this.r = [];
	this.alive = [];
	this.color = [];
}

waveObj.prototype.num = 15;
waveObj.prototype.maxR = 60;
waveObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;	
		this.r[i] = 0;
		this.color[i] = "white";
 	}
}

waveObj.prototype.draw = function(){
	context1.save();
	context1.shadowColor = "white";
	context1.shadowBlur = 8;
	for (var i = 0; i < this.num; i++) {
		if(this.alive[i]){
			 
			this.r[i] += deltaTime*0.05;
			var alpha = 1 - this.r[i]/this.maxR;
			 
			context1.beginPath();
			if(this.color[i] == "white"){
				context1.fillStyle = "rgba(255, 255,255,"+ alpha +")";
			}else{
				context1.fillStyle = "rgba(203, 91, 0,"+ alpha +")";
			}
			
			context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI*2, true);
			context1.arc(this.x[i], this.y[i], this.r[i]-3, 0, Math.PI*2, false);
			context1.closePath();
			context1.fill();
			
//			context1.lineWidth = 3;
//			context1.strokeStyle = "rgba(255, 255,255,"+ alpha +")";
//			context1.stroke();
			
			if(this.r[i] > this.maxR){
				this.alive[i] = false;
			}
		}
	}
	context1.restore();
}

waveObj.prototype.born = function(wx, wy, wcolor){
	for (var i = 0; i < this.num; i++) {
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 4;
			this.x[i] = wx;
			this.y[i] = wy;
			this.color[i] = wcolor || "white";
			return;
		}
	}
}
