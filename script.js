let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
// let musicSound = new Audio('music.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };




function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if u bump into your seif 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if u bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }


}

function gameEngine() {
    // part 1 updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("PLAY AGAIN !");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //mmoving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2 display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        sankeElement = document.createElement('div'); // new div
        sankeElement.style.gridRowStart = e.y; //adding css
        sankeElement.style.gridColumnStart = e.x; // column number pr leke jane ke liye 
        if (index === 0) {
            sankeElement.classList.add('head');

        } else {
            sankeElement.classList.add('snake');

        }
        board.appendChild(sankeElement);

    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; //adding css
    foodElement.style.gridColumnStart = food.x; // column number pr leke jane ke liye 
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}













let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {

}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
});