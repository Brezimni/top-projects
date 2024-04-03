const game = (function() {
    const gameBoard = [null,null,null,
                       null,null,null,
                       null,null,null];
    let playerTurn = false; //false = X, true = O
    const initBoard = (function(){
        const cells = document.querySelectorAll('.cell');
        const modal = document.querySelector('.modal');
        const announcement = document.getElementById('announcement');
        return { cells, modal, announcement }
    })();
    let controller;
    function activateButtons() {        
        controller !== undefined && initBoard.cells.forEach(cell => {
            cell.classList.remove('active', 'player-two', 'player-one');
            cell.children[0].textContent = '';
        });
        controller = new AbortController();
        initBoard.cells.forEach((cell, index) => {
            cell.addEventListener("click", () => playMove(index, cell), { once: true, signal: controller.signal });
        })
    }

    const playMove = function(position, cell) {
        function evaluatePosition(lastPlay) {       
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
              ];
            for(let combo of winningCombinations) {
                if(gameBoard[combo[0]] === lastPlay && gameBoard[combo[1]] === lastPlay && gameBoard[combo[2]] === lastPlay || !gameBoard.includes(null)) {
                    controller.abort();
                    const result = !gameBoard.includes(null) ? "It's a draw!" : lastPlay === "X" ? 'Player 1 won.' : 'Player 2 won.';
                    initBoard.announcement.textContent = result;
                    initBoard.modal.classList.remove('hidden');
                    break;
                } else {continue;}
            }
        }
        gameBoard.splice(position, 1, playerTurn ? "O" : "X");
        cell.children[0].textContent = playerTurn ? 'radio_button_unchecked' : 'close';
        cell.classList.add(playerTurn ? 'player-two' : 'player-one');
        cell.classList.add('active');
        evaluatePosition(playerTurn ? "O" : "X");
        playerTurn = !playerTurn;
    };

    function startNewGame() {
        gameBoard.splice(0, 9, null, null, null, null, null, null, null, null, null);
        playerTurn = false;
        activateButtons();
        initBoard.modal.classList.add('hidden');
    }

    activateButtons();
    return { startNewGame };
})();
