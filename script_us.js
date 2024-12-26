
// Function to create a 2D array of coordinate positions
function createArray(N) {
   // Initialize an empty array
   array=[];
   // Nested loops to populate the array with coordinate objects
   for (let i = 1; i < N+1; i++) {
       for (let j = 1; j < N+1; j++) {
           // Create an object to hold the x and y coordinates
           let pos = {x: i, y: j};
           // Add the coordinate object to the array
           array.push(pos);
       }
   }
   // Return the populated array of positions
   return array;
}


// Function to shuffle elements in the given array
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       // Generate a random index based on the current index
       const j = Math.floor(Math.random() * (i + 1));
       // Swap the elements at indices i and j
       [array[i], array[j]] = [array[j], array[i]];
   }
   // Return the shuffled array
   return array;
}

// Function to draw colored balls on a canvas
function drawColoredBalls(canvas, counts, colors, vacuum) {
    // Get the canvas element and its drawing context

    const ctx = canvas.getContext('2d');
    const bw = 20; // border width for the canvas

    // Set canvas size
    const canvasSize = 600;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Calculate the total number of balls
    ballsum = counts.reduce(function(a, b) { return a + b; }, 0);

    // Draw the background rectangle
    ctx.beginPath();
    ctx.strokeStyle = "black 100px";
    ctx.fillStyle = "#C8C9C7";
    ctx.roundRect(bw, bw, canvasSize-2*bw, canvasSize-2*bw, bw/2);
    ctx.fill();
    ctx.stroke();

    // Array to store ball positions
    let balls = [];

    // Calculate grid size and cell width including vacuum spacing
    const ballSqc = Math.ceil(Math.sqrt(ballsum));
    const cW = (canvasSize-2*bw) / (ballSqc+vacuum);

    // Generate and shuffle grid positions
    var positions = shuffleArray(createArray(ballSqc+vacuum));

    // Calculate the radius of each ball
    const radius = canvasSize / (Math.sqrt(3*4) * (ballSqc+vacuum));

    // Safe distance to avoid ball overlap
    const safeDistance = radius * 2.2;

    // Generate balls data based on the counts and colors
    let j=0;
    counts.forEach((count, index) => {
        for (let i = 0; i < count; i++) {
            j++;
            let position = {
                x: bw+cW/2 + (positions[j-1].x - 1)*cW,
                y: bw+cW/2 + (positions[j-1].y - 1)*cW,
                color: colors[index]
            };
            balls.push(position);
        }
    });

    // Draw each ball on the canvas
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = ball.color;
        ctx.strokeStyle='black 10px;';
        ctx.fill();
        ctx.stroke();
    });
}

const canvas1 = document.getElementById('ballCanvas');


function updateDrawing() {
    const slider1 = document.getElementById('slider1').value;
    const slider2 = document.getElementById('slider2').value;
    const slider3 = document.getElementById('slider3').value;

	const blueBall = Math.round(parseInt(slider1)*parseInt(slider2)/100);
	const redBall =  Math.round( parseInt(slider1)*(1-parseInt(slider2)/100)*parseInt(slider3)/100 );
	const yellBall = parseInt(slider1)- blueBall - redBall;

    const outputList = [blueBall, redBall, yellBall];
  

    drawColoredBalls(canvas1, outputList, ['#034DFC', '#FF5032', '#FFD800'], 1);
}

window.onload = updateDrawing;




