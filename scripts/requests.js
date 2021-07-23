const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if(response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to fetch puzzle')
    }
}
/* const getPuzzleOld = (wordCount) => {
    return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
        if(response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch the puzzle')
        }
    }).then((data) => {
        return data.puzzle
    })
}
 */









