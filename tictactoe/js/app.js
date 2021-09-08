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
let storeMovement = [] // store movement here
let movePosition = 0 // movement counter, should be equal to storageMovement.length for next and prev move fn

const startGameElement = document.querySelector('.start-game-wrapper')// start game wrapper
const cellElements = document.querySelectorAll('[data-cell]')// select cell element
const board = document.getElementById('board')//board div
const playerTurn = document.getElementsByName('choose-turn')// radio button
const winningMessageElement = document.querySelector('.modal')// winning message element
const winningMessage = document.querySelector('[data-winning-message]')// winning message
const startButton = document.getElementById('start')// start button
const restartButton = document.getElementById('reset-button')// restart button
let oTurn // circle turn

// Choose Player Fn
function chooseTurn() {
    playerTurn.forEach(radio => {
        if (radio.checked) {
            radio.value === X_CLASS ? oTurn = false : oTurn = true
        }
    })
}
// Call Start Game Fn

// startButton eventListener
startButton.addEventListener('click', startGame)
// restartButon eventListener
restartButton.addEventListener('click', () => {
    location.reload()
})

function startGame() {
    startGameElement.style.display = 'flex'
    // Need to choose who will play first (fn)
    chooseTurn()
    startGameElement.style.display = 'none'
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
        cell.innerText = ''
    })
    setHoverOnBoard()
    winningMessageElement.classList.remove('show')
    // Uncheck radio button
    playerTurn.forEach(radio => {
        radio.checked = false
    })
    // Empty storage array
    storeMovement = []
    // rest move position count
    movePosition = 0
}

// Click cell once, will not be clickable when already clicked
function handleClick(e) {
    const cell = e.target
    let currentClass
    
    if (oTurn) {
        currentClass = O_CLASS
        this.innerText = O_CLASS
    } else {
        currentClass = X_CLASS
        this.innerText = X_CLASS
    }
    // Place Mark
    placeMark(cell, currentClass)
    // Check Win
    if (checkWinner(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        // Check Draw
        endGame(true)
    } else {
        // Switch Turn
        swapTurns()
        setHoverOnBoard()
    }
}

// Store Move Fn
function storeMove(currentClass) {
    // check if cell has className 'x' || 'o'
    // store it in the 2D array
    let array1 = []
    let array2 = []
    let array3 = []

    cellElements.forEach((cell, index = 3) => {
        if (index < 3) {
            array1.push(cell.innerText)
        } else if (index >= 3 && index <= 5) {
            array2.push(cell.innerText)
        } else {
            array3.push(cell.innerText)
        }
    })
    storeMovement.push([array1, array2, array3])
    console.log(storeMovement)
}
// Check If Game Is Draw
function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        // Condition if Not Draw
        winningMessage.innerText = `${oTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
    setTimeout(() => {
        winningMessageElement.classList.remove('show')
    }, 3000);
}
// If Game is Draw
function isDraw() {
    // Destructure cellElements into an array [...cellElements] 
    // Because cellElements does not have 'every()' method
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}
// Place Mark Fn
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    storeMove(currentClass)
}
// Swap Turns
function swapTurns() {
    oTurn = !oTurn
}
// Hover Effect on Board
function setHoverOnBoard() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    oTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS)
}
// Check Winner
function checkWinner(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
// Load Cells Fn
function loadCells(movePosition) {
    // Set cells innerText to ''
    cellElements.forEach(cell => {
        cell.innerText = ''
    })

}
// Previous Move
function previousMove() {
    if (movePosition > 0) {
        movePosition--
        loadCells(movePosition)
    }
}
// Next Move
function nextMove() {
    if (movePosition >= 0 && movePosition < storeMovement.length - 1) {
        movePosition++
        loadCells(movePosition)
    }
}
