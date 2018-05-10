function Bricks(){
	
	let m 				= new Object();
	
	m.brickRowCount 	= 18;
	m.brickColumnCount 	= 13;
	m.brickWidth 		= 44;
	m.brickHeight 		= 22;
	m.brickPadding 		= 0;
	m.brickOffsetTop 	= 18;
	m.brickOffsetLeft 	= 18;
	m.bricks 			= [];
	m.score				= 0;
		
	return m;
}

function BrickType(){
	
	let m 				= new Object();
	
	m.x 				= 0;
	m.y 				= 0;
	m.status 			= 1;
	m.type 				= 0;
	m.HitPoints 		= 0;
	m.bonus 			= "";
	m.brickColor 		= null;
	m.LeftYIntercept 	= 0;
	m.RightYIntercept 	= 0;
	m.TopXIntercept 	= 0;
	m.BottomXIntercept	= 0;
	
	m.calculateIntercepts = function(ball){
	
		//Where will the ball intercept this brick if it does?
		let slope 				= ball.dy / ball.dx;
		let b 					= ball.y - (slope*ball.x);
				
		this.TopXIntercept 		= (b.y - b) / slope;
		this.BottomXIntercept 	= ((b.y+pBricks.brickHeight) - b) / slope;
		this.LeftYIntercept 	= (slope * b.x) + b;
		this.RightYIntercept 	= (slope * (b.x + pBricks.brickWidth)) + b;
		
		//If the target x and y is not within the target area, then initialize intercepts
		//to -1 to indicate there is no intercept with our brick. 
		
		if(this.TopXIntercept < b.x || this.TopXIntercept > b.x + pBricks.brickWidth)
			this.TopXIntercept 	= -1;
			
		if(this.BottomXIntercept < b.x || this.BottomXIntercept > b.x + pBricks.brickWidth)
			this.BottomXIntercept = -1;
			
		if(this.LeftYIntercept < b.y || this.LeftYIntercept > b.y + pBricks.brickHeight)
			this.LeftYIntercept = -1;
			
		if(this.RightYIntercept < b.y || this.RightYIntercept > b.y + pBricks.brickHeight)
			this.RightYIntercept = -1;
	}
	
	return m;
}

function Ball(x, y, dx, dy, r){
	
	let m = new Object();
	
	m.x 			= x;
	m.y 			= y;
	m.dx 			= dx;
	m.dy 			= dy;
	m.ballRadius 	= r;
	m.OnScreen 		= true;
	m.missed 		= false;
	m.spin 			= 0.0;
	m.mass			= 1.0;
	
	return m;
}

function Mechanics(){
	
	let m 			= new Object();
	
	m.Balls			= [];
	m.Balls.push(Ball(canvas.width/2, canvas.height-77, 1.5, -6, 6));
	m.rightPressed 	= false;
	m.leftPressed 	= false;
	m.score 		= 0;
	m.lives 		= 3;
	m.start 		= false;
	m.miss			= false;
	m.GameOverFlag 	= false;
	m.BallsOnScreen = 1;
	
	m.CalculateIntercepts = function(){
		
		for(let i=0; i<Balls.length; i++){
			
			let ball = Balls[i];
			pBricks.calculateIntercepts(ball);
		}
	}

	return m;
}

function PaddleObject(){
	
	var m 			= new Object();
	
	m.height 		= 20;
	m.width 		= 100;
	m.sprite 		= pSprites.arkanoidshipimg;
	m.x 			= (canvas.width-m.width)/2;
	m.paddleType 	= "normal";
	m.CatchTimer 	= 3000;
	m.VelocityX 	= 1.0;
	m.friction 		= .5; //normal friction. If 1 then heavy friction, if 0 then slippery. 
	m.mass 			= 2.0;
	
	return m;
}

function ProjectileObject(x, y){
	
	let m 		= new Object();
	
	m.x 		= x;
	m.y 		= y;
	m.speed 	= 10;
	m.radius 	= 5;
	
	return m;
}

function Projectile(x, y){
	
	let m 			= new Object();
	m.ProjectileA 	= x;
	m.ProjectileB 	= y;
	
	m.render = function(){
		m.ProjectileA.y -= m.ProjectileA.speed;
		m.ProjectileB.y -= m.ProjectileB.speed;
	}
	
	return m;	
}

function Sprites(){
	
	let m 					= new Object();
	
	m.arkanoidshipimg 		= newSprite('arkanoidship.png');
	m.firingshipimg 		= newSprite('firingship.png');
	m.projectile 			= newSprite('fireprojectile.png');
	m.expandedshipimg 		= newSprite('expandedship2.png');
	m.BreakUpgrade 			= newSprite('BreakUpgrade.png');
	m.CatchUpgrade 			= newSprite('CatchUpgrade.png');
	m.DisruptionUpgrade 	= newSprite('DisruptionUpgrade.png');
	m.ExpandUpgrade 		= newSprite('ExpandUpgrade.png');
	m.ExtraLifeUpgrade 		= newSprite('ExtraLifeUpgrade.png');
	m.LaserUpgrade 			= newSprite('LaserUpgrade.png');
	m.SlowUpgrade 			= newSprite('SlowUpgrade.png');
	m.BlueBrick 			= newSprite('BlueBrick.png');
	m.GreenBrick 			= newSprite('GreenBrick.png');
	m.InvincibleBlock 		= newSprite('InvincibleBlock.png');
	m.OrangeBrick 			= newSprite('OrangeBrick.png');
	m.RedBrick 				= newSprite('RedBrick.png');
	m.TealBrick 			= newSprite('TealBrick.png');
	m.TwoHitBricks 			= newSprite('TwoHitBricks.png');
	m.VioletBrick 			= newSprite('VioletBrick.png');
	m.WhiteBrick 			= newSprite('WhiteBrick.png');
	m.YellowBrick 			= newSprite('YellowBrick.png');
	m.IceFriction 			= newSprite('IceFriction.png');
	m.NormalFriction 		= newSprite('NormalFriction.png');
	m.RigidFriction			= newSprite('RigidFriction.png');
	m.enemy1				= newSprite('enemy1.png'); 
	m.enemy2				= newSprite('enemy2.png');
	m.enemy3				= newSprite('enemy3.png'); 
	m.enemy4				= newSprite('enemy4.png'); 
	
	return m;
}

