let gameBoard = document.querySelector('.gameBoard');
let messageTurn = document.querySelector('.gameTurn');
let endGame = document.querySelector('.endgame');
let endGameResult = document.querySelector('.endGameResult');
let endGameButton = document.querySelector('.endGameButton');

let turnX = true;
let turn = 0;
let maxTurns = 9;
let players = {
    x: 'cross',
    o: 'circle'
}

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

startGame();

function startGame() {
    createBoardGame();
    messageTurn.textContent = turnX ? "X" : "O";
    turnX = true;
    turn = 0;
    endGame.classList.remove('show');
}

function createBoardGame() {
    const cells = 9;
    while (gameBoard.firstElementChild) {
        gameBoard.firstElementChild.remove();
    }

    for (let i = 0; i < cells; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.addEventListener('click', handleGame, { once: true });
        gameBoard.append(div);

    }
}

function handleGame(e) {
    const currentCell = e.currentTarget;
    const currentTurn = turnX ? players.x : players.o;
    turn++;
    drawShape(currentCell, currentTurn);
    if (checkWinner(currentTurn)) {
        return;
    }

    if (turn === maxTurns) {
        checkWinner(false);
    }

    changeTurn();
}

function drawShape(element, newClass) {
    element.classList.add(newClass);
}

function changeTurn() {
    turnX = !turnX;
    messageTurn.textContent = turnX ? "X" : "O";

}

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll('.cell');

    const winner = winningCombinations.some(array => {
        return array.every(position => {
            return cells[position].classList.contains(currentPlayer);
        });
    });
    if (!winner) {
        return false;
    }
    showEndGame(winner);
    return true;
}

function showEndGame(winner) {
    endGame.classList.add('show');
    if (winner) {
        endGameResult.textContent = `¡${turnX ? "X" : "O"} ha ganado!`;
    } else {
        endGameResult.textContent = `¡Has empatado!`;
    }

}

endGameButton.addEventListener('click', startGame);