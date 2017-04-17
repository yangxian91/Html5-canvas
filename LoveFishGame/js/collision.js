//碰撞检测

//大鱼和果实的距离
function momFruitCollision(){
	if(data.gameOver){ return; }
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if(l < 900){
				//果实被吃
				fruit.dead(i);
				data.fruitNum ++;
				mom.bigBodyCount ++;
				if(mom.bigBodyCount > 7){
					mom.bigBodyCount = 7;
				}
				if(fruit.fruitType[i] == "blue"){
					data.isDouble = 2;
				}
				
				wave.born(fruit.x[i], fruit.y[i]);
			}
		}
	}
}

//大鱼喂小鱼
function momBabyCollision(){
	if(data.gameOver || data.fruitNum <= 0){ return; }
	
	var l = calLength2(baby.x, baby.y, mom.x, mom.y);
			if(l < 900){
				//baby recover
				baby.babybodyCount = 0;
				data.addScore();
				mom.bigBodyCount = 0;
				wave.born(baby.x, baby.y, "yellow");
			}
}