function Sounds(){
	
	let m 				= new Object();
	
	m.collision1Sound 	= new sound("Sounds/BrickHit1.wav");
	m.collision2Sound 	= new sound("Sounds/BrickHit2.wav");
	m.twobrickCollision	= new sound("Sounds/TwoHitBrickHit.wav");
	m.InvincibleHit 	= new sound("Sounds/InvincibleBrickHit.wav");
	m.Death			 	= new sound("Sounds/Death.wav");
	m.Expanded			= new sound("Sounds/Expanded.wav");
	m.ShotsFired		= new sound("Sounds/ShotsFired.wav");
	m.CreatureHit		= new sound("Sounds/CreatureHit.wav");
	m.ExtraLife			= new sound("Sounds/ExtraLife.wav");
	m.LevelStart 		= new sound("Sounds/levelstart.ogg");
	m.GameOver 			= new sound("Sounds/gameover.ogg");
	
	return m;
}

function newSprite(src){
	
	let m 			= new Image();
	m.src 			= src;
	let imageLoaded = false;
	m.onload 		= function() {
		imageLoaded = true;
	};
	return m;
}

function sprite (options) {
				
	let that 		= {};		
	that.context 	= options.context;
	that.width 		= options.width;
	that.height 	= options.height;
	that.image 		= options.image;
	frameIndex 		= 0;
	tickCount 		= 0;
	that.ticksPerFrame 	= options.ticksPerFrame || 0;
	that.numberOfFrames 	= options.numberOfFrames || 1;
	that.numberOfFramesLong = options.numberOfFramesLong || 1;
	that.numberOfFramesHigh = options.numberOfFramesHigh || 1;
	that.loop 		= options.loop;
	that.caught 	= false;
	that.Movement	= "initialdown";
	
	that.renderEnemy 	= function (x,y) {
	
		that.context.clearRect(-219, -219, that.width, that.height);
	
		if(that.image != null){
			that.context.drawImage(
			   that.image,
			   (frameIndex%that.numberOfFramesLong) * (that.width / that.numberOfFramesLong),
			   Math.floor(frameIndex/that.numberOfFramesHigh) * (that.height / that.numberOfFramesHigh),
			   that.width / that.numberOfFramesLong,
			   that.height / that.numberOfFramesHigh,
			   x,
			   y,
			   (that.width / that.numberOfFramesLong),
			   (that.height / that.numberOfFramesHigh));
		}
	};

	that.updateEnemy = function() {
	
		tickCount += 1;
		if(tickCount > that.ticksPerFrame){
			tickCount = 0;
			if(frameIndex < (that.numberOfFramesLong*that.numberOfFramesHigh) - 1){
				frameIndex += 1;
			}
			else if(that.loop){
				frameIndex = 0;
			}
		}
	}

	that.render 	= function (x,y) {
		
		that.context.clearRect(-400, -50, that.width, that.height);
		
		if(that.image != null){
			that.context.drawImage(
			   that.image,
			   frameIndex * (that.width / that.numberOfFrames),
			   0,
			   that.width / that.numberOfFrames,
			   that.height,
			   x,
			   y,
			   (that.width / that.numberOfFrames),
			   that.height);
		}
	};
	
	that.update = function() {
		
		tickCount += 1;
		if(tickCount > that.ticksPerFrame){
			tickCount = 0;
			if(frameIndex < that.numberOfFrames - 1){
				frameIndex += 1;
			}
			else if(that.loop){
				frameIndex = 0;
			}
		}
	};
	
	return that;
}

function DrawFiringProjectile(){
	
	if(pPaddle.paddleType == "fire"){
	
		for(let i = 0; i < pProjectiles.length; i++){
			
			var xa = pProjectiles[i].ProjectileA.x;
			var xb = pProjectiles[i].ProjectileB.x;
			var ya = pProjectiles[i].ProjectileA.y;
			var yb = pProjectiles[i].ProjectileB.y;

			if(ya <=0){
				pProjectiles.shift();
			}
			else{
				pProjectiles[i].render();
			}

			if(pProjectiles[i] != undefined || pProjectiles[i] != null){
			
				ctx.beginPath();
				ctx.arc(xa, ya, pProjectiles[i].ProjectileA.radius, 0, Math.PI*2);
				ctx.arc(xb, yb, pProjectiles[i].ProjectileB.radius, 0, Math.PI*2);
				ctx.fillStyle 	= "#FEFEFE";
				ctx.fill();
				ctx.closePath();
				
				//Does it collide with a brick?
				
				for(let r = 0; r < pBricks.bricks.length;r++){
					for(let c = 0; c < pBricks.bricks[r].length; c++){
					
						var b = pBricks.bricks[r][c];
						if(b.status == 1){
						
							if(xa>= b.x && xa<=b.x+pBricks.brickWidth && ya<=b.y+pBricks.brickHeight && ya >=b.y){
								
								if(b.type != 3){
									b.HitPoints--;
								
									if(b.HitPoints<=0){
										b.status = 0;
									}
								}
								
								pProjectiles.shift();
							}	
							if(xb>= b.x && xb<=b.x+pBricks.brickWidth && yb<=b.y+pBricks.brickHeight && yb >=b.y){
								if(b.type != 3){
									b.HitPoints--;
								
									if(b.HitPoints<=0){
										b.status = 0;
									}
								}
							}	
						}							
					}
				}				
			}
		}
	}
}

