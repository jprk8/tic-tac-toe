// Create Gameboard inside IIFE (only one instance of board)
const Gameboard = (function() {
    // tic-tac-toe: make 3x3 matrix
    const board = [];
    // gameboard is full when cellCount reaches 0
    let cellCount = 9;
    let gameover = false;
    // set active player as private variable of gameboard
    let player1, player2, active;
    // initialize content of array / use it to reset board
    const init = (p1, p2) => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push('');
            }
        }
        player1 = p1;
        player2 = p2;
        active = player1;
    }

    const switchTurn = () => {
        if (active == player1) {
            active = player2;
        } else {
            active = player1;
        }
    }

    // print (refresh) screen with the current content of the board
    // use it to initialize game
    // make buttons that return their positions
    // pass in the position to another function to mark the cell

    // try separating printBoard and playTurn
    const printBoard = () => {
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
                    if (!gameover) {
                        if (markCell(i, j, active.shape)) {
                            switchTurn();
                            printBoard();
                        }
                    }
                });
                newContainer.appendChild(cellBtn);
            }
        }
        body.appendChild(newContainer);
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
            console.log(`${active.name} is the winner!`);
            gameover = true;
            printBoard();
            return false;
        }
        // check if gameboard is full
        if (cellCount == 0) {
            console.log('Game Over');
            gameover = true;
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
const tictactoe = (function() {
    const p1 = new Player('Player1');
    const p2 = new Player('Player2');
    p1.setShape('O');
    p2.setShape('X');

    console.log(p1);
    console.log(p2);

    Gameboard.init(p1, p2);
    Gameboard.printBoard();


})();

tictactoe;