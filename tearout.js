var name;
var interval = 10;
var numTimes = 0;
var first = true;

var fourBricks = false;
var twelveBricks = false;
var thritySixBricks = false;
var sixtyTwoBricks = false;

var score = 0;

var showScores = false;

var showCredits = false;

var countDownInterval = 15;
var countingDown = true;
var countDown = 0;

var creditsShown = false;

var released = false;

var curTime = performance.now();

var move = 0;

var moveX = 0;

var moveY = 0;


var lifeCount = 3;

var initMoveX = 0;

var scoresShown = false;


var padBegX = 0;
var padBegY = 0;
var padEndX = 0;
var padEndY = 0;

var dead1 = false;

var ballBegX = 0;
var ballBegY = 0;
var ballEndX = 0;
var ballEndY = 0;

var xAdd = 0;
var yAdd = 0
var xSize = 600/16;
var ySize = 600/35;
var rightPressed = false;
var leftPressed = false;

var paddleSmall = false;

var sideNum = 0;


var check = false;

var up = true;

var right = 0;

var blocks = new Array(9);
var blocksBegX = new Array(9);
var blocksEndX = new Array(9);
var blocksBegY = new Array(9);
var blocksEndY = new Array(9);

var blocksDying = new Array(9);
var deadBlocksY = new Array(9);
var deadBlocksY2 = new Array(9);
var deadBlocksY3 = new Array(9);
var deadBlocksY4 = new Array(9);
var deadBlocksY5 = new Array(9);

var rowCleared = new Array(9);

var three = false;
var two = false;
var one = false;

var moveSpeed = 4;

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

var backMus;
var musPlay = true;