function RenderEnemies(){
		
    for(let i=0; i<enemiesToRender.length; i++){
				
		if(enemiesToRender[i].RenderPowerUp){
			enemiesToRender[i].updateEnemy();
			
			let e = enemiesToRender[i];
			let x = .5;
			let y = 0;
						
			enemiesToRender[i].y = enemiesToRender[i].y+y;
			enemiesToRender[i].x = enemiesToRender[i].x+x;
					
			enemiesToRender[i].renderEnemy(enemiesToRender[i].x, enemiesToRender[i].y);

			if(enemiesToRender[i].y > canvas.height){
				enemiesToRender.splice(i, 1);
			}
		}
	}

}

function spriteLoop () {

    for(let i=0; i<bricksToRender.length; i++){
				
		if(bricksToRender[i].RenderPowerUp){
			bricksToRender[i].update();
			bricksToRender[i].render(bricksToRender[i].x, bricksToRender[i].y+=3);
		}
		
		var paddleY = canvas.height-pPaddle.height-55;
		
		if(bricksToRender[i].y > paddleY-10 && bricksToRender[i].y < paddleY + 10){
			if(bricksToRender[i].x > pPaddle.x && bricksToRender[i].x < pPaddle.x + pPaddle.width){
				
				if(bricksToRender[i].BonusGrabbed == false){
					switch(bricksToRender[i].pSpriteType){
						case "expand":
							pPaddle.sprite = pSprites.expandedshipimg;
							pPaddle.paddleType = "expand";
							pPaddle.width = 128;
							pSounds.Expanded.play();
							
							break;
						case "catch":
							pPaddle.paddleType = "catch";
							break;
						case "disruption":
							
							var firstBall = pMechanics.Balls[0];
							if(firstBall.dy>0)
								firstBall.dy = -firstBall.dy;
							
							pMechanics.Balls.push(Ball(firstBall.x, firstBall.y, -firstBall.dx-5, firstBall.dy, firstBall.ballRadius));
							pMechanics.Balls.push(Ball(firstBall.x, firstBall.y, firstBall.dx+7, firstBall.dy, firstBall.ballRadius));
							break;
						case "slow":
							for(let index = 0; index < pMechanics.Balls.length; index++){
								pMechanics.Balls[index].dx = (pMechanics.Balls[index].dx<0) ? -(Math.floor(pMechanics.Balls[index].dx/3)): Math.floor(pMechanics.Balls[index].dx/3);
								pMechanics.Balls[index].dy = (pMechanics.Balls[index].dy<0) ? -(Math.floor(pMechanics.Balls[index].dy/3)): Math.floor(pMechanics.Balls[index].dy/3);
							}
							break;
						case "laser":
							pPaddle.sprite = pSprites.firingshipimg;
							pPaddle.paddleType = "fire";
															
							break;
						case "break":
							breakFlag = true;
							break;
						case "life":
							pMechanics.lives++;
							break;
					}			
					bricksToRender[i].BonusGrabbed	= true;				
					bricksToRender[i].RenderPowerUp = false;
				}
			}
		}
			
		if(bricksToRender[i].y > canvas.height){
			bricksToRender[i].RenderPowerUp = false;
		}
	}
}

function LifeLost(){
	
	pMechanics.lives--;
	for(var i=0; i<bricksToRender.length; i++){
		bricksToRender[i].RenderPowerUp = false;
	}
}

function sound(src) {
	this.sound = new Audio(src);
	this.sound.volume = .5;
	this.sound.load();
	
	this.play = function(){
		this.sound.currentTime = 0;
		if(this.sound.currentTime == 0)
			this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}

function keyDownHandler(e) {

	switch(e.keyCode){
	case 39:
		pMechanics.rightPressed = true;
		break;

	case 37:
		pMechanics.leftPressed = true;
		break;
		
	case 80: //p key is pressed
		cancelAnimationFrame(GameID);
		break;
		
	case 83: //s key is pressed
		GameID = requestAnimationFrame(draw);
		break;
		
	case 78: //n key is pressed
		if(pMechanics.GameOverFlag){
			document.location.reload();
		}
	case 32: //spacebar is pressed
	
		if(CatchTimeout != null)
			cancelTimeout(CatchTimeout);
		
		if(pProjectiles.length < 3 && pPaddle.paddleType == "fire"){
			var projectile1a = ProjectileObject(pPaddle.x+15, canvas.height-pPaddle.height-50);
			var projectile1b = ProjectileObject(pPaddle.x+pPaddle.width-15, canvas.height-pPaddle.height-50);
			pProjectiles.push(Projectile(projectile1a, projectile1b));
		}

		break;
	}
}

function keyUpHandler(e) {
	
	switch(e.keyCode){
	case 39:
		pMechanics.rightPressed = false;
		break;
	case 37:
		pMechanics.leftPressed = false;
		break;
	case 32:
		pMechanics.start = true;
	}
}

function mouseMoveHandler(e) {
	
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		
		var newPosition = relativeX - pPaddle.width/2;
		pPaddle.VelocityX = (Math.abs(pPaddle.x - newPosition) / 60)+1;
				
		
		pPaddle.x = relativeX - pPaddle.width/2;
	}
}

