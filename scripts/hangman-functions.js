const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.innerHTML = ''
    guessLettersEl.innerHTML = ''
    reminderEl.innerHTML = ''
    guessesEl.textContent = `Guesses remaining: ${game.remainingGuesses}`
    if(game.guessedLetters.length > 0) {
        guessLettersEl.textContent = 'Wrong Guesses: ' + game.wrongLetters.join(" ")
    }
    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
    if(game.guessedLetters.length === 0) {
        reminderEl.textContent = '(press any key to start guessing!)'
    }
}

const startGame = async(wordCount, difficulty) => {
    const puzzle = await getPuzzle(wordCount)
    game = new Hangman(puzzle, difficulty)
    render()
    puzzleEl.classList.remove("puzzleLose")
    puzzleEl.classList.remove("puzzleWin")
}

class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status='Playing'
        this.wrongLetters = []
    }
    get puzzle() {
        let puzzle = ''
        if(this.status === 'Playing') {
            this.word.forEach((letter) => {
                if(this.guessedLetters.includes(letter) || letter === ' ') {
                    puzzle += letter
                }
                else {
                    puzzle += '*'
                }
            })
        } else {
            this.word.forEach((letter) => {
                    puzzle += letter
            })
        }
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
    
        if(this.status !== 'Playing') {
            return
        }
    
        if(isUnique) {
            this.guessedLetters.push(guess)
        }
    
        if(isUnique && isBadGuess) {
            this.remainingGuesses--
            this.wrongLetters.push(guess)
        }
    
        this.statusGame()
    }
    statusGame() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter=== ' ')
    
        if(this.remainingGuesses === 0) {
            this.status = 'Failed'
            puzzleEl.classList.add("puzzleLose")
        }
        else if(finished) {
            this.status = 'Finished'
            puzzleEl.classList.add("puzzleWin")
        }
        else {
            this.status = 'Playing'
        }
    }
}