function submit(){

	//start playing background music
	backMus = document.getElementById("backgroundMusic");
	backMus.loop = true;
	backMus.play();

	creditsShown = false;

	//paddle starts out full size
	paddleSmall = false;

	//randomly choose whether the ball will start out travelling right or left
	var choose = Math.floor((Math.random() * 2) + 1);
	if(choose == 1){
		right = 1;
		
	}
	else{
		right = 2;
		
	}
	sideNum = 2;
	

	for(var i = 0; i < 9; i++){
		blocks[i] = false;
	}

	//create nested arrays
	for(var i = 0; i < 9; i++){
		blocks[i] = new Array(14);
		blocksBegY[i] = new Array(14);
		blocksBegX[i] = new Array(14);
		blocksEndY[i] = new Array(14);
		blocksEndX[i] = new Array(14);
		blocksDying[i] = new Array(14);
		deadBlocksY[i] = new Array(14);
		deadBlocksY2[i] = new Array(14);
		deadBlocksY3[i] = new Array(14);
		deadBlocksY4[i] = new Array(14);
		deadBlocksY5[i] = new Array(14);
	}

	//set default values
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 14; j++){
			blocks[i][j] = true;
			blocksDying[i][j] = false;
		}
	}

	//set locations of blocks
	blocksBegX[0][0] = 5;
	blocksBegY[0][0] = 83+(600/35);
	blocksEndX[0][0] = blocksBegX[0][0] + xSize;
	blocksEndY[0][0] = blocksBegY[0][0] + ySize;

	for(var i = 1; i < 14; i++){
		blocksBegX[0][i] = 5 + ((600/16)*(i) + (5*i));
		blocksBegY[0][i] = 83 + (600/35);
		blocksEndX[0][i] = blocksBegX[0][i] + xSize;
		blocksEndY[0][i] = blocksBegY[0][i] + ySize;
	}

	blocksBegX[1][0]= 5;
	blocksBegY[1][0] = 105+(600/35);
	blocksEndX[1][0] = blocksBegX[1][0] + xSize;
	blocksEndY[1][0] = blocksBegY[1][0] + ySize;

	for(var i = 1; i < 14; i++){
		blocksBegX[1][i] = 5+((600/16)*(i))+ (5*i);
		blocksBegY[1][i] = (105+(600/35));
		blocksEndX[1][i] = blocksBegX[1][i] + xSize;
		blocksEndY[1][i] = blocksBegY[1][i] + ySize;
	}

	blocksBegX[2][0] = 5;
	blocksBegY[2][0] = 110+((600/35)*2);
	blocksEndX[2][0] = blocksBegX[2][0] + xSize;
	blocksEndY[2][0] = blocksBegY[2][0] + ySize;
	
	for(var i = 1; i < 14; i++){
		blocksBegX[2][i] = 5 +((600/16)*(i))+ (5*i);
		blocksBegY[2][i] = (110+((600/35)*2));
		blocksEndX[2][i] = blocksBegX[2][i] + xSize;
		blocksEndY[2][i] = blocksBegY[2][i] + ySize;
	}

	blocksBegX[3][0] = 5;
	blocksBegY[3][0] = (115+((600/35)*3));
	blocksEndX[3][0] = blocksBegX[3][0] + xSize;
	blocksEndY[3][0] = blocksBegY[3][0] + ySize;
	
	for(var i = 1; i < 14; i++){
		blocksBegX[3][i] = 5 +((600/16)*(i))+ (5*i);
		blocksBegY[3][i] = (115+((600/35)*3));
		blocksEndX[3][i] = blocksBegX[3][i] + xSize;
		blocksEndY[3][i] = blocksBegY[3][i] + ySize;
	}

	blocksBegX[4][0] = 5;
	blocksBegY[4][0] = (120+((600/35)*4));
	blocksEndX[4][0] = blocksBegX[4][0] + xSize;
	blocksEndY[4][0] = blocksBegY[4][0] + ySize;
	
	for(var i = 1; i < 14; i++){
		blocksBegX[4][i] = 5 +((600/16)*(i))+ (5*i);
		blocksBegY[4][i] = (120+((600/35)*4));
		blocksEndX[4][i] = blocksBegX[4][i] + xSize;
		blocksEndY[4][i] = blocksBegY[4][i] + ySize;
	}

	blocksBegX[5][0] = 5;
	blocksBegY[5][0] = (125+((600/35)*5));
	blocksEndX[5][0] = blocksBegX[5][0] + xSize;
	blocksEndY[5][0] = blocksBegY[5][0] + ySize;
	
	for(var i = 1; i < 14; i++){
		blocksBegX[5][i] = 5 +((600/16)*(i))+ (5*i);
		blocksBegY[5][i] = (125+((600/35)*5));
		blocksEndX[5][i] = blocksBegX[5][i] + xSize;
		blocksEndY[5][i] = blocksBegY[5][i] + ySize;
	}

	blocksBegX[6][0] = 5;
	blocksBegY[6][0] = (130+((600/35)*6));
	blocksEndX[6][0] = blocksBegX[6][0] + xSize;
	blocksEndY[6][0] = blocksBegY[6][0] + ySize;
	
	for(var i = 1; i < 14; i++){
		blocksBegX[6][i] = 5 +((600/16)*(i))+ (5*i);
		blocksBegY[6][i] = (130+((600/35)*6));
		blocksEndX[6][i] = blocksBegX[6][i] + xSize;
		blocksEndY[6][i] = blocksBegY[6][i] + ySize;
	}

	blocksBegX[7][0] = 5;
	blocksBegY[7][0] = (135+((600/35)*7));
	blocksEndX[7][0] = blocksBegX[7][0] + xSize;
	blocksEndY[7][0] = blocksBegY[7][0] + ySize;
	
	for(var i = 1; i < 14; i++){
		blocksBegX[7][i] = 5 +((600/16)*(i))+ (5*i);
		blocksBegY[7][i] = (135+((600/35)*7));
		blocksEndX[7][i] = blocksBegX[7][i] + xSize;
		blocksEndY[7][i] = blocksBegY[7][i] + ySize;
	}

	//set default values for particle animations
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 14; j++){
			deadBlocksY[i][j] = blocksBegY[i][j];
			deadBlocksY2[i][j] = blocksBegY[i][j];
			deadBlocksY3[i][j] = blocksBegY[i][j];
			deadBlocksY4[i][j] = blocksBegY[i][j];
			deadBlocksY5[i][j] = blocksBegY[i][j];
		}
	}


	interval = parseInt(interval);
	numTimes = parseInt(numTimes);

	var prevTime = curTime;

	gameLoop(performance.now);
	
}