function WhatSideOfTheBrickDidIHit(brick, ball, r, c){

	let SideOfBrick			= new Object();
	
	slope = Math.abs(ball.dy) / Math.abs(ball.dx);
	if((ball.dx > 0 && ball.dy < 0) || (ball.dx < 0 && ball.dy > 0))
		slope = -slope;

	bOffset = ball.y - (slope*ball.x);

	let xBottomIntersect 	= ((brick.y + pBricks.brickHeight) - bOffset) / slope;
	let xTopIntersect 		= (brick.y - bOffset) / slope;
	let yLeftIntersect 		= (slope * brick.x) + bOffset;
	let yRightIntersect 	= (slope * (brick.x + pBricks.brickWidth)) + bOffset;
			
	if(xTopIntersect < brick.x || xTopIntersect > (brick.x+pBricks.brickWidth))
		xTopIntersect 		= -1;
	if(xBottomIntersect < brick.x || xBottomIntersect > (brick.x+pBricks.brickWidth))
		xBottomIntersect 	= -1;
	if(yLeftIntersect < brick.y || yLeftIntersect > (brick.y + pBricks.brickHeight))
		yLeftIntersect 		= -1;
	if(yRightIntersect < brick.y || yRightIntersect > (brick.y + pBricks.brickHeight))
		yRightIntersect 	= -1;

	
	if(ball.dx < 0 && ball.dy < 0){

		if(xBottomIntersect >= 0){
			if(r+1 < pBricks.bricks.length && pBricks.bricks[r+1][c].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r+1][c], ball, r+1, c);
			}
			else{
				SideOfBrick.Hit 	= "bottom";
				SideOfBrick.xLoc 	= xBottomIntersect;
				SideOfBrick.yLoc 	= brick.y + pBricks.brickHeight;
			}
		}
		else if(yRightIntersect >= 0){
			if(c+1 < pBricks.bricks[r].length && pBricks.bricks[r][c+1].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r][c+1], ball, r, c+1);
			}
			else{
				SideOfBrick.Hit = "right";
				SideOfBrick.xLoc = brick.x+pBricks.brickWidth;
				SideOfBrick.yLoc = yRightIntersect;
			}				
		}
	}
	else if(ball.dx < 0 && ball.dy > 0){

		if(xTopIntersect >= 0){
			if(r-1 >= 0 && pBricks.bricks[r-1][c].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r-1][c], ball, r-1, c);
			}
			else{
				SideOfBrick.Hit = "top";
				SideOfBrick.xLoc = xTopIntersect;
				SideOfBrick.yLoc = brick.y;
			}
		}
		else if(yRightIntersect >= 0){
			if(c+1 < pBricks.bricks[r].length && pBricks.bricks[r][c+1].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r][c+1], ball, r, c+1);
			}
			else{
				SideOfBrick.Hit = "right";
				SideOfBrick.xLoc = brick.x+pBricks.brickWidth;
				SideOfBrick.yLoc = yRightIntersect;
			}				
		}
	}
	else if(ball.dx > 0 && ball.dy < 0){

		if(xBottomIntersect >= 0){
			if(r+1 < pBricks.bricks.length && pBricks.bricks[r+1][c].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r+1][c], ball, r+1, c);
			}
			else{
				SideOfBrick.Hit 	= "bottom";
				SideOfBrick.xLoc 	= xBottomIntersect;
				SideOfBrick.yLoc 	= brick.y + pBricks.brickHeight;
			}
		}
		else if(yLeftIntersect >= 0){
			if(c-1 >= 0 && pBricks.bricks[r][c-1].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r][c-1], ball, r, c-1);
			}
			else{
				SideOfBrick.Hit = "left";
				SideOfBrick.xLoc = brick.x;
				SideOfBrick.yLoc = yLeftIntersect;
			}
		}
	}
	else if(ball.dx > 0 && ball.dy > 0){
		
		if(xTopIntersect >= 0){
			if(r-1 >= 0 && pBricks.bricks[r-1][c].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r-1][c], ball, r-1, c);
			}
			else{
				SideOfBrick.Hit = "top";
				SideOfBrick.xLoc = xTopIntersect;
				SideOfBrick.yLoc = brick.y;
			}
		}
		else if(yLeftIntersect >= 0){
			if(c-1 >= 0 && pBricks.bricks[r][c-1].status == 1){
				SideOfBrick = WhatSideOfTheBrickDidIHit(pBricks.bricks[r][c-1], ball, r, c-1);
			}
			else{
				SideOfBrick.Hit = "left";
				SideOfBrick.xLoc = brick.x;
				SideOfBrick.yLoc = yLeftIntersect;
			}
		}
	}
				
	return SideOfBrick;
}

