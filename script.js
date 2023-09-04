"use strict"

function Gameboard() {
  let board = []

  for (let i = 0; i < 3; i++) {
    board.push([])
    for (let j = 0; j < 3; j++) {
      board[i].push('')
    }
  }

  const checkCell = (row, col) => {
    if (board[row][col] === '') {
      console.log(board[row][col])
      console.log({row, col})
      console.log('true')
      return true
    }
  }

  const getBoard = () => board

  const addMark = (row, col, currentPlayer) => {
    if (checkCell(row, col)) {
      board[row].splice(col, 1, currentPlayer)
    }
  }

  return {getBoard, addMark, checkCell}
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

  const playRound = (row, col, index) => {
    if (!board.checkCell(row, col)) return
    board.addMark(row, col, currentPlayer.mark)
    display.mark(index, currentPlayer)
    currentPlayer = switchCurrPlayer()
    printNextRound()
  }

  printNextRound()

  return {playRound, getCurrentPlayer}
}


function inputController() {
  const game = gameController()

  const display = displayController()
  
  const addMark = (cell, index) => {
    game.playRound(cell.dataset.row, cell.dataset.col, index)
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