function gameLoop(timeNow){


if(lifeCount > 0){

	var elapsedTime;
	if(first){
		elapsedTime = interval;
		lastTime = performance.now();
		first = false;
	}
	else{
		elapsedTime = timeNow - lastTime;
		if(elapsedTime >= interval){
			lastTime = timeNow;
		}
	}
	
	update(elapsedTime);
	}
//Game Over
else{

	var overSound = document.getElementById("overSound");
	overSound.play();
	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var gameOver = document.getElementById("gameOver");
	ctx.drawImage(gameOver,0,0,600,600);

	//add high score to high score list
	if (typeof(Storage) !== "undefined") {
    
    if(localStorage.getItem('scoreStore1')==null){
    	localStorage.setItem('scoreStore1',score.toString());
    }
    else if(localStorage.getItem('scoreStore2')==null){
    	if(Number(localStorage.getItem('scoreStore1')) > score){
    		localStorage.setItem('scoreStore2',score.toString());

    	}
    	else{
    		localStorage.setItem('scoreStore2',localStorage.getItem('scoreStore1'));
    		localStorage.setItem('scoreStore1',score.toString());
    	}
    }
    else if(localStorage.getItem('scoreStore3')==null){
    	
    	if(score > Number(localStorage.getItem('scoreStore2'))){
    		localStorage.setItem('scoreStore3',localStorage.getItem('scoreStore2'));
    		if(score > Number(localStorage.getItem('scoreStore1'))){
    			localStorage.setItem('scoreStore2',localStorage.getItem('scoreStore1'));
    			localStorage.setItem('scoreStore1',score.toString());
    		   		}
    		else{
    			localStorage.setItem('scoreStore2',score.toString());
    		}
    	}
    	else{
    		localStorage.setItem('scoreStore3',score.toString());
    	}
    }


    else if(localStorage.getItem('scoreStore4')==null){
    	
    	if(score > Number(localStorage.getItem('scoreStore3'))){
    		localStorage.setItem('scoreStore4',localStorage.getItem('scoreStore3'));
    		if(score > Number(localStorage.getItem('scoreStore2'))){
    			localStorage.setItem('scoreStore3',localStorage.getItem('scoreStore2'));
    			if(score > Number(localStorage.getItem('scoreStore1'))){
    				localStorage.setItem('scoreStore2',localStorage.getItem('scoreStore1'));

    			}
    			else{
    				localStorage.setItem('scoreStore2',score.toString());
    			}
    		}
    		else{
    			localStorage.setItem('scoreStore3',score.toString());
    		}
    	}
    	else{
    		localStorage.setItem('scoreStore4',score.toString());
    	}
    }


    else if(localStorage.getItem('scoreStore5')==null){
    	
    	if(score > Number(localStorage.getItem('scoreStore4'))){
    		localStorage.setItem('scoreStore5',localStorage.getItem('scoreStore4'));
    		if(score > Number(localStorage.getItem('scoreStore3'))){
    			localStorage.setItem('scoreStore4',localStorage.getItem('scoreStore3'));
    			if(score > Number(localStorage.getItem('scoreStore2'))){
    				localStorage.setItem('scoreStore3',localStorage.getItem('scoreStore2'));
    				if(score > Number(localStorage.getItem('scoreStore1'))){
    					localStorage.setItem('scoreStore2',localStorage.getItem('scoreStore1'));
    					localStorage.setItem('scoreStore1',score.toString());
    				}
    				else{
    					localStorage.setItem('scoreStore2',score.toString());
    				}
    			}
    			else{
    				localStorage.setItem('scoreStore3',score.toString());
    			}
    		}
    		else{
    			localStorage.setItem('scoreStore4',score.toString());
    		}
    	}
    	else{
    		localStorage.setItem('scoreStore5',score.toString());
    	}
    }


    else{
    	if(score > Number(localStorage.getItem('scoreStore5'))){
    		localStorage.setItem('scoreStore5',score.toString());
    	if(score > Number(localStorage.getItem('scoreStore4'))){
    		localStorage.setItem('scoreStore5',localStorage.getItem('scoreStore4'));
    		if(score > Number(localStorage.getItem('scoreStore3'))){
    			localStorage.setItem('scoreStore4',localStorage.getItem('scoreStore3'));
    			if(score > Number(localStorage.getItem('scoreStore2'))){
    				localStorage.setItem('scoreStore3',localStorage.getItem('scoreStore2'));
    				if(score > Number(localStorage.getItem('scoreStore1'))){
    					localStorage.setItem('scoreStore2',localStorage.getItem('scoreStore1'));
    					localStorage.setItem('scoreStore1',score.toString());
    				}
    				else{
    					localStorage.setItem('scoreStore2',score.toString());
    				}
    			}
    			else{
    				localStorage.setItem('scoreStore3',score.toString());
    			}
    		}
    		else{
    			localStorage.setItem('scoreStore4',score.toString());
    		}
    	}
    	else{
    		localStorage.setItem('scoreStore5',score.toString());
    	}
    }
}

		//refresh score list
		scoreScoreScore();
		scoreScoreScore();
	

} 
}
}