function collisionDetection() {
	
	for(let r=0; r<pBricks.brickRowCount; r++) {
		for(let c=0; c<pBricks.brickColumnCount; c++) {
			
			let b = pBricks.bricks[r][c];
			if(b.status == 1) {

				for(let i = 0; i<pMechanics.Balls.length; i++){
					
					let ball 		= pMechanics.Balls[i];					
					let startX 		= ball.x;
					let startY 		= ball.y;
					let newX 		= ball.dx+ball.x;
					let newY 		= ball.dy+ball.y;
					let SquashedDX 	= 0;
					let SquashedDY 	= 0;
					let counter 	= 0;
					
					if(Math.abs(ball.dx) > Math.abs(ball.dy)){
						SquashedDX 	= (ball.dx<0)?-1:1;
						SquashedDY 	= Math.abs(ball.dy) / Math.abs(ball.dx);
						SquashedDY 	= (ball.dy<0)?-SquashedDY:SquashedDY;
						counter 	= Math.abs(ball.dx);
					}
					else{
						SquashedDY 	= (ball.dy<0)?-1:1;
						SquashedDX 	= Math.abs(ball.dx) / Math.abs(ball.dy);
						SquashedDX 	= (ball.dx<0)?-SquashedDX:SquashedDX;
						counter 	= Math.abs(ball.dy);
					}
						
					//I now increment by 1 until I reach the newX position
					for(let j = 0; j<counter;j++){
						
						startX += SquashedDX;
						startY += SquashedDY;
						
						if( (startX) >= b.x && 
							(startX) <= (b.x+pBricks.brickWidth) && 
							(startY) >= b.y && 
							(startY) <= b.y+pBricks.brickHeight) {
																				
							let SideOfBrick = WhatSideOfTheBrickDidIHit(b, ball, r, c);
													
							if(SideOfBrick.Hit != "miss"){
														
								ball.x = SideOfBrick.xLoc;
								ball.y = SideOfBrick.yLoc;
								if(SideOfBrick.Hit == "top" || SideOfBrick.Hit == "bottom")
									ball.dy = -ball.dy;
								else
									ball.dx = -ball.dx;
																			
								if(ball.dx<0) ball.dx = ball.dx - .05;
								else ball.dx = ball.dx + .05;
							
								if(ball.dy<0) ball.dy = ball.dy - .05;
								else 	ball.dy = ball.dy + .05;
								
								var RandomSound = Math.floor(Math.random() * 2);
								if(b.type == 0 || b.type == 2){
									
									if(RandomSound == 0)
										pSounds.collision1Sound.play();
									else
										pSounds.collision2Sound.play();

									b.HitPoints = b.HitPoints-1;
									if(b.HitPoints <= 0){
										
										pMechanics.score += b.score;
										b.status = 0;
									}

									if(b.type == 2){
										b.spriteObj.x = b.x;
										b.spriteObj.y = b.y;
										b.spriteObj.RenderPowerUp = true;
									}
								}
								else if(b.type == 1){
									b.HitPoints = b.HitPoints-1;
									if(b.HitPoints <= 0){
										b.status = 0;
										pMechanics.score += b.score;
										if(RandomSound == 0)
											pSounds.collision1Sound.play();
										else
											pSounds.collision2Sound.play();
									}
									else{
										pSounds.twobrickCollision.play();
									}
									
								}
								else if(b.type == 3){
									pSounds.InvincibleHit.play();
								}
							
								ball.x = startX;
								ball.y = startY;
								break;
							}
						}
					}
				}
			}
		}
	}
}

function drawBall() {
	
	ctx.beginPath();
	
	for(let i=0; i<pMechanics.Balls.length; i++){
		
		if(pMechanics.start){
			ctx.arc(pMechanics.Balls[i].x, pMechanics.Balls[i].y, pMechanics.Balls[i].ballRadius, 0, Math.PI*2);
		}
		else{
			ctx.arc(pPaddle.x + (pPaddle.width/2), pMechanics.Balls[i].y, pMechanics.Balls[i].ballRadius, 0, Math.PI*2);
			pMechanics.Balls[i].x = pPaddle.x + (pPaddle.width/2);
		}
	
		ctx.fillStyle 	= "#0095DD";
		//ctx.shadowBlur 	= 5;
		//ctx.shadowColor = "black";
		var my_gradient	= ctx.createRadialGradient(pMechanics.Balls[i].x, pMechanics.Balls[i].y, 2, pMechanics.Balls[i].x+pMechanics.Balls[i].ballRadius, pMechanics.Balls[i].y+pMechanics.Balls[i].ballRadius, pMechanics.Balls[i].ballRadius+21);
		my_gradient.addColorStop(0, "white");
		//my_gradient.addColorStop(1, "#080F3A");
		ctx.fillStyle	= my_gradient;
		ctx.fill();
		ctx.closePath();
	}
}


function drawPaddle() {

	ctx.beginPath();
	if(pPaddle.x < 20)
		pPaddle.x = 20;
	if(pPaddle.x > canvas.width-pPaddle.width-16)
		pPaddle.x = canvas.width-pPaddle.width-16;
	
	if(pPaddle.paddleType == "break" && pPaddle.x > canvas.width-pPaddle.width-16){
	
		CurrentLevel++;
		bricksToRender 		= [];
		pBricks 			= InitializeBricks(pBricks);
		pMechanics 			= Mechanics();
		pPaddle.x 			= (canvas.width-pPaddle.width)/2;
		pMechanics.miss 	= false;
		pMechanics.start 	= false;
		pSounds.LevelStart.play();
		pProjectiles = [];
		breakFlag = false;
		pPaddle.paddleType	= "normal";
		return;
	}
	
	ctx.drawImage(pPaddle.sprite, pPaddle.x, canvas.height-pPaddle.height-50, pPaddle.width, pPaddle.height);
	ctx.save();
	ctx.shadowBlur 	= 20;
	ctx.shadowColor = "black";
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}


