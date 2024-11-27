const rows = 4;
const cols = 4;

const container = document.getElementById('puzzle-container');
let pieces = [];
let emptyPiece = { row: rows - 1, col: cols - 1 };

function initPuzzle() {
 
  container.innerHTML = '';
  pieces = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === rows - 1 && j === cols - 1) continue; 

      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.style.backgroundPosition = `${-j * 100}px ${-i * 100}px`;
      piece.dataset.row = i;
      piece.dataset.col = j;

      container.appendChild(piece);
      pieces.push({ element: piece, row: i, col: j });

      piece.style.gridRowStart = i + 1;
      piece.style.gridColumnStart = j + 1;

      piece.addEventListener('click', () => movePiece(i, j));
    }
  }


  shufflePuzzle();
}

function shufflePuzzle() {
  for (let i = 0; i < 100; i++) {
    const adjacent = getAdjacentPieces(emptyPiece.row, emptyPiece.col);
    const randomPiece = adjacent[Math.floor(Math.random() * adjacent.length)];
    movePiece(randomPiece.row, randomPiece.col, false);
  }
}

function movePiece(row, col, checkWin = true) {
  if (isAdjacent(row, col, emptyPiece.row, emptyPiece.col)) {
    const piece = pieces.find(p => p.row === row && p.col === col);
    if (piece) {
      const oldEmptyRow = emptyPiece.row;
      const oldEmptyCol = emptyPiece.col;
      emptyPiece.row = piece.row;
      emptyPiece.col = piece.col;
      piece.row = oldEmptyRow;
      piece.col = oldEmptyCol;
      piece.element.style.gridRowStart = piece.row + 1;
      piece.element.style.gridColumnStart = piece.col + 1;
      if (checkWin && isPuzzleSolved()) {
        alert('Congratulations! You solved the puzzle!');
      }
    }
  }
}

function isAdjacent(row1, col1, row2, col2) {
  return (Math.abs(row1 - row2) === 1 && col1 === col2) ||
         (Math.abs(col1 - col2) === 1 && row1 === row2) ||
         (Math.abs(row2 - row1) === 1 && col1 === col2) ||
         (Math.abs(col2 - col1) === 1 && row1 === row2);
}

function getAdjacentPieces(row, col) {
  return pieces.filter(p => isAdjacent(p.row, p.col, row, col));
}

function isPuzzleSolved() {
  return pieces.every(p => 
    p.row === parseInt(p.element.dataset.row) && 
    p.col === parseInt(p.element.dataset.col)
  );
}

initPuzzle();