function update(elapsedTime){

	//speed up ball as more points are aquired
	if(score >= 4){
		if(!fourBricks){
			fourBricks = true;
			moveSpeed++;
		}
		if(score >= 12){
			if(!twelveBricks){
				twelveBricks = true;
				moveSpeed++;
			}
			if(score >= 36){
				if(!thritySixBricks){
					thritySixBricks = true;
					moveSpeed++;
				}
				if(score >= 62){
					if(!sixtyTwoBricks){
						sixtyTwoBricks = true;
						moveSpeed++;
					}
				}
			}
		}
	}
	//move paddle
	if(leftPressed == true){
		if(!countingDown){
		if(!paddleSmall){
		if(move > -265 )
			move = move-10;
		}
		else{
			if(move > -280)
				move = move-10;
			
		}
	}
	}

	if(rightPressed == true){
		if(!countingDown){
		if(!paddleSmall){
			if(move < 265)
			move = move+10;
			
		}
		else{
			if(move < 280){
				move = move+10;
				
			}
		}
		}
		
	}

	check = false;
	//add extra points when a row is cleared
	var count = 0;
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 14; j++){
			if(blocks[i][j] == false){
				count++;
			}
		}
		if(count >= 14 && !rowCleared[i]){
			score += 25;
			rowCleared[i] = true;
		}
		count = 0;
	}


	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 14; j++){

			//update particle positions
			if(blocksDying[i][j]){
				deadBlocksY[i][j] += 5;
				deadBlocksY2[i][j] += 6;
				deadBlocksY3[i][j] += 3;
				deadBlocksY4[i][j] += 7;
				deadBlocksY5[i][j] += 4;
			}
			//check for ball collision with blocks
			if((!(ballEndX < blocksBegX[i][j]) && !(ballBegX > blocksEndX[i][j]) && !(ballBegY > blocksEndY[i][j]) && !(ballEndY < blocksBegY[i][j]))){
				if(blocks[i][j] == true){
					blocks[i][j] = false;
					blocksDying[i][j] = true;


					check = true;
					if(i == 0 || i == 1){
						score = score + 5;
						if(paddleSmall == false){
							var shrinkSound = document.getElementById("shrinkSound");
							shrinkSound.play();
							paddleSmall = true;
						}
					}
					if(i == 2 ||i == 3){
						score = score + 3;
					}
					if(i == 4 || i == 5){
						score = score + 2;
					}
					if(i == 6 || i == 7){
						score++;
					}
				}
			}

			

		}
	}

	if(released){	
		//lose a life if you go out of bounds
		if(ballBegY >= 560){
			var deathSound = document.getElementById("deathSound");
			deathSound.play();

			released = false;

			lifeCount--;
			xAdd = 0;
			yAdd = 0;
			move = 0;

			var choose = Math.floor((Math.random() * 2) + 1);
			if(choose == 1){
				right = 1;
			}
			else{
				right = 2;
			}
			sideNum = 2.1;
			initMoveX = move;
			moveX = move;
			if(lifeCount > 0){
				countingDown = true;
			}
				
		}

	
		//reset values
		if(dead1){
			released = false;

			lifeCount--;
			xAdd = 0;
			yAdd = 0;
			move = 0;

			var choose = Math.floor((Math.random() * 2) + 1);
			if(choose == 1){
				right = 1;
			}
			else{
				right = 2;
			}
			sideNum = 2.1;

		}




		//change ball direction when it hits something
		if(up){
		if(yAdd > -540){
			if(!check){
				yAdd= yAdd - moveSpeed;
			}
			else{
				var hit2 = document.getElementById("hit2");
					hit2.play();

				up = false;
			}
		}
		else{
			var wallHit = document.getElementById("wallHit");
			wallHit.play();

			up = false;
		}
	}
	else if(!up){
		if(yAdd < 40){
			if((ballEndX < padBegX || ballBegX > padEndX) || (ballEndY < padBegY || ballBegY > padEndY)){
				if(!check){
					yAdd = yAdd + moveSpeed;
				}
				else{
					var hit2 = document.getElementById("hit2");
					hit2.play();

					up = true;
				}

			}
			else{
				
				if(rightPressed){
					right = 1;

					if(sideNum <= 6 && sideNum> 0){
						if(right == 1){
							sideNum+=.1;
						} 
						else{
							sideNum-=.1;
						}
					}
				}
				if(leftPressed){
					right = 2;
					if(sideNum <= 6 && sideNum> 0){
						if(right == 2){
							sideNum+=.1;
						}
						else{
							sideNum-=.1;

						}
					}
				}
				var hit1 = document.getElementById("hit1");
					hit1.play();
				up = true;
			}
			
		}
		else{
			up = true;
			var wallHit = document.getElementById("wallHit");
			wallHit.play();
		}
	}
	if(right == 1){
		if(xAdd < 290 - initMoveX){
			if(!check){
				
				xAdd = xAdd + sideNum;
			}
			else{
				right = 2;
				var hit1 = document.getElementById("hit1");
					hit1.play();
			}
	
		}
		else{
			var wallHit = document.getElementById("wallHit");
			wallHit.play();
			right = 2;
		}
	}
	if(right == 2){
		if(xAdd > -290 - initMoveX){
			if(!check){

				xAdd = xAdd - sideNum;
			}
			else{
				var hit1 = document.getElementById("hit1");
					hit1.play();

				right = 1;
			}
		}
		else{
			var wallHit = document.getElementById("wallHit");
			wallHit.play();
			

			right = 1;
		}
	}





		}

	curTime = performance.now();


		if(elapsedTime >= interval){
			//count down sequence
			if(countingDown){
				
				if(countDownInterval > 0 && countDownInterval <= 5){
					var countSound = document.getElementById("countDown");
					countSound.play();

					one = true;
				}
				else{
										one = false;
				}
				if(countDownInterval > 5 && countDownInterval <= 10){
					var countSound = document.getElementById("countDown");
					countSound.play();

					two = true;
				}
				else{
					
					two = false;
				}
				if(countDownInterval > 10){
					var countSound = document.getElementById("countDown");
					countSound.play();

					three = true;
				}
				else{
					
					three = false;
				}
				if(countDownInterval > 0){
					countDownInterval = countDownInterval - .1;
				}
				else{
					countingDown = false;
					released = true;
					countDownInterval = 15;
				}
			}
			render();
		}
		else{
			gameLoop(performance.now());
		}

}