function InitializeBricks(pBricks){

	bricksToRender	= new Array();
	var Level 		= eval("Level"+CurrentLevel);

	pBricks.bricks = new Array(pBricks.brickRowCount);
	for(var r=0; r<pBricks.brickRowCount; r++) {
		pBricks.bricks[r] = new Array(pBricks.brickColumnCount);
		for(var c=0; c<pBricks.brickColumnCount; c++) {
			
			pBricks.bricks[r][c] = BrickType();
		}
	}
		
	for(let r=0; r<pBricks.brickRowCount; r++) {
		
		for(let c=0; c<pBricks.brickColumnCount; c++) {
			
			if(Level[r][c] == "0"){
				pBricks.bricks[r][c].status = 0;
			}
			else{

				var color = Level[r][c];
				switch(color){
					case "2":
						pBricks.bricks[r][c].brickColor = pSprites.TwoHitBricks;
						pBricks.bricks[r][c].HitPoints = 2;
						pBricks.bricks[r][c].type = 1;
						pBricks.bricks[r][c].score = CurrentLevel*50;
						break;
					case "r":
						pBricks.bricks[r][c].brickColor = pSprites.RedBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 90;
						break;
					case "y":
						pBricks.bricks[r][c].brickColor = pSprites.YellowBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 120;
						break;
					case "b":
						pBricks.bricks[r][c].brickColor = pSprites.BlueBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 100;
						break;
					case "v":
						pBricks.bricks[r][c].brickColor = pSprites.VioletBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 110;
						break;
					case "g":
						pBricks.bricks[r][c].brickColor = pSprites.GreenBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 80;
						break;
					case "o":
						pBricks.bricks[r][c].brickColor = pSprites.OrangeBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 60;
						break;
					case "t":
						pBricks.bricks[r][c].brickColor = pSprites.TealBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 70;
						break;
					case "w":
						pBricks.bricks[r][c].brickColor = pSprites.WhiteBrick;
						pBricks.bricks[r][c].HitPoints = 1;
						pBricks.bricks[r][c].type = 0;
						pBricks.bricks[r][c].score = 50;
						break;
					case "i":
						pBricks.bricks[r][c].brickColor = pSprites.InvincibleBlock;
						pBricks.bricks[r][c].HitPoints = 99999;
						pBricks.bricks[r][c].type = 3;
						break;
				}
				
				var value = Math.floor(Math.random() * 100)+1
				if(value <= 10){
					if(pBricks.bricks[r][c].type != 3){
						pBricks.bricks[r][c].type = 2;
					
						var BonusSprite = null;
						var SpriteType = 0;
						
						switch(color){
						case "2":
							BonusSprite = pSprites.ExtraLife;
							SpriteType = "life";
							break;
						case "r":
							BonusSprite = pSprites.LaserUpgrade;
							SpriteType = "laser";
							break;
						case "y":
							break;
						case "b":
							BonusSprite = pSprites.ExpandUpgrade;
							SpriteType = "expand";
							break;
						case "v":
							if(value<3){
								BonusSprite = pSprites.BreakUpgrade;
								SpriteType = "break";
							}
							else{
								BonusSprite = pSprites.RigidFriction;
								SpriteType = "rigidFriction";							
							}
							break;
						case "g":
							BonusSprite = pSprites.CatchUpgrade;
							SpriteType = "catch";
							break;
						case "o":
							BonusSprite = pSprites.SlowUpgrade;
							SpriteType = "slow";
							break;
						case "t":
							BonusSprite = pSprites.DisruptionUpgrade;
							SpriteType = "disruption";
							break;
						case "w":
							BonusSprite = pSprites.IceFriction;
							SpriteType = "iceFriction";
							break;
						}
					
					
						pBricks.bricks[r][c].spriteObj = sprite({
							context: canvas.getContext("2d"),
							width: 352,
							height: 22,
							image: BonusSprite,
							numberOfFrames: 8,
							ticksPerFrame: 6,
							loop: true,
							RenderPowerUp: false,
							x: 0,
							y: 0,
							pSpriteType: SpriteType
						});
						pBricks.bricks[r][c].spriteObj.numberOfFrames = 8;
						pBricks.bricks[r][c].spriteObj.ticksPerFrame = 6;
						pBricks.bricks[r][c].spriteObj.RenderPowerUp = false;
						pBricks.bricks[r][c].spriteObj.x = 0;
						pBricks.bricks[r][c].spriteObj.y = 0;
						pBricks.bricks[r][c].spriteObj.pSpriteType = SpriteType;
						pBricks.bricks[r][c].spriteObj.BonusGrabbed = false;
					
						bricksToRender.push(pBricks.bricks[r][c].spriteObj);
					}
				}
			}
		}
	}
	
	return pBricks;
	
}

function CreateEnemy(x, y){
	let enemySprite = null;
	
	switch(CurrentLevel-1%4){
		case 0: enemySprite = pSprites.enemy1; break;
		case 1: enemySprite = pSprites.enemy2; break;
		case 2: enemySprite = pSprites.enemy3; break;
		case 3: enemySprite = pSprites.enemy4; break;
	}
	
	let spriteObj = sprite({
		context: canvas.getContext("2d"),
		width: 220,
		height: 220,
		image: enemySprite,
		numberOfFramesLong: 5,
		numberOfFramesHigh: 5,
		ticksPerFrame: 8,
		loop: true,
		RenderPowerUp: false,
		x: x,
		y: y,
		pSpriteType: null
	});

	spriteObj.numberOfFramesLong = 5;
	spriteObj.numberOfFramesHigh = 5;
	spriteObj.ticksPerFrame = 5;
	spriteObj.RenderPowerUp = false;
	spriteObj.x = x;
	spriteObj.y = y;

	enemiesToRender.push(spriteObj);
	return enemiesToRender[enemiesToRender.length-1];
}

