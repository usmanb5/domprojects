let randomNumber = parseInt(Math.random() * 100 + 1)
console.log(randomNumber)
const submit = document.querySelector("#subt")
const userInput = document.querySelector("#guessField")
const guessSlot = document.querySelector(".guesses")
const remaining = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")
const startOver = document.querySelector(".resultParas")

const p = document.createElement('p')
let prevGuess = []
let noOfAttempts = 1

let playGame = true
if(playGame){
  submit.addEventListener('click',function(e){
    e.preventDefault()
    let guess = parseInt(userInput.value)
    console.log(guess)
    validateGuess(guess)
  })
}

function validateGuess(guess){
  if(isNaN(guess)){
    alert('please enter a valid no')
  } else if(guess < 1){
    alert('please enter a number greater than 1')
  } else if(guess > 100){
    alert('please enter a number less than 100')
  } else{
    prevGuess.push(guess)
    if(noOfAttempts === 11){
      Cleanup(guess)
      displayMessage(`Game Over.Random Number was ${randomNumber}`)
      endGame()
    } else {
      Cleanup(guess)
      checkGuess(guess)
    }
  }
}

function checkGuess(guess){
  if(guess === randomNumber){
    displayMessage('You guessed it right')
    endGame()
  } else if(guess < randomNumber){
    displayMessage('number is too low')
  } else if(guess > randomNumber){
    displayMessage('number is too high')
  }
}

function Cleanup(guess){
   userInput.value = ' '
   guessSlot.innerHTML += `${guess},`
   noOfAttempts++;
   remaining.innerHTML = `${11-noOfAttempts}`
}

function displayMessage(message){
  lowOrHi.innerHTML = `<h2>${message}</h2>`

}
function endGame(){
  userInput.value = ''
  userInput.setAttribute('disabled','')
  p.classList.add('button')
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`
  startOver.appendChild(p)
  playGame = false
  newGame();

}
function newGame(){
  let newGameButton = document.getElementById("newGame")
  newGameButton.addEventListener('click',function(e){
    randomNumber = parseInt(Math.random() * 100 + 1)
    prevGuess = []
    noOfAttempts = 1
    guessSlot.innerHTML =  '';
    remaining.innerHTML = `${11 - noOfAttempts}`
    userInput.removeAttribute('disabled','')
    startOver.removeChild(p)
    playGame = true
  })

}