const player = document.querySelector("#player")
const objects = document.querySelectorAll(".game-object")
const lava = document.querySelectorAll('.lava')
const goal = document.querySelector('.goal')
const restartBtn = document.querySelector(".playAgain")
const endMsg = document.querySelector('.popup')

//Game Values
const gravity = 1
const keys = {}
//Player
let pX = 1
let pY = 1
let velocityX = 0
let velocityY = 0
let jumping = false

//Collision Equation
function collision(obj1, obj2) {
    return (obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y)
}

function checkGoal() {
    const goalLocation = goal.getBoundingClientRect()
    const playerLocation = player.getBoundingClientRect()
    if (collision(playerLocation, goalLocation)) {
        endMsg.style.display = 'block'
    }
}

//Event Listeners
restartBtn.addEventListener('click', restartGame)
document.addEventListener('keydown', (e) => {
    keys[e.key] = true
})
document.addEventListener('keyup', (e) => {
    keys[e.key] = false
})
//In Game
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

    player.style.top = `${pY}px`
    player.style.left = `$${pX}px`

    //Collision Implementation
    objects.forEach((object) => {
        if (object !== player) {
        const objLocation = object.getBoundingClientRect()
        const playerLocation = player.getBoundingClientRect()
       //Adjust collision implementation, but keep current logic for sticky walls

        if (collision(playerLocation, objLocation)) {
            pY -= velocityY
            //pX -= velocityX
            jumping = false
            velocityY = 0
        }
    }
    })

    lava.forEach((lava) => {
        if (lava !== player) {
        const lavaLocation = lava.getBoundingClientRect()
        const playerLocation = player.getBoundingClientRect()
        if (collision(playerLocation, lavaLocation)) {
            alert('Game Over')
        }
    }
    })
    //Function Activation
    requestAnimationFrame(gameLoop)
    checkGoal()
    
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
    