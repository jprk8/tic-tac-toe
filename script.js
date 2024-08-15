// Create Gameboard inside IIFE (only one board per play)
const Gameboard = (function() {
    // Make the board as 2-d array
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push('0');
        }
    }

    const playTurn = (x, y, Player) => {
        board[x][y] = '1';
    };

    const getBoard = () => board;

    const printBoard = () => console.log(board);

    return {
        getBoard,
        playTurn,
        printBoard,
    }

})();

Gameboard.printBoard();



function Player(name) {
    this.name = name;
}

Player.prototype.setShape = function(shape) {
    this.shape = shape;
}

const john = new Player('John');
const claire = new Player('Claire');
john.setShape('O');
claire.setShape('X');

console.log(john);
console.log(claire);
