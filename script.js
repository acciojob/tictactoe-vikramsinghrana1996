//your JS code here. If required.
document.getElementById("submit").addEventListener("click", () => {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names!");
        return;
    }

    document.getElementById("player-input").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");

    startGame(player1, player2);
});

function startGame(player1, player2) {
    let board = document.querySelector(".board");
    let message = document.querySelector(".message");
    let currentPlayer = player1;
    let symbol = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    message.textContent = `${currentPlayer}, you're up!`;

    board.addEventListener("click", (e) => {
        let cell = e.target;
        let cellIndex = parseInt(cell.id) - 1;

        if (!cell.classList.contains("cell") || boardState[cellIndex] !== "") return;

        boardState[cellIndex] = symbol;
        cell.textContent = symbol;

        if (checkWin(boardState, symbol)) {
            message.textContent = `${currentPlayer} congratulations, you won!`;
            board.removeEventListener("click", arguments.callee);
            return;
        }

        if (boardState.every(cell => cell !== "")) {
            message.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        symbol = symbol === "X" ? "O" : "X";
        message.textContent = `${currentPlayer}, you're up!`;
    });
}

function checkWin(board, symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === symbol)
    );
}
