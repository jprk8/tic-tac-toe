// Create Gameboard inside IIFE (only one instance of board)
const Gameboard = (function() {
    // Make the board as 2-d array
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(' ');
        }
    }

    const playTurn = (row, column, Player) => {
        // return false if a cell is already occupied
        const mark = Player.shape;
        if (board[row][column] === ' ') {
            board[row][column] = mark;
        } else {
            return false;
        }

        // check winner after playing each turn
        // check rows, columns, diagonals

        printBoard();
        if (checkWin(Player)) {
            console.log(`${Player.name} is the winner!`);
        } else {
            console.log('no winner');
        }
    };

    const getBoard = () => board;

    const printBoard = () => console.table(board);

    const checkWin = (Player) => {
        // check row
        const mark = Player.shape;

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
        //check diagonal
        if (mark === board[0][0] && mark === board[1][1] && mark === board[2][2]
            || mark === board[2][0] && mark === board[1][1] && mark === board[0][2]) {
                return true;
        }

        return false;
    }

    const reset = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = ' ';
            }
        }
    }

    return {
        getBoard,
        playTurn,
        printBoard,
        reset,
        checkWin,
    }
})();

function Player(name) {
    this.name = name;
}

Player.prototype.setShape = function(shape) {
    this.shape = shape;
}

const displayController = (function() {

})();

Gameboard.printBoard();

const john = new Player('John');
const claire = new Player('Claire');
john.setShape('O');
claire.setShape('X');

console.log(john);
console.log(claire);