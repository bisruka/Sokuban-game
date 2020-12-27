var myMapElement = document.getElementById("map");
var myResultElement = document.getElementById("result");
var x = 0;
var y = 0;

var player = {
    x: 0,
    x: 0,
  };

var goalCount = 0;

displayMap();

document.addEventListener("keydown", function(event) {
    event.preventDefault();

    switch (event.key) {
        case "ArrowLeft":
            movePlayerToLeft();
            break;
        case "ArrowRight":
            movePlayerToRight();
            break;
        case "ArrowUp":
            movePlayerToUp();
            break;
        case "ArrowDown":
            movePlayerToDown();
            break;
        default:
            break;
    }
});

function displayMap() {
    goalCount = 0;
    while (myMapElement.firstChild) {
        myMapElement.removeChild(myMapElement.lastChild);
    }
    x = 0;
    y = 0;
    tileMap01.mapGrid.forEach(displayMapLine);

    winGame();
}

function winGame() {
    if (goalCount === 0) {
        myResultElement.innerHTML = "You win the game!";
    }
}

function displayMapLine(line, index, array) {
    x = 0;
    line.forEach(displayMapTile);
    var br = document.createElement("br");
    myMapElement.appendChild(br);
    if (y < tileMap01.height) {
        y++;
    }
}

function displayMapTile(tile, index, array) {
    var oneTile = document.createElement("div");
    if (tile[0] === "W") {
        oneTile.classList.add(Tiles["Wall"]);
    } else if (tile[0] === "G") {
        oneTile.classList.add(Tiles["Goal"]);
        goalCount++;
    } else if (tile[0] === "B") {
        oneTile.classList.add(Entities["Block"]);
    } else if (tile[0] === "GB") {
        oneTile.classList.add(Entities["BlockDone"]);
    } else if (tile[0] === "P" || tile[0] === "GP") {
        oneTile.classList.add(Entities["Character"]);
        player.x = x;
        player.y = y;
    } else {
        oneTile.classList.add(Tiles["Space"]);
    }

    myMapElement.appendChild(oneTile);
    if (x < tileMap01.width) {
        x++;
    }
}

function movePlayerToLeft() {
    var newPlayerX = player.x - 1;
    var newPlayerY = player.y;

    validateAndMove(newPlayerX, newPlayerY, newPlayerX - 1, newPlayerY);
}

function movePlayerToRight() {
    var newPlayerX = player.x + 1;
    var newPlayerY = player.y;

    validateAndMove(newPlayerX, newPlayerY, newPlayerX + 1, newPlayerY);    
    }

function movePlayerToUp() {
    var newPlayerX = player.x;
    var newPlayerY = player.y - 1;

    validateAndMove(newPlayerX, newPlayerY, newPlayerX, newPlayerY - 1);
}

function movePlayerToDown() {
    var newPlayerX = player.x;
    var newPlayerY = player.y + 1;

    validateAndMove(newPlayerX, newPlayerY, newPlayerX, newPlayerY + 1);
}

function validateAndMove(x1, y1, x2, y2) {
    if (x1 >= 0 && x1 < tileMap01.width && y1 >= 0 && y1 < tileMap01.height && tileMap01.mapGrid[y1][x1][0] !== "W") {

        if (x2 >= 0 && x2 < tileMap01.width && y2 >= 0 && y2 < tileMap01.height &&
            !((tileMap01.mapGrid[y1][x1][0] === "B" || tileMap01.mapGrid[y1][x1][0] === "GB") && 
              (tileMap01.mapGrid[y2][x2][0] === "W" || tileMap01.mapGrid[y2][x2][0] === "B" || tileMap01.mapGrid[y2][x2][0] === "GB"))) {

            if (tileMap01.mapGrid[y1][x1][0] === "B" || tileMap01.mapGrid[y1][x1][0] === "GB") {
                setNewBlock(x2, y2);
                clearOldBlock(x1, y1);
            }

            setNewPlayer(x1, y1);
            clearOldPlayer(player);
            displayMap();    
        }
    }
}

function setNewPlayer(x, y) {
    var tile = tileMap01.mapGrid[y][x][0];
    tileMap01.mapGrid[y][x][0] = tile === "G" ? "GP" : "P";
}

function clearOldPlayer(player) {
    var tile = tileMap01.mapGrid[player.y][player.x][0];
    tileMap01.mapGrid[player.y][player.x][0] = tile === "GP" ? "G" : " ";
}

function setNewBlock(x, y) {
    var tile = tileMap01.mapGrid[y][x][0];
    tileMap01.mapGrid[y][x][0] = tile === "G" ? "GB" : "B";
}

function clearOldBlock(x, y) {
    var tile = tileMap01.mapGrid[y][x][0];
    tileMap01.mapGrid[y][x][0] = tile === "GB" ? "G" : " ";
}