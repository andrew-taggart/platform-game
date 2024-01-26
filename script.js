let currentKey
let y = 100
let player = document.querySelector("#player")



function animate() {
    window.requestAnimationFrame(animate)
    console.log('animate')
    player.style.background = "red"
    
}

animate()