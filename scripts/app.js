let game

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
const guessLettersEl = document.querySelector('#guess-letters')
const reminderEl = document.querySelector('#reminder')

document.querySelector('#start').addEventListener('click', (e) => {
    let wordCount = document.querySelector('#word-count').value
    let difficulty = document.querySelector('#difficulty').value
    e.target.textContent = 'Reset'

    startGame(wordCount, difficulty)

    window.addEventListener('keypress', (e) => {
        const guess = String.fromCharCode(e.charCode)
        game.makeGuess(guess)
        render()
    })
})