function drawBricks(pBricks) {

	BricksPresent = false;

	for(let r=0; r<pBricks.brickRowCount; r++) {
		for(let c=0; c<pBricks.brickColumnCount; c++) {
		
			let b 		= pBricks.bricks[r][c];
			b.x 		= (c*(pBricks.brickWidth+pBricks.brickPadding))+pBricks.brickOffsetLeft;
			b.y 		= (r*(pBricks.brickHeight+pBricks.brickPadding))+pBricks.brickOffsetTop;
			b.row 		= r;
			b.column 	= c;
			
			if(b.brickColor != null &&
				b.status == 1){
				
				//If there are invincible blocks they do not count towards bricks that
				//must be destroyed before the level is over. 
				
				if(b.type != 3)
					BricksPresent = true;
				
				//Draw the brick image
				ctx.beginPath();	
				ctx.drawImage(b.brickColor, 
								b.x, 
								b.y, 
								pBricks.brickWidth, pBricks.brickHeight);
				ctx.closePath();
			}
		}
	}

	if(BricksPresent == false){

		CurrentLevel++;
		
		bricksToRender 		= [];
		pBricks 			= InitializeBricks(pBricks);
		pMechanics 			= Mechanics();
		pPaddle.x 			= (canvas.width-pPaddle.width)/2;
		pMechanics.miss 	= false;
		pMechanics.start 	= false;
		pProjectiles 		= [];
		breakFlag 			= false;
		pPaddle.paddleType	= "normal";
		pSounds.LevelStart.play();
		return;
	}
}

function drawBackgroundImage(){
	
	var myCanvasStyle 	= document.getElementById("myCanvas").style;
	var LevelBackground = eval("Level"+CurrentLevel+"Background");
	myCanvasStyle.background = "url('cornerwallleft.png') top 0px left no-repeat, \
								url('cornerwallright.png') top 0px right no-repeat, \
								url('gamewalls.png') top 7px left no-repeat,\
								url('gamewalls.png') top 7px right no-repeat, \
								url('topwall.png') top 0px center no-repeat, \
								url('"+LevelBackground+"') top repeat";
								
	
	var myCanvasStyle 	= document.getElementById("myCanvasScore").style;
	myCanvasStyle.background = "#000000";

}

function drawScore() {
	
	ctxScore.beginPath();
	ctxScore.font = "24px 'Orbitron'";
	ctxScore.fillStyle 	= "#ff0000";
	ctxScore.fillText("Score: "+pMechanics.score, 20, 30);
	ctxScore.closePath();	
}

function precise(x) {
  return Number.parseFloat(x).toPrecision(3);
}

function drawLives() {
	
	ctxScore.beginPath();
	ctxScore.font = "24px 'Orbitron'";
	ctxScore.fillStyle 	= "#ff0000";
	ctxScore.fillText("Lives: "+pMechanics.lives, canvas.width-125, 30);
	ctxScore.closePath();	
}

function Restart(){
	pMechanics.start = true;
}

function CollisionWithPaddle(){

	var ThereIsABallOnScreen = false;
	
	for(let i = 0; i<pMechanics.Balls.length; i++){
	
		if(pMechanics.Balls[i].OnScreen)
			ThereIsABallOnScreen = true;
		
		if(pMechanics.start){
			
			if(!pMechanics.Balls[i].missed){
			
				if( (pMechanics.Balls[i].x + pMechanics.Balls[i].dx) > canvas.width-pMechanics.Balls[i].ballRadius-16 || 
					(pMechanics.Balls[i].x + pMechanics.Balls[i].dx) < pMechanics.Balls[i].ballRadius+16) {
					pMechanics.Balls[i].dx = -pMechanics.Balls[i].dx;
				}
				if(pMechanics.Balls[i].y + pMechanics.Balls[i].dy < pMechanics.Balls[i].ballRadius) {
					pMechanics.Balls[i].dy = -pMechanics.Balls[i].dy;
				}
				else if(pMechanics.Balls[i].y + pMechanics.Balls[i].dy > canvas.height-pMechanics.Balls[i].ballRadius-pPaddle.height-40) {
					
					var paddleY = pPaddle.x + pPaddle.width;
					if(pMechanics.Balls[i].x >= pPaddle.x && pMechanics.Balls[i].x <= paddleY && !pMechanics.miss) {

						if(pPaddle.paddleType == "catch"){
							pMechanics.start = false;
							CatchTimeout = setTimeout(Restart, 3000);
							
							if(pMechanics.Balls[i].dx < 0)
								pMechanics.Balls[i].dx = -pMechanics.Balls[i].dx;
							
							pMechanics.Balls[i].dy = -pMechanics.Balls[i].dy;
						}
						else{
							var locationHit = pMechanics.Balls[i].x - pPaddle.x;
							var percentValue = (locationHit / pPaddle.width) * 100;													
							var anglel = 15.0;
							var angleh = 165.0;
							var angle = (((percentValue - 0) / (100 - 0)) * (angleh-anglel)) + anglel;
							if(angle == 90) {angle = 89;}
							
							var ballAngle = angle * (3.141517 / 180)
							
							var xAngle = pPaddle.VelocityX * Math.abs(Math.cos(ballAngle));
							var yAngle = pPaddle.VelocityX * Math.abs(Math.sin(ballAngle));
							
							var NewSlope = (yAngle/xAngle);							
							var DistanceInOneTick = Math.sqrt(Math.pow(pMechanics.Balls[i].dy, 2) + Math.pow(pMechanics.Balls[i].dx, 2));
							pMechanics.Balls[i].dx = Math.sqrt(Math.pow(DistanceInOneTick,2) / (1+Math.pow(NewSlope, 2)));
							pMechanics.Balls[i].dy = NewSlope * pMechanics.Balls[i].dx;
							
							var massFactor = pPaddle.mass / pMechanics.Balls[i].mass;
							var angularFactor = .3;
							pMechanics.Balls[i].spin += angularFactor * pPaddle.VelocityX * massFactor * .5;
							
							if(percentValue>=0 &&  percentValue<=50){
							
								if(pMechanics.Balls[i].dx > 0)
									pMechanics.Balls[i].dx = -pMechanics.Balls[i].dx;
																	
								pMechanics.Balls[i].dy = -pMechanics.Balls[i].dy;
							}
							else if(percentValue>=50 &&  percentValue<=100){
																
								if(pMechanics.Balls[i].dx < 0){
									pMechanics.Balls[i].dx = -pMechanics.Balls[i].dx;
								}
								
								pMechanics.Balls[i].dy = -pMechanics.Balls[i].dy;
							}
							else
								pMechanics.Balls[i].dy = -pMechanics.Balls[i].dy;
						}							
					}
					else {
						if(pMechanics.Balls[i].y >= canvas.height-pPaddle.height-50){
							
							pMechanics.Balls[i].missed  = true;
						}
					}
				}

				if(pMechanics.rightPressed && pPaddle.x < canvas.width-pPaddle.width) {
					pPaddle.x += 7;
				}
				else if(pMechanics.leftPressed && pPaddle.x > 0) {
					pPaddle.x -= 7;
				}
			}

			if(pMechanics.Balls[i].y > canvas.height){
				pMechanics.Balls[i].OnScreen = false;
			}
			else{
				pMechanics.Balls[i].x += pMechanics.Balls[i].dx;
				pMechanics.Balls[i].y += pMechanics.Balls[i].dy;
			}
		}
	}
	return ThereIsABallOnScreen;
}

