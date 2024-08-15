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

    const playTurn = (x, y, Player) => {
        board[x][y] = Player.shape;
        // need to check winner after playing turn
        printBoard();
    };

    const getBoard = () => board;

    const printBoard = () => console.table(board);

    return {
        getBoard,
        playTurn,
        printBoard,
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