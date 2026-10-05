const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let winner = null;

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = board[a];
      break;
    }
  }

  if (winner) {
    statusText.textContent = `Player ${winner} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
  });

  statusText.textContent = "Player X's Turn";
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