function IsBallOnScreen(ThereIsABallOnScreen){

	if(!ThereIsABallOnScreen){
		
		miss = true;
		LifeLost();
		if(pMechanics.lives<=0) {
			
			pSounds.GameOver.play();
			
			ctx.shadowBlur 			= 5;
			ctx.shadowColor 		= "black";
			ctx.font 				= "bold 48px 'Orbitron'";
			ctx.fillStyle 			= "#ff0000";
			ctx.fillText("GAME OVER", (canvas.width-300)/2, (canvas.height-20)/2);

			ctx.font 				= "24px 'Orbitron'";
			ctx.fillStyle 			= "#ffffff";
			ctx.fillText("Press the 'n' key for a new game", (canvas.width-400)/2, (canvas.height+40)/2);
			
			pMechanics.start 		= false;
			pMechanics.GameOverFlag	= true;
			cancelAnimationFrame(GameID);
			GameID 					= null;
			return;
		}
		else{
		
			pSounds.LevelStart.play();
			var Lives 			= pMechanics.lives;
			var Score 			= pMechanics.score;
			pMechanics 			= Mechanics();
			pMechanics.score 	= Score;
			pMechanics.lives 	= Lives;
			pPaddle 			= PaddleObject();
			pMechanics.miss 	= false;
			pMechanics.start 	= false;
			pPaddle.paddleType	= "normal";
		}
	}
}

function draw() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctxScore.clearRect(0, 0, canvas.width, canvas.height);
	
	drawBackgroundImage();
	drawScore();
	drawLives();

	drawBricks(pBricks);		
	drawPaddle();
	drawBall();
	
	collisionDetection();
	
	DrawFiringProjectile();
	ThereIsABallOnScreen = CollisionWithPaddle();
	IsBallOnScreen(ThereIsABallOnScreen);
	
	spriteLoop();
	//RenderEnemies();
		
	if(GameID)
		requestAnimationFrame(draw);
	
	CounterRefresh++;
	
	if(CounterRefresh>1800){
		if(enemiesToRender.length < 2){
			let enemy = CreateEnemy(40, 20);
			enemy.RenderPowerUp = true;
		}
	}
	else if(!(CounterRefresh%900)){ //after 15 seconds show enemy
		if(enemiesToRender.length < 2){
			let enemy = CreateEnemy(40, 20);
			enemy.RenderPowerUp = true;
		}
	}
}

function GetPixelRatio(CanvasElement){
	
    var ctx = document.getElementById(CanvasElement).getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
}

function CreateHIDPICanvas(CanvasElement, w, h, ratio){
	
	if (!ratio) { ratio = GetPixelRatio(CanvasElement); }
	
	var can = document.getElementById(CanvasElement);
	can.width = w * ratio;
	can.height = h * ratio;
	can.style.width = w + "px";
	can.style.height = h + "px";
	can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
	return can	
}


var requestAnimationFrame 	= 	window.requestAnimationFrame || 
								window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || 
								window.msRequestAnimationFrame;

var cancelAnimationFrame 	= 	window.cancelAnimationFrame || 
								window.mozCancelAnimationFrame;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var BricksLeft				= 0;
var canvas 					= document.getElementById("myCanvas");
var canvasScore				= document.getElementById("myCanvasScore");
//canvasScore 				= CreateHIDPICanvas("myCanvasScore", 604, 50);
var ctx 					= canvas.getContext("2d");
var ctxScore				= canvasScore.getContext("2d");
var pMechanics 				= Mechanics();
var pSounds					= Sounds();
var pSprites 				= Sprites();
var pPaddle 				= PaddleObject();
var pBricks 				= Bricks();
var pProjectiles			= [];					
var bricksToRender 			= [];
var enemiesToRender			= [];
var GameID					= null;
var CurrentLevel			= 1;
var breakFlag				= false;
var CatchTimeout			= null;
var CounterRefresh			= 0;

pBricks = InitializeBricks(pBricks);

drawBackgroundImage();
//pSounds.LevelStart.play();

GameID = requestAnimationFrame(draw);