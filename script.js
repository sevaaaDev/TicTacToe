"use strict";

// TODO Highlight winning mark

function Gameboard() {
  let board = [];

  for (let i = 0; i < 3; i++) {
    board.push([]);
    for (let j = 0; j < 3; j++) {
      board[i].push("");
    }
  }

  const checkCell = (row, col) => {
    if (board[row][col] === "") {
      return true;
    }
  };

  const restart = () => {
    board = board.map((row) => row.map((col) => (col = "")));
  };

  const getBoard = () => board;

  const addMark = (row, col, currentPlayer) => {
    if (checkCell(row, col)) {
      board[row].splice(col, 1, currentPlayer);
    }
  };

  return { getBoard, addMark, checkCell, restart };
}

function gameController() {
  const board = Gameboard();
  const display = displayController();

  const playerFactory = (name1, name2) => {
    players[0].name = name1 !== "" ? name1 : "Player 1";
    players[1].name = name2 !== "" ? name2 : "Player 2";
    printNextRound();
  };

  const players = [
    {
      name: "Player 1",
      mark: "X",
    },
    {
      name: "Player 2",
      mark: "O",
    },
  ];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const checkWin = () => {
    let gameboard = board.getBoard();
    if (
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2] &&
      gameboard[0][0] !== ""
    ) {
      return "win";
    }

    if (
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0] &&
      gameboard[0][2] !== ""
    ) {
      return "win";
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameboard[i][0] === gameboard[i][1] &&
        gameboard[i][1] === gameboard[i][2] &&
        gameboard[i][0] !== ""
      ) {
        return "win";
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameboard[0][i] === gameboard[1][i] &&
        gameboard[1][i] === gameboard[2][i] &&
        gameboard[0][i] !== ""
      ) {
        return "win";
      }
    }

    if (
      !(
        gameboard[0].includes("") ||
        gameboard[1].includes("") ||
        gameboard[2].includes("")
      )
    ) {
      return "draw";
    }
  };

  const switchCurrPlayer = () => {
    if (currentPlayer === players[0]) {
      currentPlayer = players[1];
    } else {
      currentPlayer = players[0];
    }
  };

  const printNextRound = () => {
    display.turn(currentPlayer);
  };

  const playRound = (row, col, index) => {
    if (!board.checkCell(row, col)) return;
    board.addMark(row, col, currentPlayer.mark);
    display.mark(index, currentPlayer);
    if (checkWin() === "win") {
      display.announceWinner(currentPlayer);
      return true;
    }
    if (checkWin() === "draw") {
      display.announceDraw();
      return true;
    }
    switchCurrPlayer();
    printNextRound();
  };

  const restart = () => {
    display.restart();
    board.restart();
    if (currentPlayer !== players[0]) {
      switchCurrPlayer();
      printNextRound();
    }
  };

  printNextRound();

  return { playRound, getCurrentPlayer, playerFactory, restart };
}

function inputController() {
  const game = gameController();

  const display = displayController();

  function removeListener() {
    display.htmlElement.cells.forEach(function (cell) {
      cell.removeEventListener("click", addMark);
    });
  }

  function addMark(event) {
    if (
      game.playRound(
        event.target.dataset.row,
        event.target.dataset.col,
        event.target.dataset.index
      )
    ) {
      removeListener();
    }
  }

  display.htmlElement.btnStart.addEventListener("click", () => {
    game.playerFactory(
      display.htmlElement.p1name.value,
      display.htmlElement.p2name.value
    );
    display.htmlElement.cells.forEach(function (cell) {
      cell.addEventListener("click", addMark);
    });
    display.htmlElement.menuUi.classList.add('invisible')
    display.htmlElement.playUi.classList.remove('invisible')
  });

  display.htmlElement.btnRestart.addEventListener("click", game.restart);
}

function displayController() {
  const htmlElement = {
    cells: document.querySelectorAll("[data-row]"),
    playerTurn: document.querySelector(".player"),
    p1name: document.getElementById("name1"),
    p2name: document.getElementById("name2"),
    btnRestart: document.querySelector(".restart"),
    btnStart: document.querySelector("[formmethod]"),
    playUi: document.querySelector('.play'),
    menuUi: document.querySelector('.menu')
  };

  const mark = (index, currentPlayer) => {
    htmlElement.cells[index].innerText = `${currentPlayer.mark}`;
  };

  const turn = (currentPlayer) => {
    htmlElement.playerTurn.innerText = `${currentPlayer.name}'s Turn (${currentPlayer.mark})`;
  };

  const restart = () => {
    htmlElement.playUi.classList.add('invisible');
    htmlElement.menuUi.classList.remove('invisible');
    for (let cell of htmlElement.cells) {
      cell.innerText = "";
    }
  };

  const announceWinner = (currentPlayer) => {
    htmlElement.playerTurn.innerText = `${currentPlayer.name} Won (${currentPlayer.mark})`;
  };

  const announceDraw = () => {
    htmlElement.playerTurn.innerText = `It's a draw`;
  };

  return { htmlElement, mark, turn, restart, announceWinner, announceDraw };
}

inputController();
