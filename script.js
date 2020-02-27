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
var inventory = ["", "", "", "", "", "", "", "", ""];

function spawnEntity(mobSpawnRate, rockSpawnRate){
    var randomN = Math.ceil(Math.random() * 100);
    if(randomN > mobSpawnRate + rockSpawnRate){
        console.log("empty");
        return "empty";
    }
    if(randomN <= rockSpawnRate && randomN > mobSpawnRate){
        console.log("rock");
        return "rock";
    }
    console.log("mob");
    return "mob;"
}

$(".")

function makeGrid(width, length, size) {
    for (var i = 0; i < width; i++) {
        $(".container").append(`<div id='column${i}'>`);
        z.push([]);
        for (var j = 0; j < length; j++) {
            $(`#column${i}`).append(`<div class='box ${i} 0${j}'></div>`);
            z[i].push("empty");
        }
        $(".container").append("</div>");
        $(".box").css({"width": `${size}px`, "height": `${size}px`});
    }
}



makeGrid(20, 20, 20);
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
    if (e.key === "ArrowRight" && xLoc != z[0].length - 1) {
        clearPath(xLoc, yLoc);
        xLoc = xLoc + 1;
        playerLoc(xLoc, yLoc);
    }
    if (e.key === "ArrowLeft" && xLoc != 0) {
        clearPath(xLoc, yLoc);
        xLoc = xLoc - 1;
        playerLoc(xLoc, yLoc);
    }
    if (e.key === "ArrowDown" && yLoc != z.length - 1) {
        clearPath(xLoc, yLoc);
        yLoc = yLoc + 1;
        playerLoc(xLoc, yLoc);
    }
    if (e.key === "ArrowUp" && yLoc != 0) {
        clearPath(xLoc, yLoc);
        yLoc = yLoc - 1;
        playerLoc(xLoc, yLoc);
    }
});