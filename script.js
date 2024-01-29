let floor = document.querySelector(".floor")
let player = document.querySelector(".player")
let container = document.querySelector(".container")
let up = document.querySelector(".up")
let down = document.querySelector(".down")
let left = document.querySelector(".left")
let right = document.querySelector(".right")

//Functions

let gravitySpd = setInterval(gravity, 1000/50);

function gravity() {
    if (player.offsetTop <= (floor.offsetTop - 55)) {
        player.style.top = player.offsetTop + 1 + "px"
    } else if (player.offsetTop == floor.offsetTop + 200)
    player.style.top =  200 + "px"
}