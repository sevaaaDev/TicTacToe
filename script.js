"use strict"

// TODO make a function that checks for winner
// TODO make a function that restart the game

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

  const restart = () => {
    board = board.map((row) => row.map((col) => col = ''))
  }

  const getBoard = () => board

  const addMark = (row, col, currentPlayer) => {
    if (checkCell(row, col)) {
      board[row].splice(col, 1, currentPlayer)
    }
  }

  return {getBoard, addMark, checkCell, restart}
}


function gameController() {
  const board = Gameboard()
  const display = displayController()

  const playerFactory = (name1, name2) => {
    players[0].name = name1 !== '' ? name1 : 'Player 1'
    players[1].name = name2 !== '' ? name2 : 'Player 2'
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

  const checkWin = () => {
    let gameboard = board.getBoard()
    // [0]0 [0]1 [0]2
    // [1]0 [1]1 [1]2
    // [2]0 [2]1 [2]2

    if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2] && gameboard[0][0] !== '') {
      console.log('win3')
      return true
    }
    
    if (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0] && gameboard[0][2] !== '') {
      console.log('win3')
      return true
    }
    
    for (let i = 0; i < 3; i++) {
      if (gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2] && gameboard[i][0] !== '') {
        console.log('win1')
        return true
      }
    }
    
    for (let i = 0; i < 3; i++) {
      if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i] && gameboard[0][i] !== '') {
        console.log('win2')
        return true
      }
    }
  }
  
  const switchCurrPlayer = () => {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1]
    } else {
      currentPlayer = players[0]
    }
  }
  
  const printNextRound = () => {
    console.table(board.getBoard())
    display.turn(currentPlayer)
  }
  
  const playRound = (row, col, index) => {
    if (!board.checkCell(row, col)) return
    board.addMark(row, col, currentPlayer.mark)
    display.mark(index, currentPlayer)
    if (checkWin()) {
      display.announceWinner(currentPlayer)
      return true
    }
    switchCurrPlayer()
    printNextRound()
  }
  
  const restart = () => {
    display.restart()
    board.restart()
    if (currentPlayer !== players[0]) {
      switchCurrPlayer()
      printNextRound()
    }
    display.htmlElement.p1name.value = ''
    display.htmlElement.p2name.value = ''
  }
  
  printNextRound()
  
  return {playRound, getCurrentPlayer, playerFactory, restart}
}


function inputController() {
  const game = gameController()

  const display = displayController()
  
  function removeListener() {
    display.htmlElement.cells.forEach(function(cell) {
      cell.removeEventListener('click', addMark)
    })
  }

  function addMark(event) {
    if (game.playRound(event.target.dataset.row, event.target.dataset.col, event.target.dataset.index)) {
      removeListener()
    }
  }
  
  display.htmlElement.cells.forEach(function(cell) {
    cell.addEventListener('click', addMark)
  })
  

  display.htmlElement.btnStart.addEventListener('click', () => {
    game.playerFactory(display.htmlElement.p1name.value, display.htmlElement.p2name.value)
  })

  display.htmlElement.btnRestart.addEventListener('click', game.restart)
}


function displayController() {
  const htmlElement = {
    cells: document.querySelectorAll('[data-row]'),
    playerTurn: document.querySelector('.player'),
    dialog: document.querySelector('dialog'),
    p1name: document.getElementById('name1'),
    p2name: document.getElementById('name2'),
    btnRestart: document.querySelector('.restart'),
    btnStart: document.querySelector('[formmethod]')
  }
  
  const mark = (index, currentPlayer) => {
    htmlElement.cells[index].innerText = `${currentPlayer.mark}`
  }
  
  const turn = (currentPlayer) => {
    htmlElement.playerTurn.innerText = `${currentPlayer.name}'s Turn (${currentPlayer.mark})`
  } 

  const restart = () => {
    htmlElement.dialog.showModal()
    for (let cell of htmlElement.cells) {
      cell.innerText = ''
    }
  }

  const announceWinner = (currentPlayer) => {
    htmlElement.playerTurn.innerText = `${currentPlayer.name} Won (${currentPlayer.mark})`
  }

  window.onload = () => htmlElement.dialog.showModal()
  
  return {htmlElement, mark, turn, restart, announceWinner}
}


inputController()