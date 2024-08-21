// Create Gameboard module inside IIFE (only one instance of board at a time)
const Gameboard = (function() {
    const board = [];
    let cellCount = 9;
    let gameover = false;
    let player1, player2, active;

    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    const boardContainer = document.querySelector('.board-container');

    for (let i = 0; i < 9; i++) {
        const cellBtn = document.createElement('button');
        cellBtn.classList.add('cell');
        cellBtn.textContent = board[i];
        cellBtn.setAttribute('index', i);
        cellBtn.addEventListener('click', () => {
            if (markCell(i, active.shape)) switchTurn();

        });
        boardContainer.appendChild(cellBtn);
    }

    // function to initialize/start the game (use it to reset the game)
    const init = (p1, p2) => {
        cellCount = 9;
        gameover = false;
        for (let i = 0; i < 9; i ++) {
            board[i] = '';
        }
        player1 = p1;
        player2 = p2;
        active = player1;
    }

    const getBoard = () => {
        return board;
    }

    const markCell = (index, shape) => {
        if (!gameover && board[index] === '') {
            board[index] = shape;
            const cell = document.querySelector(`button[index='${index}']`);
            cell.textContent = shape;
        } else {
            return false;
        }

        if (checkWin(active)) {
            const status = document.querySelector('.game-status');
            status.textContent = `${active.name} (${active.shape}) WINS!`;
            gameover = true;
            return false;
        }

        if (cellCount == 0) {
            const status = document.querySelector('.game-status');
            status.textContent = 'GAME OVER - DRAW!'
            gameover = true;
            printBoard();
            return false;
        }

        return true;
    }

    const checkWin = (player) => {
        const mark = player.shape;

        const lines = [[0,1,2], [3,4,5], [6,7,8],
                        [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]];

        for (let i = 0; i < lines.length; i++) {
            if (mark === board[lines[i][0]] && mark === board[lines[i][1]] && mark === board[lines[i][2]]) {
                return true;
            }
        }
        return false;
    }

    const switchTurn = () => {
        (active == player1) ? active = player2 : active = player1;
    }

    return {
        getBoard,
        markCell,
        init,
        board,
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

const displayController = (function() {
    const p1 = new Player('Player 1');
    const p2 = new Player('Player 2');

    p1.setShape('X');
    p2.setShape('O');

    Gameboard.init(p1, p2);

})();