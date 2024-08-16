// Create Gameboard inside IIFE (only one instance of board)
const Gameboard = (function() {
    // tic-tac-toe: make 3x3 matrix
    const board = [];
    // initialize content of array / use it to reset board
    const init = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push('');
            }
        }
    }

    // gameboard is full when cellCount reaches 0
    let cellCount = 9;

    // print (refresh) screen with the current content of the board
    // make buttons with event listener for the active player
    // use it to initialize game
    const printBoard = (Player) => {
        console.table(board);
        // remove current grid
        const body = document.querySelector('body');
        const currentContainer = document.querySelector('.board-container');
        body.removeChild(currentContainer);
        const newContainer = document.createElement('div');
        newContainer.classList.add('board-container');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellBtn = document.createElement('button');
                cellBtn.classList.add('cell');
                cellBtn.textContent = board[i][j];
                cellBtn.addEventListener('click', () => {
                    playTurn(i, j, Player);
                });
                newContainer.appendChild(cellBtn);
            }
        }
        body.appendChild(newContainer);
    }

    const playTurn = (row, column, Player) => {
        // return false if a cell is already occupied
        const mark = Player.shape;
        if (board[row][column] === '') {
            board[row][column] = mark;
            cellCount--;
        } else {
            return false;
        }

        printBoard(Player);

        // check for Game Over
        // check if there is a winner
        if (checkWin(Player)) {
            console.log(`${Player.name} is the winner!`);
        } else {
            console.log('no winner');
        }

        // check if gameboard is full
        if (cellCount == 0) {
            console.log('Game Over');
        }

    };

    const getBoard = () => board;
    const getCellCount = () => cellCount;

    const checkWin = (Player) => {
        const mark = Player.shape;
        // check row
        for (let i = 0; i < 3; i++) {
            if (mark === board[i][0] && mark === board[i][1] && mark === board[i][2]) {
                return true;
            }
        }
        // check column
        for (let j = 0; j <3; j++) {
            if (mark === board[0][j] && mark === board[1][j] && mark === board[2][j]) {
                return true;
            }
        }
        // check diagonal
        if (mark === board[0][0] && mark === board[1][1] && mark === board[2][2]
            || mark === board[2][0] && mark === board[1][1] && mark === board[0][2]) {
                return true;
        }

        return false;
    }

    return {
        init,
        getBoard,
        playTurn,
        printBoard,
        checkWin,
        getCellCount,
    }
})();

function Player(name) {
    this.name = name;
}

Player.prototype.setShape = function(shape) {
    this.shape = shape;
}

function Cell() {

}

const displayController = (function() {

})();

const p1 = new Player('Player1');
const p2 = new Player('Player2');
p1.setShape('O');
p2.setShape('X');

console.log(p1);
console.log(p2);
Gameboard.init();
Gameboard.printBoard(p1);