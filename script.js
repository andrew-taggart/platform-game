const player = document.querySelector("#player")
const objects = document.querySelectorAll(".game-object")
const lava = document.querySelectorAll('.lava')
const goal = document.querySelector('.goal')
const restartBtn = document.querySelector(".playAgain")
const endMsg = document.querySelector('.endMsg')
const lose = document.querySelector('.lose')
const win = document.querySelector('.win')
let speedConstant

//Game Values
const gravity = 3
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
        lose.style.display = 'none'
        restartBtn.style.display = 'block'
        endMsg.style.display = 'block'
        win.style.display = 'block'
        stopGameLoop()
        return true
    }
    return false
}

function checkLava() {
    let touchLava = false
    lava.forEach((lavaObj) => {
        const lavaLocation = lavaObj.getBoundingClientRect()
        const playerLocation = player.getBoundingClientRect()
        if (collision(playerLocation, lavaLocation)) {
            win.style.display = 'none'
            restartBtn.style.display = 'block'
            endMsg.style.display = 'block'
            lose.style.display = 'block'
            stopGameLoop()
            touchLava = true
        }
    })  
    return touchLava
}

//Event Listeners
restartBtn.addEventListener('click', () => {
    stopGameLoop()
    restartGame()
})
document.addEventListener('keydown', (e) => {
    keys[e.key] = true
})
document.addEventListener('keyup', (e) => {
    keys[e.key] = false
})
//In Game
function gameLoop() {
    //Movement Implementation
    velocityY += gravity
    if (keys['ArrowLeft']) {
        velocityX = -5
    }else if (keys['ArrowRight']) {
        velocityX = 5
    }else{
        velocityX = 0
    }if (keys['ArrowUp'] && !jumping) {
        velocityY = -30
        jumping = true
    }

    pX += velocityX
    pY += velocityY

    player.style.left = pX + 'px'
    player.style.top = pY + 'px'

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

    if (checkLava() || checkGoal()) {
        
        return
    }
    //Function Activation & speed control
    speedConstant = requestAnimationFrame(gameLoop)
}
function startGameLoop() {
    stopGameLoop()
    gameLoop()
}

function stopGameLoop() {
    cancelAnimationFrame(speedConstant)
}

//Restart Button
function restartGame() {
    pX = 1
    pY = 1
    velocityX = 0
    velocityY = 0
    jumping = false
    lose.style.display = 'none'
    restartBtn.style.display = 'none'
    win.style.display = 'none'
    endMsg.style.display = 'none'
    startGameLoop()
}

startGameLoop()