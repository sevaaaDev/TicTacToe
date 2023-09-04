function Gameboard() {
  let board = []

  for (let i = 0; i < 3; i++) {
    board.push([])
    for (let j = 0; j < 3; j++) {
      board[i].push('')
    }
  }

  const getBoard = () => board

  const addMark = (row, col, currentPlayer) => {
    board[row].splice(col, 1, currentPlayer)
    return `Add mark ${currentPlayer} to row ${row}, col ${col}`
  }

  return {getBoard, addMark}
}

function gameController() {
  let board = Gameboard()

  const players = [{
    name: 'Player 1',
    mark: 'X'
  }, {
    name: 'Player 2',
    mark: 'O'
  }]

  let currentPlayer = players[0]

  const switchCurrPlayer = () => currentPlayer === players[0] ? players[1] : players[0]

  const printNextRound = () => {
    console.table(board.getBoard())
    return `${currentPlayer.mark}'s Turn`
  }

  const playRound = (row, col) => {
    console.log(board.addMark(row, col, currentPlayer.mark))
    console.log('success')
    currentPlayer = switchCurrPlayer()
    console.log(printNextRound())
  }

  console.log(printNextRound())

  return {playRound}
}

const game = gameController()

