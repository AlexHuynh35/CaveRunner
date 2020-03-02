var sprites = {
    caveFloor: "https://lh3.googleusercontent.com/proxy/t0lwYjv136INYhy3X5OEoQpBz5AqCl7mmaDUAZlGVoUqEp2b3fXHQQNDjnb0IYINxEYQF8zCzF4BL5_M_UtBceX40-Jg0HOo9mScMfA0b07F",
    bat: "https://www.stickpng.com/assets/thumbs/58e33ab625b2455e1b159d7b.png",
    miner: "https://i.ya-webdesign.com/images/calif-transparent-cartoon-6.gif",
    rock: "https://lh3.googleusercontent.com/proxy/YqiqsmyPKbck4gnJiaSROW9kfFa09mrHM0a2Eeio_toe9gnikbpRxJIERt4RsRzBT2Kd-TvI8MUMEQL9OMOtZ-zMsmzFF5awDURbUoYhlRUD7x3zBETZWVAnbLUfNuyaiT99JfYBAjE4uSpSmQ"
};
var z = [];
var xLoc = 0;
var yLoc = 0;
var level = 1;
var direction = "right";
var inventory = ["", "", "", "", "", "", "", "", ""];

function spawnEntity(mobSpawnRate, rockSpawnRate){
    var randomN = Math.ceil(Math.random() * 100);
    if(randomN <= mobSpawnRate){
        console.log("mob");
        return "mob";
    }else if(randomN <= mobSpawnRate + rockSpawnRate){
        console.log("rock");
        return "rock";
    }else{
        console.log("empty");
        return "empty";
    }
}

function isEmpty(grid){
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[0].length; j++){
            if(grid[i][j] != "empty" || grid[i][j] != "player"){
                return false;
            }
        }
    }
    return true;
}

function spawnLadder(grid){
    if(isEmpty(grid)){
        if(grid[0][grid.length - 1] != "player"){
            $(`.0.0${grid.length - 1}`).css("background-color", "brown");
            grid[0][grid.length - 1] = "ladder";
        } else {
            $(`.${grid.length - 1}.00`).css("background-color", "brown");
            grid[grid.length - 1][0] = "ladder";
        }
    }
}

function appendObstacles(grid, column, row){
    if(grid[column][row] === "empty"){
        $(`.${column}.0${row}`).css("background-color", "white");
    }else if(grid[column][row] === "rock"){
        $(`.${column}.0${row}`).css("background-color", "gray");
    }else if(grid[column][row] === "mob"){
        $(`.${column}.0${row}`).css("background-color", "red");
    }
}

function makeGrid(width, length, size) {
    for (var i = 0; i < width; i++) {
        $(".container").append(`<div id='column${i}'>`);
        z.push([]);
        for (var j = 0; j < length; j++) {
            $(`#column${i}`).append(`<div class='box ${i} 0${j}'></div>`);
            z[i].push(spawnEntity(5, 10));
            appendObstacles(z, i, j);
        }
        $(".container").append("</div>");
        $(".box").css({"width": `${size}px`, "height": `${size}px`});
    }
}

function destroyEntity(x, y) {
    if(direction === "right"){
        clearPath(x + 1, y);
        z[x + 1][y] = "empty";
    }
    if(direction === "left"){
        clearPath(x - 1, y);
        z[x - 1][y] = "empty";
    }
    if(direction === "down"){
        clearPath(x, y + 1);
        z[x][y + 1] = "empty";
    }
    if(direction === "up"){
        clearPath(x, y - 1);
        z[x][y - 1] = "empty";
    }
}

makeGrid(4, 4, 50);
xLoc = 0;
yLoc = z[0].length - 1;
playerLoc(xLoc, yLoc);

function playerLoc(x, y) {
    $(`.${x}.0${y}`).css("background-color", "black");
}

function clearPath(x, y) {
    $(`.${x}.0${y}`).css("background-color", "white");
}

$("body").keydown(function(e) {
    if(e.key === "ArrowRight"){
        if(xLoc != z[0].length - 1 && z[xLoc + 1][yLoc] === "empty"){
            clearPath(xLoc, yLoc);
            xLoc = xLoc + 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "right";
    }
    if(e.key === "ArrowLeft"){
        if(xLoc != 0 && z[xLoc - 1][yLoc] === "empty"){
            clearPath(xLoc, yLoc);
            xLoc = xLoc - 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "left";
    }
    if(e.key === "ArrowDown"){
        if(yLoc != z.length - 1 && z[xLoc][yLoc + 1] === "empty"){
            clearPath(xLoc, yLoc);
            yLoc = yLoc + 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "down";
    }
    if(e.key === "ArrowUp"){
        if(yLoc != 0 && z[xLoc][yLoc - 1] === "empty"){
            clearPath(xLoc, yLoc);
            yLoc = yLoc - 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "up";
    }
    if(e.shiftKey){
        destroyEntity(xLoc, yLoc);
        spawnLadder(z);
    }
});