function render(){

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.clearRect(0, 0, 600, 600);

	//render background
	var paper = document.getElementById("paper");
	ctx.drawImage(paper,0,0,600,600);

	//render particles
	var yellowPart1 = document.getElementById("byPart1");
	var yellowPart2 = document.getElementById("byPart2");
	var yellowPart3 = document.getElementById("byPart3");
	var yellowPart4 = document.getElementById("byPart4");
	var yellowPart5 = document.getElementById("byPart5");

	for(var i = 6; i < 9; i++){
		for(var j = 0; j < 14; j++){
			if(deadBlocksY3[i][j] > 600){
					blocksDying[i][j] = false;
			}

			if(blocksDying[i][j] == true){
				ctx.drawImage(byPart1, blocksBegX[i][j],deadBlocksY[i][j],30,30);
				ctx.drawImage(byPart2, blocksBegX[i][j]+12,deadBlocksY2[i][j],30,30);
				ctx.drawImage(byPart3, blocksBegX[i][j]+12,deadBlocksY3[i][j]+10,30,30);
				ctx.drawImage(byPart4, blocksBegX[i][j]+21,deadBlocksY4[i][j],30,30);
				ctx.drawImage(byPart5, blocksBegX[i][j]+22,deadBlocksY5[i][j]+17,30,30);

				}
			
		}
	}


	var orangePart1 = document.getElementById("boPart1");
	var orangePart2 = document.getElementById("boPart2");
	var orangePart3 = document.getElementById("boPart3");
	var orangePart4 = document.getElementById("boPart4");

	for(var i = 4; i < 6; i++){
		for(var j = 0; j < 14; j++){
			if(deadBlocksY3[i][j] > 600){
					blocksDying[i][j] = false;
			}

			if(blocksDying[i][j] == true){
				ctx.drawImage(boPart1, blocksBegX[i][j],deadBlocksY[i][j],30,30);
				ctx.drawImage(boPart2, blocksBegX[i][j]+12,deadBlocksY2[i][j],30,30);
				ctx.drawImage(boPart3, blocksBegX[i][j]+12,deadBlocksY3[i][j]+10,30,30);
				ctx.drawImage(boPart4, blocksBegX[i][j]+22,deadBlocksY5[i][j]+17,30,30);

				}
			
		}
	}



	var bluePart1 = document.getElementById("bbPart1");
	var bluePart2 = document.getElementById("bbPart2");
	var bluePart3 = document.getElementById("bbPart3");
	var bluePart4 = document.getElementById("bbPart4");

	for(var i = 2; i < 4; i++){
		for(var j = 0; j < 14; j++){
			if(deadBlocksY3[i][j] > 600){
					blocksDying[i][j] = false;
			}

			if(blocksDying[i][j] == true){
				ctx.drawImage(bluePart1, blocksBegX[i][j],deadBlocksY[i][j],30,30);
				ctx.drawImage(bluePart2, blocksBegX[i][j]+12,deadBlocksY2[i][j],30,30);
				ctx.drawImage(bluePart3, blocksBegX[i][j]+12,deadBlocksY3[i][j]+10,30,30);
				ctx.drawImage(bluePart4, blocksBegX[i][j]+22,deadBlocksY5[i][j]+17,30,30);

				}
			
		}
	}


	var greenPart1 = document.getElementById("bgPart1");
	var greenPart2 = document.getElementById("bgPart2");
	var greenPart3 = document.getElementById("bgPart3");
	var greenPart4 = document.getElementById("bgPart4");
	var greenPart5 = document.getElementById("bgPart5");

	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 14; j++){
			if(deadBlocksY3[i][j] > 600){
					blocksDying[i][j] = false;
			}

			if(blocksDying[i][j] == true){
				ctx.drawImage(greenPart1, blocksBegX[i][j],deadBlocksY[i][j],30,30);
				ctx.drawImage(greenPart2, blocksBegX[i][j]+12,deadBlocksY2[i][j],30,30);
				ctx.drawImage(greenPart3, blocksBegX[i][j]+12,deadBlocksY3[i][j]+10,30,30);
				ctx.drawImage(greenPart4, blocksBegX[i][j]+21,deadBlocksY4[i][j],30,30);
				ctx.drawImage(greenPart5, blocksBegX[i][j]+22,deadBlocksY5[i][j]+17,30,30);

				}
			
		}
	}

	//render blocks
	var img = document.getElementById("blockGreen");

	if(blocks[0][0]){
		ctx.drawImage(img,5,83+(600/35),600/16,600/35);
	}
	for(var i = 1; i < 14; i++){
		if(blocks[0][i]){
			ctx.drawImage(img,5 + ((600/16)*(i) + (5*i)),83+(600/35),600/16,600/35);
		}
	}

	if(blocks[1][0]){
		ctx.drawImage(img,5,105+(600/35),600/16,600/35);
	}

	for(var i = 1; i < 14; i++){
		if(blocks[1][i]){
			ctx.drawImage(img,5+((600/16)*(i))+ (5*i),105+(600/35),600/16,600/35);
		}
	}

	var img2 = document.getElementById("blockBlue");
	if(blocks[2][0]){
		ctx.drawImage(img2,5,(110+((600/35)*2)),600/16,600/35);
	}
	for(var i = 1; i < 14; i++){
		if(blocks[2][i]){
			ctx.drawImage(img2,5 +((600/16)*(i))+ (5*i),(110+((600/35)*2)),600/16,600/35);
		}
	}
	if(blocks[3][0]){
		ctx.drawImage(img2,5,(115+((600/35)*3)),600/16,600/35);
	}
	for(var i = 1; i < 14; i++){
		if(blocks[3][i]){
			ctx.drawImage(img2,5 +((600/16)*(i))+ (5*i),(115+((600/35)*3)),600/16,600/35);
		}
	}

	var img3 = document.getElementById("blockOrange");
	if(blocks[4][0]){
		ctx.drawImage(img3,5,(120+((600/35)*4)),600/16,600/35);
	}
	for(var i = 0; i < 14; i++){
		if(blocks[4][i]){
			ctx.drawImage(img3,5 +((600/16)*(i))+ (5*i),(120+((600/35)*4)),600/16,600/35);
		}
	}
	if(blocks[5][0]){
		ctx.drawImage(img3,5,(125+((600/35)*5)),600/16,600/35);
	}
	for(var i = 0; i < 14; i++){
		if(blocks[5][i]){
			ctx.drawImage(img3,5 +((600/16)*(i))+ (5*i),(125+((600/35)*5)),600/16,600/35);
		}
	}

	var img4 = document.getElementById("blockYellow");
	if(blocks[6][0]){
		ctx.drawImage(img4,5,(130+((600/35)*6)),600/16,600/35);
	}
	for(var i = 0; i < 14; i++){
		if(blocks[6][i]){
			ctx.drawImage(img4,5 +((600/16)*(i))+ (5*i),(130+((600/35)*6)),600/16,600/35);
		}
	}
	if(blocks[7][0]){
		ctx.drawImage(img4,5,(135+((600/35)*7)),600/16,600/35);
	}
	for(var i = 0; i < 14; i++){
		if(blocks[7][i]){
			ctx.drawImage(img4,5 +((600/16)*(i))+ (5*i),(135+((600/35)*7)),600/16,600/35);
		}
	}

	//render score readout
	var scoreImg = document.getElementById("score");
	ctx.drawImage(scoreImg,0,560,(600/7),(600/13));

	var oneNum = document.getElementById("one");
	var twoNum = document.getElementById("two");
	var threeNum = document.getElementById("three");
	var fourNum = document.getElementById("four");
	var fiveNum = document.getElementById("five");
	var sixNum = document.getElementById("six");
	var sevenNum = document.getElementById("seven");
	var eightNum = document.getElementById("eight");
	var nineNum = document.getElementById("nine");
	var zeroNum = document.getElementById("zero");

	var curImg1 =  zeroNum;
	var curImg2 = zeroNum;
	var curImg3 =  zeroNum;
	var scorePiece1;
	var scorePiece2;
	var scorePiece3;


	if(score/10 < 1){
		scorePiece1 = score;
	}
	if(score/10 >= 1 && score/100 <= 1){
		scorePiece1 = score%10;
		scorePiece2 = (score - (score%10))/10;
	}
	if(score/10 > 1 && score/100 > 1){
		scorePiece1 = score % 10;
		scorePiece2 = Math.floor(Math.floor(score/10)%10);
		scorePiece3 = Math.floor(Math.floor(score-(Math.floor(score%10)))/100);
	}
	if(score == 100){
		curImg1 = zeroNum;
		curImg2 = zeroNum;
		curImg3 = oneNum;
	}
	if(score == 10){
		curImg1 = zeroNum;
		curImg2 = oneNum;
	}

	if(scorePiece3 == 1){
		curImg3 = oneNum;
	}
	if(scorePiece3 == 2){
		curImg3 = twoNum;
	}
	if(scorePiece3 == 3){
		curImg3 = threeNum;
	}
	if(scorePiece3 == 4){
		curImg3 = fourNum;
	}
	if(scorePiece3 == 5){
		curImg3 = fiveNum;
	}
	if(scorePiece3 == 6){
		curImg3 = sixNum;
	}
	if(scorePiece3 == 7){
		curImg3 = sevenNum;
	}
	if(scorePiece3 == 8){
		curImg3 = eightNum;
	}
	if(scorePiece3 == 9){
		curImg3 = nineNum;
	}
	if(scorePiece3 == 0){
		curImg3 = zeroNum;
	}

	if(scorePiece2 == 1){
		curImg2 = oneNum;
	}
	if(scorePiece2 == 2){
		curImg2 = twoNum;
	}
	if(scorePiece2 == 3){
		curImg2 = threeNum;
	}
	if(scorePiece2 == 4){
		curImg2 = fourNum;
	}
	if(scorePiece2 == 5){
		curImg2 = fiveNum;
	}
	if(scorePiece2 == 6){
		curImg2 = sixNum;
	}
	if(scorePiece2 == 7){
		curImg2 = sevenNum;
	}
	if(scorePiece2 == 8){
		curImg2 = eightNum;
	}
	if(scorePiece2 == 9){
		curImg2 = nineNum;
	}
	if(scorePiece2 == 0){
		curImg2 = zeroNum;
	}

	if(scorePiece1 == 1){
		curImg1 = oneNum;
	}
	if(scorePiece1 == 2){
		curImg1 = twoNum;
	}
	if(scorePiece1 == 3){
		curImg1 = threeNum;
	}
	if(scorePiece1 == 4){
		curImg1 = fourNum;
	}
	if(scorePiece1 == 5){
		curImg1 = fiveNum;
	}
	if(scorePiece1 == 6){
		curImg1 = sixNum;
	}
	if(scorePiece1 == 7){
		curImg1 = sevenNum;
	}
	if(scorePiece1 == 8){
		curImg1 = eightNum;
	}
	if(scorePiece1 == 9){
		curImg1 = nineNum;
	}
	if(scorePiece1 == 0){
		curImg1 = zeroNum;
	}

	if(score/10 < 1){
		ctx.drawImage(curImg1,(600/7),560,(600/18),(600/16));
	}
	if((score/10 >= 1 && score/100 < 1) || score == 10){
		ctx.drawImage(curImg2,(600/7),560,(600/18),(600/16));
		ctx.drawImage(curImg1,(600/7) + (600/28),560,(600/18),(600/16));
	}
	if((score/10 > 1 && score/100 > 1) || score == 100){
		ctx.drawImage(curImg3,(600/7),560,(600/18),(600/16));
		ctx.drawImage(curImg2,(600/7) + (600/28),560,(600/18),(600/16));
		ctx.drawImage(curImg1,(600/7) + ((600/28)*2),560,(600/18),(600/16));
	}

	
	//render life count
	var heartImg = document.getElementById("heart");

	if(lifeCount == 3){
		ctx.drawImage(heartImg, 600-40-((600/16)*2),560,(600/16),(600/16));
	}
	if(lifeCount >= 2){
		ctx.drawImage(heartImg, 600-40-(600/16),560,(600/16),(600/16));
	}
	if(lifeCount >= 1){
		ctx.drawImage(heartImg, 600-40,560,(600/16),(600/16));
	}

	if(!paddleSmall){
		padBegX = 600/2-(600/16)+move;
		padBegY = 600-40;
		padEndX = padBegX + (600/8);
		padEndY = padBegY + (600/8);
	}
	else{
		padBegX = 600/2-(600/32)+move;
		padBegY = 600-40;
		padEndX = padBegX + (600/16);
		padEndY = padBegY + (600/16);
	}

	//render paddle
	var paddleFullImg = document.getElementById("paddleFull");
	var paddleSmallImg = document.getElementById("paddleHalf");
	if(!paddleSmall){
		ctx.drawImage(paddleFullImg,padBegX,padBegY,(600/8),(600/35));
	}
	else{
		ctx.drawImage(paddleHalf,padBegX,padBegY,(600/16),(600/35));
	}

	if(!released){
		ballBegX = (600/2)-(600/35/2) + move;
		ballBegY = 600-57;
	}
	if(released && !dead1){
		ballBegX = (600/2)-(600/35/2) + moveX+xAdd;
		ballBegY = 600-57 + moveY+yAdd;
	}
	
	ballEndX = ballBegX + (600/35);
	ballEndY = ballBegY + (600/35);

	var ballImg = document.getElementById("ball");
	ctx.drawImage(ballImg,ballBegX,ballBegY,(600/35),(600/35));



	//render count down
	var oneImg = document.getElementById("oneFull");
	if(one){
		ctx.drawImage(oneImg,0,0,600,600);
	}
	var twoImg = document.getElementById("twoFull");
	if(two){
		ctx.drawImage(twoImg,0,0,600,600);
	}
	var threeImg = document.getElementById("threeFull");
	if(three){
		ctx.drawImage(threeImg,0,0,600,600);
	}
	


	
		window.requestAnimationFrame(gameLoop);
	
}

