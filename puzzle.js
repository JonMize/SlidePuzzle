
document.addEventListener("DOMContentLoaded", () => {
    let rows = 3;
    let columns = 3;

    let currTile;
    let otherTile; // blank tile

    const board = document.getElementById("board");
    const gridSizeSelector = document.getElementById("grid-size");

    function initializeGame() {
        rows = columns = parseInt(gridSizeSelector.value);
        const tileSize = 360 / rows; // Dynamically calculate tile size

        board.style.gridTemplateColumns = `repeat(${columns}, ${tileSize}px)`;
        board.style.gridTemplateRows = `repeat(${rows}, ${tileSize}px)`;
        board.innerHTML = ""; // Clear the board

        let imgOrder = Array.from({ length: rows * columns }, (_, i) => i + 1);
        imgOrder[imgOrder.length - 1] = "x"; // Last tile is blank
        imgOrder.sort(() => Math.random() - 0.5); // Shuffle tiles

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const tile = document.createElement("img");
                const imgIndex = r * columns + c;

                tile.id = `${r}-${c}`;
                if(rows === 3){
                    tile.src = imgOrder[imgIndex] === "x" ? "images/x.png" : `images/${imgOrder[imgIndex]}.png`;
                }else if(rows === 4){
                    tile.src = imgOrder[imgIndex] === "x" ? "images/x.png" : `images4/${imgOrder[imgIndex]}.png`;
                }else if(rows === 5){
                    tile.src = imgOrder[imgIndex] === "x" ? "images/x.png" : `images5/${imgOrder[imgIndex]}.png`;
                }
                tile.style.width = `${tileSize}px`;
                tile.style.height = `${tileSize}px`;

                // Add drag-and-drop event listeners
                tile.addEventListener("dragstart", dragStart);
                tile.addEventListener("dragover", dragOver);
                tile.addEventListener("dragenter", dragEnter);
                tile.addEventListener("drop", dragDrop);
                tile.addEventListener("dragend", dragEnd);

                board.appendChild(tile);
            }
        }
    }

    function dragStart() {
        currTile = this;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragDrop() {
        otherTile = this;

        // Check if otherTile is the blank tile and directly adjacent
        if (otherTile.src.includes("x.png") && isAdjacent(currTile, otherTile)) {
            // Swap images
            [currTile.src, otherTile.src] = [otherTile.src, currTile.src];
        }
    }

    function dragEnd() {}

    // Helper function to check adjacency
    function isAdjacent(tile1, tile2) {
        const [row1, col1] = tile1.id.split("-").map(Number);
        const [row2, col2] = tile2.id.split("-").map(Number);

        return (
            (row1 === row2 && Math.abs(col1 - col2) === 1) || // Same row, adjacent columns
            (col1 === col2 && Math.abs(row1 - row2) === 1)    // Same column, adjacent rows
        );
    }

    // Add event listener to update grid size
    gridSizeSelector.addEventListener("change", initializeGame);
    initializeGame(); // Initialize the game on page load
});
