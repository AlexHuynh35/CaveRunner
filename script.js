var sprites = {
    caveFloor: "https://lh3.googleusercontent.com/proxy/t0lwYjv136INYhy3X5OEoQpBz5AqCl7mmaDUAZlGVoUqEp2b3fXHQQNDjnb0IYINxEYQF8zCzF4BL5_M_UtBceX40-Jg0HOo9mScMfA0b07F",
    bat: "https://www.stickpng.com/assets/thumbs/58e33ab625b2455e1b159d7b.png",
    miner: "https://i.ya-webdesign.com/images/calif-transparent-cartoon-6.gif",
    rock: "https://lh3.googleusercontent.com/proxy/YqiqsmyPKbck4gnJiaSROW9kfFa09mrHM0a2Eeio_toe9gnikbpRxJIERt4RsRzBT2Kd-TvI8MUMEQL9OMOtZ-zMsmzFF5awDURbUoYhlRUD7x3zBETZWVAnbLUfNuyaiT99JfYBAjE4uSpSmQ"
};
var grid = [];
var inventory = ["", "", "", "", "", "", "", "", ""];

function makeGrid(width, length) {
    for (var i = 0; i < width; i++) {
        $(".container").append(`<div id='column${i}'>`);
        grid.push([]);
        for (var j = 0; j < length; j++) {
            $(`#column${i}`).append(`<div class='box ${i} 0${j}'></div>`);
            grid[i].push("empty");
        }
        $(".container").append("</div>");
    }
}

makeGrid(5, 5);

function playerLoc(x, y, z) {
    z[x][y] = "player";
    for (var i = 0; i < z.length; i++) {
        for (var j = 0; j < z[0].length; j++) {
            if (z[i][j] === "player") {
                $(`.${i}.0${j}`).css("background-color", "black");
            }
        }
    }
}

$("body").keydown(function(e) {
    if(e.key === "ArrowRight") {
    }
    if(e.key === "ArrowLeft") {
    }
    if(e.key === "ArrowDown") {
    }
    if(e.key === "ArrowUp") {
    }
});