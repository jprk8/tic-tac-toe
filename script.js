// Create Gameboard inside IIFE (only one instance of board)
const Gameboard = (function() {
    // tic-tac-toe: make 3x3 matrix
    const board = [];
    // gameboard is full when cellCount reaches 0
    let cellCount = 9;
    let gameOver = false;
    // set active player as private variable of gameboard
    let player1, player2, active;
    // initialize content of array / use it to reset board
    const init = (p1, p2) => {
        cellCount = 9;
        gameOver = false;
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push('');
            }
        }
        player1 = p1;
        player2 = p2;
        active = player1;
        printBoard();
    }

    const switchTurn = () => {
        if (active == player1) {
            active = player2;
        } else {
            active = player1;
        }
    }

    // print (refresh) screen with the current content of the board
    // use it to start game
    // buttons will mark itself with the active player's shape
    // then switch turns for next player

    const printBoard = () => {
        if (!gameOver) {
            console.log(`${active.name}'s TURN (${active.shape})`);
            const status = document.querySelector('.game-status');
            status.textContent = `${active.name}'s TURN (${active.shape})`;
        }
        // remove current grid to refresh
        const main = document.querySelector('.main');
        const currentContainer = document.querySelector('.board-container');
        main.removeChild(currentContainer);
        const newContainer = document.createElement('div');
        newContainer.classList.add('board-container');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellBtn = document.createElement('button');
                cellBtn.classList.add('cell');
                cellBtn.textContent = board[i][j];
                cellBtn.addEventListener('click', () => {
                    if (!gameOver) {
                        if (markCell(i, j, active.shape)) {
                            switchTurn();
                            printBoard();
                        }
                    }
                });
                newContainer.appendChild(cellBtn);
            }
        }
        main.appendChild(newContainer);
    }

    // markCell function sets gameover to true
    const markCell = (row, column, shape) => {
        // return false if a cell is already occupied
        if (board[row][column] === '') {
            board[row][column] = shape;
            cellCount--;
        } else {
            return false;
        }

        // return false if game over
        if (checkWin(active)) {
            console.log(`${active.name} (${active.shape}) WINS!`);
            const status = document.querySelector('.game-status');
            status.textContent = `${active.name} (${active.shape}) WINS!`;
            gameOver = true;
            printBoard();
            return false;
        }
        // check if gameboard is full
        if (cellCount == 0) {
            console.log('Game Over');
            const status = document.querySelector('.game-status');
            status.textContent = 'GAME OVER - DRAW!'
            gameOver = true;
            printBoard();
            return false;
        }
        return true;
    }

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
        printBoard,
        checkWin,
        getCellCount,
        markCell,
    }
})();

function Player(name) {
    this.name = name;
}

Player.prototype.setShape = function(shape) {
    this.shape = shape;
}

// use tictactoe module to start the game
const tictactoe = function() {
    const p1 = new Player('Player 1');
    const p2 = new Player('Player 2');
    p1.setShape('O');
    p2.setShape('X');

    console.log(p1);
    console.log(p2);

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', () => {
        Gameboard.init(p1, p2);
    })

    Gameboard.init(p1, p2);

}

tictactoe();