function onKeyDown(e) {

		//LeftArrow
		if(e.keyCode === 37){
			leftPressed = true;

		}

		//RightArrow
		if(e.keyCode === 39){
			rightPressed = true;	

		}

	}

	function onKeyUp(e){

		if(e.keyCode === 37){
			leftPressed = false;
			

		}

		//RightArrow
		if(e.keyCode === 39){
			rightPressed = false;

		}

	}

	//reload page to restart game
	function reloadPage(){
		location.reload();
	}

	//toggle showing high scores
	function scoreScoreScore() {
		if(showCredits){
			var creditsShown = document.getElementById("creditsInfo");
    		creditsShown.innerHTML = "";
			showCredits = false;
		}
		if(showScores){
			showScores = false;
			var scoresShown = document.getElementById("scoresShown");
			
			scoresShown.innerHTML = "";
		}
		else{
			showScores = true;
			var scoresShown = document.getElementById("scoresShown");


			if (typeof(Storage) !== "undefined") {

    if(!(localStorage.getItem('scoreStore1')===null)){
    	scoresShown.innerHTML += "<h1>" + localStorage.getItem('scoreStore1') + "</h1>";
    }
    if(!(localStorage.getItem('scoreStore2')===null)){
    	scoresShown.innerHTML += "<h1>" + localStorage.getItem('scoreStore2') + "</h1>";
    }
    if(!(localStorage.getItem('scoreStore3')===null)){
    	scoresShown.innerHTML += "<h1>" + localStorage.getItem('scoreStore3') + "</h1>"; 
    }
    if(!(localStorage.getItem("scoreStore4")===null)){
    	scoresShown.innerHTML += "<h1>" + localStorage.getItem('scoreStore4') + "</h1>";
    }
    if(!(localStorage.getItem('scoreStore5')===null)){
    	scoresShown.innerHTML += "<h1>" + localStorage.getItem('scoreStore5')+"</h1>";
    }

    scoresShown.innerHTML += "<button type='button' id='resetButton' onClick = 'resetScores()'></button>"

} 
			
		}
        
    }

//toggle showing credits
    function creditsFunc(){
    	if(showScores){
    		showScores = false;
    		var scoresShown = document.getElementById("scoresShown");
			
			scoresShown.innerHTML = "";
    	}
    	if(showCredits){
    		var creditsShown = document.getElementById("creditsInfo");
    		creditsShown.innerHTML = "";
    		showCredits = false;
    	}
    	else{
    		showCredits = true;
    		var creditsShown = document.getElementById("creditsInfo");
    		creditsShown.innerHTML = "<h1>Created By: Anne Wellings</h1>";
    	}
    }

//clear the recorded high scores
function resetScores(){
	localStorage.clear();
	//refresh high scores
	scoreScoreScore();
	scoreScoreScore();
}