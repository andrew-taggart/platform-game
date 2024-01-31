const player = document.querySelector("#player")
const platforms = document.querySelectorAll(".platform")
const gravity = 1

//Game Values
//Player
let pX = 50
let pY = 50
let velocityX = 0
let velocityY = 0
let jumping = false

//Movement Event Listeners
const keys = {}
document.addEventListener('keydown', (e) => {
    keys[e.key] = true
})
document.addEventListener('keyup', (e) => {
    keys[e.key] = false
})

function gameLoop() {
    //Movement Implementation
    if (keys['ArrowLeft']) {
        velocityX = -5
    }else if (keys['ArrowRight']) {
        velocityX = 5
    }else{
        velocityX = 0
    }if (keys['ArrowUp'] && !jumping) {
        velocityY = -20
        jumping = true
    }

    velocityY += gravity

    pX += velocityX
    pY += velocityY

    player.style.left = pX + 'px'
    player.style.top = pY + 'px'

    requestAnimationFrame(gameLoop)
}
gameLoop()
//implement velocity values into movement, collision, and gravity
//adjust object collision to 0 out movement velocity


/*
//Functions
let spdInterval = setInterval(gameLoop, 1000/20)

    let object1 = document.createElement("div")
    object1.setAttribute("class", "ojbect1")





function collision() {
    if (player.offsetTop > wall.offsetTop - wall.offsetHeight &&
        player.offsetTop - player.offsetHeight < wall.offsetTop && 
        player.offsetLeft < wall.offsetLeft + wall.offsetWidth &&
        player.offsetLeft + player.offsetWidth > wall.offsetLeft) 
        {}}

//Movement
//set interval speed keep movement at 1px
//add 'for loop' for jump
//use keyup function to cancel jump hold
    */
   
    