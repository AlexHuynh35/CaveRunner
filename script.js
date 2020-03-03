var z = [];
var xLoc = 0;
var yLoc = 0;
var level = 0;
var difficulty = 0;
var direction = "right";

// i = x = column, j = y = row

function spawnEntity(mobSpawnRate, rockSpawnRate){
    var randomN = Math.ceil(Math.random() * 100);
    if(randomN <= mobSpawnRate){
        return "mob";
    }else if(randomN <= mobSpawnRate + rockSpawnRate){
        return "rock";
    }else{
        return "empty";
    }
}

function isEmpty(grid){
    for(var i = 0; i < grid.length; i++){
        for(var j = 0; j < grid[0].length; j++){
            if(grid[i][j] !== "empty" && grid[i][j] !== "player"){
                return false;
            }
        }
    }
    return true;
}

function spawnLadder(grid){
    if(isEmpty(grid)){
        if(grid[0][grid[0].length - 1] === "player"){
            $(`.${grid.length - 1}.00`).css("background-color", "brown");
            grid[grid.length - 1][0] = "ladder";
        } else {
            $(`.0.0${grid[0].length - 1}`).css("background-color", "brown");
            grid[0][grid[0].length - 1] = "ladder";
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

function moveEntity(){
    for(var i = 0; i < z.length; i++){
        for(var j = 0; j < z[0].length; j++){
            if(z[i][j] === "mob"){
                var randomDi = Math.ceil(Math.random() * 4);
                if(randomDi === 1){
                    if(i !== z.length - 1 && z[i + 1][j] === "empty"){
                        clearPath(i, j);
                        $(`.${i + 1}.0${j}`).css("background-color", "red");
                    }
                }
                if(randomDi === 2){
                    if(i !== 0 && z[i - 1][j] === "empty"){
                        clearPath(i, j);
                        $(`.${i - 1}.0${j}`).css("background-color", "red");
                    }
                }
                if(randomDi === 3){
                    if(j !== z[0].length - 1 && z[i][j + 1] === "empty"){
                        clearPath(i, j);
                        $(`.${i}.0${j + 1}`).css("background-color", "red");
                    }
                }
                if(randomDi === 4){
                    if(j !== 0 && z[i][j - 1] === "empty"){
                        clearPath(i, j);
                        $(`.${i}.0${j - 1}`).css("background-color", "red");
                    }
                }
            }
        }
    }
    for(var i = 0; i < z.length; i++){
        for(var j = 0; j < z[0].length; j++){
            if($(`.${i}.0${j}`).css("background-color") === "rgb(255, 0, 0)"){
                z[i][j] = "mob";
            }
        }
    }
}

function makeGrid(width, length, size){
    for (var i = 0; i < width; i++){
        $(".container").append(`<div id='column${i}'>`);
        z.push([]);
        for (var j = 0; j < length; j++){
            $(`#column${i}`).append(`<div class='box ${i} 0${j}'></div>`);
            z[i].push(spawnEntity(5, 10));
            appendObstacles(z, i, j);
        }
        $(".container").append("</div>");
        $(".box").css({"width": `${size}px`, "height": `${size}px`});
    }
}

function destroyEntity(x, y){
    if(direction === "right" && z[x + 1][y] !== "ladder"){
        clearPath(x + 1, y);
    }
    if(direction === "left"  && z[x - 1][y] !== "ladder"){
        clearPath(x - 1, y);
    }
    if(direction === "down"  && z[x][y + 1] !== "ladder"){
        clearPath(x, y + 1);
    }
    if(direction === "up"  && z[x][y - 1] !== "ladder"){
        clearPath(x, y - 1);
    }
}

function nextLevel(){
    z = [];
    $(".container").empty();
    level = level + 1;
    difficulty = Math.floor(5 + (level)/5);
    makeGrid(difficulty, difficulty, 50);
    xLoc = 0;
    yLoc = z[0].length - 1;
    playerLoc(xLoc, yLoc);
}

function playerLoc(x, y){
    $(`.${x}.0${y}`).css("background-color", "black");
    z[x][y] = "player";
}

function clearPath(x, y){
    $(`.${x}.0${y}`).css("background-color", "white");
    z[x][y] = "empty";
}

nextLevel();

setInterval(
    
)

$("body").keydown(function(e){
    if(e.key === "ArrowRight"){
        if(xLoc !== z.length - 1 && z[xLoc + 1][yLoc] === "empty"){
            clearPath(xLoc, yLoc);
            xLoc = xLoc + 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "right";
        moveEntity();
    }
    if(e.key === "ArrowLeft"){
        if(xLoc !== 0 && z[xLoc - 1][yLoc] === "empty"){
            clearPath(xLoc, yLoc);
            xLoc = xLoc - 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "left";
        moveEntity();
    }
    if(e.key === "ArrowDown"){
        if(yLoc !== z[0].length - 1 && z[xLoc][yLoc + 1] === "empty"){
            clearPath(xLoc, yLoc);
            yLoc = yLoc + 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "down";
        moveEntity();
    }
    if(e.key === "ArrowUp"){
        if(yLoc !== 0 && z[xLoc][yLoc - 1] === "empty"){
            clearPath(xLoc, yLoc);
            yLoc = yLoc - 1;
            playerLoc(xLoc, yLoc);
        }
        direction = "up";
        moveEntity();
    }
    if(e.shiftKey){
        destroyEntity(xLoc, yLoc);
        isEmpty(z);
        spawnLadder(z);
        if((xLoc === 0 && z[xLoc][yLoc + 1] === "ladder" && direction === "down") || (xLoc === z.length - 1 && z[xLoc][yLoc - 1] === "ladder" && direction === "up") || (yLoc === 0 && z[xLoc + 1][yLoc] === "ladder" && direction === "right") || (yLoc === z[0].length - 1 && z[xLoc - 1][yLoc] === "ladder" && direction === "left")){
            nextLevel();
        }
    }
});