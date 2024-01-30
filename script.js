let floor = document.querySelector(".floor")
let player = document.querySelector(".player")
let container = document.querySelector(".container")
let wall = document.querySelector(".wall")
//Player Values
let pH = player.offsetHeight
let pW = player.offsetWidth
let pX = player.offsetLeft
let pY = player.offsetBottom
//Floor Values
let fH = floor.offsetHeight
let fW = floor.offsetWidth
let fX = player.offsetLeft
let fY = player.offsetBottom
//Wall Values
let wH = floor.offsetHeight
let wW = floor.offsetWidth
let wX = player.offsetLeft
let wY = player.offsetTop

//Functions

let gravitySpd = setInterval(gravity, 1000/30)

function gravity() {
    collision()
    if (player.offsetTop < floor.offsetTop - 55) {
        player.style.top = player.offsetTop + 1
    } }

function collision() {
    if (player.offsetTop > wall.offsetTop - wall.offsetHeight &&
        player.offsetTop - player.offsetHeight < wall.offsetTop && 
        player.offsetLeft < wall.offsetLeft + wall.offsetHeight &&
        player.offsetLeft + player.offsetHeight > wall.offsetLeft) {
            console.log('collision')
        }
}

//Movement

document.addEventListener('keydown', e =>{
    gravity()
    collision()
    if (e.key === 'ArrowRight') {
        player.style.left = player.offsetLeft + 10
    }else if (e.key === 'ArrowLeft') {
        player.style.left = player.offsetLeft - 10
    }else if (e.key === 'ArrowUp' && (player.offsetTop > (floor.offsetTop - fH))) //Jump 100px if on floor
    {player.style.top = player.offsetTop - 100
        } })


    
   
    