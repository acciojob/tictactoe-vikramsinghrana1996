//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function () {
    const player1 = document.getElementById('player1').value.trim();
    const player2 = document.getElementById('player2').value.trim();
    
    if (!player1 || !player2) {
        alert("Both players must enter their names!");
        return;
    }

    startGame(player1, player2);
});

function startGame(player1, player2) {
    const board = document.getElementById('board');
    board.innerHTML = ""; // Clear previous board

    const message = document.querySelector('.message');
    let currentPlayer = player1;
    let currentSymbol = "x";  // Using lowercase 'x' to match Cypress test expectation
    let gameOver = false;
    let boardState = Array(9).fill("");

    message.textContent = `${currentPlayer}, you're up!`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", i + 1);
        cell.dataset.index = i; // Store index for boardState array

        cell.addEventListener("click", function () {
            if (!cell.textContent && !gameOver) {
                cell.textContent = currentSymbol; // Update UI
                boardState[i] = currentSymbol; // Update state

                console.log(`Cell ${i + 1} clicked: ${currentSymbol}`); // Debugging log

                if (checkWin(boardState, currentSymbol)) {
                    message.textContent = `${currentPlayer} congratulations you won!`;
                    gameOver = true;
                    return;
                }

                // Switch player
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
                currentSymbol = (currentSymbol === "x") ? "o" : "x"; // Switch between 'x' and 'o'
                message.textContent = `${currentPlayer}, you're up!`;
            }
        });

        boar
