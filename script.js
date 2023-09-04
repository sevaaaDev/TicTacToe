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
  const board = Gameboard()
  const display = displayController()

  const players = [{
    name: 'Player 1',
    mark: 'X'
  }, {
    name: 'Player 2',
    mark: 'O'
  }]

  let currentPlayer = players[0]

  const getCurrentPlayer = () => currentPlayer

  const switchCurrPlayer = () => currentPlayer === players[0] ? players[1] : players[0]

  const printNextRound = () => {
    console.table(board.getBoard())
    display.turn(currentPlayer.mark)
  }

  const playRound = (row, col) => {
    console.log(board.addMark(row, col, currentPlayer.mark))
    console.log('success')
    currentPlayer = switchCurrPlayer()
    printNextRound()
  }

  console.log(printNextRound())

  return {playRound, getCurrentPlayer}
}

function inputController() {
  const game = gameController()

  const display = displayController()
  
  const addMark = (cell, index) => {
    display.mark(index, game.getCurrentPlayer())
    game.playRound(cell.dataset.row, cell.dataset.col)
  }

  display.htmlElement.cells.forEach(function(cell, index) {
    cell.addEventListener('click', addMark.bind(null, cell, index))
  })
  
}

function displayController() {
  const htmlElement = {
    cells: document.querySelectorAll('[data-row]'),
    playerTurn: document.querySelector('.player')
  }
  
  const mark = (index, currentPlayer) => {
    htmlElement.cells[index].innerText = `${currentPlayer.mark}`
  }

  const turn = (currentPlayer) => {
    htmlElement.playerTurn.innerText = `${currentPlayer}'s Turn`
  } 

  return {htmlElement, mark, turn}
}

inputController()