let gameSeq = []
let userSeq = []

let btns = ["yellow" , "red" , "purple" , "green"]

let started = false;
let level = 0

//Accesing the DOM 
let h2 = document.querySelector("h2")

//1 . We have to start the game
let body = document.querySelector("body")
body.addEventListener("keypress" , function(){
    if(started === false){
        console.log("Game Started")
        started = true;
    }

    levelUp()
})


//2 . In this step we have to add the Flask in the div and we have to level up 

/* 
// let div = document.querySelector("#one")
// console.dir(div)
// div.addEventListener("click",function(event){
//     btnFlash(event.target)
// })

// let containers = document.querySelectorAll(".btn")
// for(btn of containers){
//     btn.addEventListener("click" , function(event){
//         btnFlash(event.target)
//     })
// }
*/

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    },250)
}
function userFlash(btn){
    btn.classList.add("userFlash")
    setTimeout(function(){
        btn.classList.remove("userFlash")
    },250)
}

function levelUp(){

    userSeq = []

    level++
    h2.innerHTML = `Level ${level}`

    //Random code to generate the Sequence
    let randomIdx = Math.floor(Math.random()*3)
    let randomColor = btns[randomIdx]
    let randomBtn = document.querySelector(`.${randomColor}`)

    //Adding the randomColor into the gameSeq
    gameFlash(randomBtn)
    gameSeq.push(randomColor)
    console.log(gameSeq)
}


//3 . Add the Press Btn Events

function checkAns(idx){
    //check that the user data is matching with the game data
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp , 1000)
        }
    }else{
        h2.innerHTML = `Game Over ! Your Score : <b>${level}</b> <br> press any key to start`

        //change the color when the user click the wrong sequence
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"
        })
        reset()
    }
}

function btnPress(){
    let btn = this
    userFlash(btn)

    userColor = btn.getAttribute("id")
    console.log(userColor)
    userSeq.push(userColor)
    console.log(userSeq)

    checkAns(userSeq.length -1)
}

function reset(){
    started = false
    gameSeq = []
    userSeq = []
    level = 0
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click" , btnPress
    )
}


//4 . adding the gameSeq and the userSeq