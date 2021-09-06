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
//Select cell element 
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.querySelector('.modal')
const restartButton = document.getElementById('restart-button')
const winningMessage = document.querySelector('[data-winning-message]')
let oTurn


// Call Start Game Fn
startGame()

// restartButon eventListener
restartButton.addEventListener('click', startGame)

function startGame() {
    // Need to choose who will play first (fn)
    // oTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setHoverOnBoard()
    winningMessageElement.classList.remove('show')
}

// Click cell once, will not be clickable when already clicked
function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
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
// Check If Game Is Draw
function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        // Condition if Not Draw
        winningMessage.innerText = `${oTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}
// If Game is Draw
function isDraw() {
    // Destructure cellElements into an array [...cellElements] 
    // Because cellElements does not have 'every()' method
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
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