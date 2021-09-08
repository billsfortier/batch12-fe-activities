// Variables
const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let playerOne
let playerTwo
let currentTurn
let movementCount = 0
let draw = false
let winIndex = []
let gameState = []
let movementHistory = []

// DOM
const startGameElement = document.querySelector('.start-game-wrapper')// start game wrapper
const playerButton = document.querySelectorAll('.player-button')
const board = document.querySelector('.board')
const cellElements = document.querySelectorAll('[data-cell]')// select cell element
const actionElement = document.querySelector('.action-buttons') // action buttons div
const previousButton = document.getElementById('previous-button') // previous button
const nextButton = document.getElementById('next-button') // next button
const resetButton = document.getElementById('reset-button')// restart button
const announceElement = document.querySelector('#announce')// announce winner

// Fn
// initiate Game
startGame()
// StartGame Fn
function startGame() {
    playerButton.forEach(button => {
        button.addEventListener('click', () => {
            startGameElement.classList.add('hide')
            setFirstTurn(button)
            toggleClick(true)
        })
    })
}
// Choose First Turn
function setFirstTurn(button) {
    playerOne = button.innerHTML // X
    playerTwo = playerOne === 'X' ? 'O' : 'X'
    console.log(playerOne == X_CLASS);
}
// Check if cell is empty
function handleClick() {
    if (!(this.innerHTML === 'X' || this.innerHTML === 'O')) {
        this.innerHTML = movementCount % 2 === 0 ? playerOne : playerTwo;
        console.log(playerOne , playerTwo);
        if ((movementCount % 2 === 0 && playerOne === 'X') || (movementCount % 2 !== 0 && playerTwo === 'X')) {
            this.classList.add(X_CLASS)
        } else {
            this.classList.add(O_CLASS)
        }
        storeMove()
        checkWinner()
        movementCount++;
        if (movementCount === 9) {
            announceElement.innerHTML = 'Draw!'
            actionElement.classList.add('show')
        }
    }
}
// Store Move
function storeMove() {
    let array1 = []
    let array2 = []
    let array3 = []

    cellElements.forEach((cell, index) => {
        if (index < 3) {
            array1.push(cell.innerText)
        } else if (index >= 3 && index <= 5) {
            array2.push(cell.innerText)
        } else {
            array3.push(cell.innerText)
        }
    })
    // Push to gameState array (for history)
    gameState.push([array1, array2, array3])
    console.log(gameState);
}
// Check Winner
function checkWinner() {
    currentTurn = movementCount % 2 === 0 ? playerOne : playerTwo
    
    for(let i = 0; i < cellElements.length; i++) {
        for(let j = 0; j < WINNING_COMBINATIONS.length; j++) {
            let cell1 = cellElements[WINNING_COMBINATIONS[j][0]].innerText
            let cell2 = cellElements[WINNING_COMBINATIONS[j][1]].innerText
            let cell3 = cellElements[WINNING_COMBINATIONS[j][2]].innerText
            
            if (cell1 === currentTurn && cell2 === currentTurn && cell3 === currentTurn) {
                winIndex = [WINNING_COMBINATIONS[j][0], WINNING_COMBINATIONS[j][1], WINNING_COMBINATIONS[j][2]]
                console.log(winIndex);
                return endGame()
            }
        }
    }
    
}
// check if Win or Draw
function endGame() {
    announceElement.innerText = draw ? `Draw!` : `${currentTurn} wins!`
    toggleClick(false)
    actionElement.classList.add('show')
}
// toggleClick Fn 
function toggleClick(event) {
    cellElements.forEach(cell => {
        event === true ? (cell.classList.add('cursor-point'), 
                          cell.addEventListener('click', handleClick))
                       : (cell.classList.remove('cursor-point'), 
                          cell.classList.add('cursor-not-allowed'),
                          cell.removeEventListener('click', handleClick))
    })
}
// Action Button Fn
// previousMove
function previousMove() {
    movementCount--
    if (movementCount > 0 ) {
        if (movementCount === 1) {
            previousButton.disabled = true
        }
        nextButton.disabled = false
        showMove()
    }
}
// nextMove
function nextMove() {
    movementCount++
    if (movementCount < gameState.length + 1) {
        if (movementCount === gameState.length) {
            console.log(movementCount === gameState.length);
            nextButton.disabled = true
            
            // highlightWinCombination('show')
        }
        previousButton.disabled = false
        showMove()
        let cell = document.querySelectorAll('[data-cell]')
        winIndex.forEach(index => {
            cell[index].classList.add('highlight-box')
            console.log(cell);
        })
    }
}
// show all moves throughout the game
function showMove() {
    let steps = []
    board.innerHTML = ''

    movementHistory = gameState[movementCount - 1]
    movementHistory.forEach( index => {
        console.log(index)
        index.forEach(step => {
            let div = document.createElement('div')
            div.classList.add('cell')
            div.setAttribute('data-cell', '')
            div.innerText = step
            
            if (step != '') {
                div.classList.add(step.toLowerCase())
            }
            board.append(div)
            // steps.push(step)
        })
    })

    // cellElements.forEach((cell, index) => {
    //     cell.innerText = steps[index]
    // })
}
// reset 
const resetGame = () => {
    location.reload()
}

// Event Listeners
previousButton.addEventListener('click', previousMove)
nextButton.addEventListener('click', nextMove)
resetButton.addEventListener('click', resetGame)