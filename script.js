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

  const playerFactory = (name1 = players[0].name, name2 = players[1].name) => {
    players[0].name = name1
    players[1].name = name2
    printNextRound()
    
  }

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
    display.turn(currentPlayer)
  }

  const playRound = (row, col, index) => {
    if (!board.checkCell(row, col)) return
    board.addMark(row, col, currentPlayer.mark)
    display.mark(index, currentPlayer)
    currentPlayer = switchCurrPlayer()
    printNextRound()
  }

  printNextRound()

  return {playRound, getCurrentPlayer, playerFactory}
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

  display.htmlElement.p1name.addEventListener('input', () => {
    game.playerFactory(display.htmlElement.p1name.value)
  })

  display.htmlElement.p2name.addEventListener('input', () => {
    game.playerFactory(display.htmlElement.p1name.value, display.htmlElement.p2name.value)
  })
}


function displayController() {
  const htmlElement = {
    cells: document.querySelectorAll('[data-row]'),
    playerTurn: document.querySelector('.player'),
    p1name: document.getElementById('name1'),
    p2name: document.getElementById('name2'),
  }
  
  const mark = (index, currentPlayer) => {
    htmlElement.cells[index].innerText = `${currentPlayer.mark}`
  }

  const turn = (currentPlayer) => {
    htmlElement.playerTurn.innerText = `${currentPlayer.name}'s Turn (${currentPlayer.mark})`
  } 

  return {htmlElement, mark, turn}
}


inputController()
window.onload = () => dialog.showModal()