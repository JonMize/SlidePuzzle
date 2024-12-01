// Global variables
let gridSize = 3;
let gameContainer = document.getElementById('game-container');
let emptyTile = { row: 0, col: 0 };

// Event listener for dropdown
document.getElementById('grid-size').addEventListener('change', function () {
    gridSize = parseInt(this.value);
});

// Start the game
function startGame() {
    gameContainer.innerHTML = '';
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    let tileSize = gameContainer.offsetWidth / gridSize;
    let tiles = createTiles(gridSize);
    shuffleTiles(tiles);
    renderTiles(tiles, tileSize);
}

// Create tile objects
function createTiles(size) {
    let tiles = [];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            tiles.push({
                row,
                col,
                isEmpty: row === size - 1 && col === size - 1, // Last tile is empty
            });
        }
    }
    emptyTile = { row: size - 1, col: size - 1 }; // Save empty tile position
    return tiles;
}

// Shuffle tiles
function shuffleTiles(tiles) {
    for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

// Render tiles
function renderTiles(tiles, tileSize) {
    tiles.forEach((tile, index) => {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.style.width = `${tileSize}px`;
        div.style.height = `${tileSize}px`;

        // Set background for non-empty tiles
        if (!tile.isEmpty) {
            div.style.backgroundImage = "url('images/puzzle.jpg')";
            div.style.backgroundPosition = `${-tile.col * tileSize}px ${-tile.row * tileSize}px`;
        } else {
            div.classList.add('empty-tile');
        }

        div.addEventListener('click', () => handleTileClick(tile, tiles, tileSize));
        gameContainer.appendChild(div);
    });
}

// Handle tile click
function handleTileClick(tile, tiles, tileSize) {
    if (canMove(tile)) {
        moveTile(tile, tiles);
        renderTiles(tiles, tileSize);
        if (isSolved(tiles)) {
            setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
        }
    }
}

// Check if tile can move
function canMove(tile) {
    const { row, col } = emptyTile;
    return (
        (tile.row === row && Math.abs(tile.col - col) === 1) ||
        (tile.col === col && Math.abs(tile.row - row) === 1)
    );
}

// Move tile
function moveTile(tile, tiles) {
    const emptyIndex = tiles.findIndex(
        (t) => t.row === emptyTile.row && t.col === emptyTile.col
    );
    const tileIndex = tiles.findIndex(
        (t) => t.row === tile.row && t.col === tile.col
    );

    // Swap positions
    tiles[emptyIndex] = { ...tile };
    tiles[tileIndex] = { row: emptyTile.row, col: emptyTile.col, isEmpty: true };
    emptyTile = { row: tile.row, col: tile.col };
}

// Check if the puzzle is solved
function isSolved(tiles) {
    for (let i = 0; i < tiles.length - 1; i++) {
        const tile = tiles[i];
        if (tile.row * gridSize + tile.col !== i) return false;
    }
    return true;
}
