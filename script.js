// Create Gameboard module inside IIFE (only one instance of board at a time)
const Gameboard = (function() {
    const board = [];
    let cellCount = 9;
    let gameover = false;
    let player1, player2, active;

    for (let i = 0; i < 9; i++) {
        board.push('');
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

        const status = document.querySelector('.game-status');
        status.textContent = `${active.name}'s Turn (${active.shape})`;

        // Remove current grid to refresh during reset
        const main = document.querySelector('.main');
        const currentContainer = document.querySelector('.board-container');
        main.removeChild(currentContainer);
        // Initialize board with buttons in each cell
        const boardContainer = document.createElement('div');
        boardContainer.classList.add('board-container');
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
        main.appendChild(boardContainer);
    }

    // markCell will return true if successful placement
    const markCell = (index, shape) => {
        if (!gameover && board[index] === '') {
            board[index] = shape;
            const cell = document.querySelector(`button[index='${index}']`);
            cell.textContent = shape;
            cellCount--;
        } else {
            return false;
        }

        if (checkWin(active)) {
            const status = document.querySelector('.game-status');
            status.textContent = `${active.name} (${active.shape}) Wins!`;
            gameover = true;
            return false;
        }

        if (cellCount == 0) {
            const status = document.querySelector('.game-status');
            status.textContent = 'Game Over - Draw!'
            gameover = true;
            return false;
        }

        return true;
    }

    const checkWin = (player) => {
        const mark = player.shape;

        // the winning lines indices
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
        const status = document.querySelector('.game-status');
        status.textContent = `${active.name}'s Turn (${active.shape})`;
    }

    const getActiveName = () => active.name;
    const getActiveShape = () => active.shape;

    return {
        markCell,
        init,
        getActiveName,
        getActiveShape,
    }

})();

// Player objects
function Player(name) {
    this.name = name;
}

Player.prototype.setShape = function(shape) {
    this.shape = shape;
}

Player.prototype.setName = function(name) {
    this.name = name;
}

// Use gameController to set player names in UI and start/reset the game
const gameController = (function() {
    const p1 = new Player('Player 1');
    const p2 = new Player('Player 2');
    p1.setShape('X');
    p2.setShape('O');

    const p1Name = document.querySelector('.p1-name');
    p1Name.textContent = p1.name;
    const p2Name = document.querySelector('.p2-name');
    p2Name.textContent = p2.name;

    const p1Btn = document.querySelector('.p1-change-btn');
    const p2Btn = document.querySelector('.p2-change-btn');

    p1Btn.addEventListener('click', (e) => {
        e.preventDefault();
        const p1New = document.getElementById('p1-new-name');
        p1.setName(p1New.value);
        p1Name.textContent = p1.name;
        const status = document.querySelector('.game-status');
        status.textContent = `${Gameboard.getActiveName()}'s Turn (${Gameboard.getActiveShape()})`;
    });

    p2Btn.addEventListener('click', (e) => {
        e.preventDefault();
        const p2New = document.getElementById('p2-new-name');
        p2.setName(p2New.value);
        p2Name.textContent = p2.name;
        const status = document.querySelector('.game-status');
        status.textContent = `${Gameboard.getActiveName()}'s Turn (${Gameboard.getActiveShape()})`;
    });

    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', () => {
        p1.setName('Player 1');
        p2.setName('Player 2');
        Gameboard.init(p1, p2);
        console.log('reset');
    })

    Gameboard.init(p1, p2);
})();