//Declaring the canvas and drawing variables:
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//Time Variable:
var prevTime = new Date().getTime();
var time = null;
var newTime = null;
//Variables for the circle:
var startX = canvas.width / 3;
var x = startX;
var startDx = 0.3;
var dx = startDx;
var startY = canvas.height - 30;
var y = startY;
var startDy = 0.3;
var dy = -startDy;
var ballRadius = 10;
//Variables for the paddle:
var paddleHeight = 10;
var paddleWidth = 75;
var paddleDx = 3;
var paddleX = (canvas.width - paddleWidth) / 3;
var rightPressed = false;
var leftPressed = false;
//Variables for the bricks:
var brickRowCount = 3;
var brickColumnCount = 10;
var brickWidth = 35;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//Score:
var score = 0;
//Lives:
var lives = 3;

//Creating an array to store the bricks:
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1
		};
	}
}
//Function for drawing the bricks:
function drawBricks() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD"; //Colour Blue
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

//Function for drawing the ball:
function drawBall() {
	ctx.beginPath(); //Starts drawing the circle
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //Defines dimensions of the circle
	ctx.fillStyle = "#0095DD"; //Fill colour (Blue)
	ctx.fill();
	ctx.closePath(); //Stops Drawing the circle
}

//Function for drawing the paddle at the bottom of the screen:
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

//Loop function for drawing all the elements:
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears previous ball from the previous frame
	newTime = new Date().getTime();
	time = newTime - prevTime;
	prevTime = newTime;
	drawBricks();
	drawBall(); //Calls the drawBall(); function to draw the circle
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	if (y + dy < ballRadius) { //Conditional if the ball hits the top/bottom edges of the canvas
		dy = Math.abs(dy);
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--; //Reduce lives variable by 1
			if (!lives) { //if there are no lives left:
				document.location.reload();
			} else {
				x = startX; //Positions the x-coordinate of the ball
				y = startY; //Positions the y-coordinate of the ball
				dx = startDx;
				dy = -startDy;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}
	if (x + dx < ballRadius) { //Conditional if the ball hits the right/left edges of the canvas
		dx = Math.abs(dx);
	} else if (x + dx > canvas.width - ballRadius) {
		dx = -Math.abs(dx);
	}
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += paddleDx;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= paddleDx;
	}
	x += dx * time; //updates the x-position of the circle
	y += dy * time; //updates the y-position of the circle
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}

//Function for collision detection between the ball and the bricks, and increasing the score if the bricks hit, and for checking if all bricks are destroyed:
function collisionDetection() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score == brickRowCount * brickColumnCount) {
						document.location.reload();
					}
				}
			}
		}
	}
}
//Function for drawing the score variable onto the screen:
function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

//Function for drawing the lives variable onto the screen:
function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
//Mouse Controls;
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

//Animate Everything through the draw() function:
setInterval(draw, 0);