const canvas = document.getElementById('grid');
const ctx = canvas.getContext('2d');
const gridSize = 50; // reduced grid size
let direction = 'up'; // initial direction is up
let x = 0, y = 0; // initial position
const initialX = canvas.width / 2;
const initialY = canvas.height / 2;

function drawGrid() {
    for (let i = 0; i < canvas.width; i += gridSize) {
        for (let j = 0; j < canvas.height; j += gridSize) {
            ctx.strokeStyle = '#ddd';
            ctx.strokeRect(i, j, gridSize, gridSize);
        }
    }
}

function drawPosition(x, y, color) {
    const screenX = initialX + x * gridSize;
    const screenY = initialY - y * gridSize;
    ctx.fillStyle = color;
    ctx.fillRect(screenX, screenY, gridSize, gridSize);
}

function executeCommands() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    const commands = document.getElementById('commands').value;
    x = 0;
    y = 0;
    direction = 'up';
    let path = [[x, y]]; // to store the path

    for (let command of commands) {
        if (command === 'L') {
            turnLeft();
        } else if (command === 'R') {
            turnRight();
        } else if (command === 'W') {
            moveForward();
            path.push([x, y]); // add new position to the path
        }
    }

    // Draw the path
    for (let i = 0; i < path.length - 1; i++) {
        drawPosition(path[i][0], path[i][1], 'gray');
    }

    drawPosition(0, 0, 'green'); // starting point
    drawPosition(x, y, 'red'); // ending point

    document.getElementById('current-x').textContent = x;
    document.getElementById('current-y').textContent = y;
}

function turnLeft() {
    if (direction === 'up') direction = 'left';
    else if (direction === 'left') direction = 'down';
    else if (direction === 'down') direction = 'right';
    else if (direction === 'right') direction = 'up';
}

function turnRight() {
    if (direction === 'up') direction = 'right';
    else if (direction === 'right') direction = 'down';
    else if (direction === 'down') direction = 'left';
    else if (direction === 'left') direction = 'up';
}

function moveForward() {
    if (direction === 'up') y += 1;
    else if (direction === 'down') y -= 1;
    else if (direction === 'left') x -= 1;
    else if (direction === 'right') x += 1;
}

window.onload = () => {
    drawGrid();
    drawPosition(0, 0, 'green');
};