//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function () {
    const player1 = document.getElementById('player1').value.trim();
    const player2 = document.getElementById('player2').value.trim();
    if (!player1 || !player2) {
        alert("Both players must enter their names!");
        return;
    }

    // Initialize game
    startGame(player1, player2);
});

function startGame(player1, player2) {
    const board = document.getElementById('board');
    board.innerHTML = ""; // Clear previous board
    const message = document.querySelector('.message');
    let currentPlayer = player1;
    let currentSymbol = "X";
    let gameOver = false;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Display initial message
    message.textContent = `${currentPlayer}, you're up!`;

    // Create 3x3 board dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", i + 1);
        cell.addEventListener("click", function () {
            if (!cell.textContent && !gameOver) {
                cell.textContent = currentSymbol;
                boardState[i] = currentSymbol;
                if (checkWin(boardState, currentSymbol)) {
                    message.textContent = `${currentPlayer} congratulations you won!`;
                    gameOver = true;
                } else {
                    // Switch player
                    currentPlayer = (currentPlayer === player1) ? player2 : player1;
                    currentSymbol = (currentSymbol === "X") ? "O" : "X";
                    message.textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
        board.appendChild(cell);
    }
}

// Function to check win condition
function checkWin(board, symbol) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winningCombos.some(combo => combo.every(index => board[index] === symbol));
}
