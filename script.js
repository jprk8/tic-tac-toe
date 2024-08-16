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
            const status = document.querySelector('.game-status');
            status.textContent = `${active.name} (${active.shape}) WINS!`;
            gameOver = true;
            printBoard();
            return false;
        }
        // check if gameboard is full
        if (cellCount == 0) {
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

Player.prototype.setName = function(name) {
    this.name = name;
}

// use tictactoe module to start the game
const tictactoe = function() {
    const p1 = new Player('Player 1');
    const p2 = new Player('Player 2');
    p1.setShape('X');
    p2.setShape('O');

    const p1DisplayName = document.querySelector('.p1-name');
    p1DisplayName.textContent = p1.name;
    const p2DisplayName = document.querySelector('.p2-name');
    p2DisplayName.textContent = p2.name;

    const p1Btn = document.querySelector('.p1-change-btn');
    const p2Btn = document.querySelector('.p2-change-btn');

    p1Btn.addEventListener('click', (event) => {
        event.preventDefault();
        const p1Name = document.getElementById('p1-new-name');
        p1.setName(p1Name.value);
        p1DisplayName.textContent = p1Name.value;
        Gameboard.printBoard();
    });

    p2Btn.addEventListener('click', (event) => {
        event.preventDefault();
        const p2Name = document.getElementById('p2-new-name');
        p2.setName(p2Name.value);
        p2DisplayName.textContent = p2Name.value;
        Gameboard.printBoard();
    });

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', () => {
        tictactoe();
    })

    Gameboard.init(p1, p2);

}

tictactoe();