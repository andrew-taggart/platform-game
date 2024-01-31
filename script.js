const player = document.querySelector("#player")
const objects = document.querySelectorAll(".platform")
const restartBtn = document.querySelector(".playAgain")


//Game Values
const gravity = 1
const keys = {}

//Player
let pX = 50
let pY = 50
let velocityX = 0
let velocityY = 0
let jumping = false
//Collision Equation
function collision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y
}

//Event Listeners
restartBtn.addEventListener('click', restartGame)
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

    //Collision Implementation
    objects.forEach((object) => {
        const objLocation = object.getBoundingClientRect()
        const playerLocation = player.getBoundingClientRect()

        if (collision(playerLocation, objLocation) && velocityY > 0) {
            pY = objLocation.top - player.offsetHeight
            jumping = false
            velocityY = 0
        }
    })

    requestAnimationFrame(gameLoop)
}
gameLoop()


//Restart Button
function restartGame() {
    pX = 50
    pY = 50
    velocityX = 0
    velocityY = 0
    jumping = false
    gameLoop()
}
    