let X_CLASS = 'x';
let CIRCLE_CLASS = 'circle';
const displayTurns = document.getElementById('game-turns');
const drawGameAudio = new Audio("audio/draw-audio.wav");
const endGameAudio = new Audio("audio/game-start.wav");
const circleAudio = new Audio("audio/circle-audio.wav");
const xAudio = new Audio("audio/x-audio.wav");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellEl = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageBox = document.getElementById('winning-Message');
const winnigMessageText = document.getElementById('winningMessageText');
const restartBnt = document.getElementById('restartButton');
let circleTurn;

startGame();
restartBnt.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellEl.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', cellClick);
        cell.addEventListener('click', cellClick, {once: true});
        displayTurns.innerText = `X's turn now`;
        
    });
    
    winningMessageBox.classList.remove('show');
    setBoardHover();
}

function cellClick(e) {
    const cell = e.target;
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWins(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
        drawGameAudio.play();
    } else {
        swapTurns();
        setBoardHover();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    if(circleTurn) {
        circleAudio.play();
        displayTurns.innerText = `X's turn now`;
    } else {
        xAudio.play();
        displayTurns.innerText = `O's turn now`
    }
};

function swapTurns() {
    circleTurn = !circleTurn;
    
};

function setBoardHover() {   
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);

    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
};

function checkWins(currentClass) {
    return winningCombinations.some(winner => {
        return winner.every(index => {
            return cellEl[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw) {
    displayTurns.innerText = 'Game Over!';
    if(draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
        endGameAudio.play();
    }
    winningMessageBox.classList.add('show');
}

function isDraw() {
    return [...cellEl].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    
    })
}