let origBoard;
let huPlayer = "";
let aiPlayer = "";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
const tic = document.querySelector(".tic");
const toe = document.querySelector(".toe");

// CHOOSE SIDE (X OR O)

function chooseTic() {
  huPlayer = "X";
  aiPlayer = "O";
  document.querySelector(".startGameWindow").style.display = "none";
  document.querySelector("table").style.display = "block";
  return huPlayer, aiPlayer;
}

tic.addEventListener("click", chooseTic);

function chooseToe() {
  huPlayer = "O";
  aiPlayer = "X";
  document.querySelector(".startGameWindow").style.display = "none";
  document.querySelector("table").style.display = "block";
  turn(randomInteger(0, 8), aiPlayer);
  return huPlayer, aiPlayer;
}

toe.addEventListener("click", chooseToe);

// RANDOM INTEGER

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// START GAME

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  document.querySelector(".startGameWindow").style.display = "block";
  document.querySelector("table").style.display = "none";

  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

// CHECK MOVE

function turnClick(square) {
  if (typeof origBoard[square.target.id] == "number") {
    turn(square.target.id, huPlayer);
    if (!checkWin(origBoard, huPlayer) && !checkTie())
      turn(bestSpot(), aiPlayer);
    if (emptySquares().length == 0) checkWin(origBoard, aiPlayer) || checkTie();
    if (emptySquares().length == 0)
      checkWin(origBoard, aiPlayer) || resultTable("Tie", 9);
    if (
      emptySquares().length == 0 &&
      !checkWin(origBoard, aiPlayer) &&
      checkTie()
    )
      playAudioTie();
  }
}

// TURN SIDE

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  if (player === aiPlayer) {
    playAudioToe();
  } else {
    playAudioTic();
  }
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  if (gameWon) {
    playAudioEnd();
  }
}

// CHECK WIN

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }

  return gameWon;
}

function gameOver(gameWon) {
  let emptySquaresLocal = 8 - (emptySquares().length - 1);
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "rgb(0,204,255)" : "rgb(255,51,51)";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(
    gameWon.player == huPlayer
      ? `Win ${gameWon.player}. Moves: ${emptySquaresLocal}`
      : `Win ${gameWon.player}. Moves: ${emptySquaresLocal}`
  );
  resultTable(gameWon.player, emptySquaresLocal);
}

// CREATE RESULT

arrPlayerLocalStorage = []; // FOR LOCAL STORAGE
arrMovesLocalStorage = []; // FOR LOCAL STORAGE

function resultTable(player, numberMove) {
  const result = { userName: player, score: numberMove };
  const savedScores = localStorage.getItem("highScore") || "[]";
  const highScores = [...JSON.parse(savedScores), result];
  localStorage.setItem("highScore", JSON.stringify(highScores));
  let results = JSON.parse(localStorage.highScore);
  let arrPlayer = [];
  let arrMoves = [];
  for (let keys in results) {
    arrPlayer.unshift(results[keys]["userName"]);
    arrMoves.unshift(results[keys]["score"]);
  }

  if (arrPlayer.length > 10) {
    arrPlayer.splice(10, arrPlayer.length - 1);
    arrMoves.splice(10, arrMoves.length - 1);
  }

  resultTableShow(arrPlayer, arrMoves);

  return (arrPlayerLocalStorage = arrPlayer), (arrMovesLocalStorage = arrMoves); // FOR LOCAL STORAGE
}

// DISPLAY RESULT

function resultTableShow(arrPlayerShow, arrMovesShow) {
  let elements = document.querySelectorAll("#tableResult tr");

  if (elements.length > 0 && elements.length < 11) {
    for (let i = 0; i < arrPlayerShow.length; i++) {
      tableResult.insertAdjacentHTML(
        "beforeend",
        `<tr><td>${arrPlayerShow[i]}</td><td>${arrMovesShow[i]}</td></tr>`
      );
    }
    for (j = arrPlayerShow.length - 1; j > 0; j--) {
      document.getElementById("tableRes").deleteRow(1);
    }
  }
  if (elements.length >= 11) {
    for (let i = 0; i < arrPlayerShow.length; i++) {
      document.getElementById("tableRes").deleteRow(1);

      tableResult.insertAdjacentHTML(
        "beforeend",
        `<tr><td>${arrPlayerShow[i]}</td><td>${arrMovesShow[i]}</td></tr>`
      );
    }
  }
}

//SAVE IN LOCAL STORAGE

function setLocalStorage() {
  localStorage.setItem("arrPlayer", JSON.stringify(arrPlayerLocalStorage));
  localStorage.setItem("arrMoves", JSON.stringify(arrMovesLocalStorage));
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  const arrPlayer = JSON.parse(localStorage.getItem("arrPlayer"));
  const arrMoves = JSON.parse(localStorage.getItem("arrMoves"));

  if (arrPlayer.length > 0) {
    for (let i = 0; i < arrPlayer.length; i++) {
      tableResult.insertAdjacentHTML(
        "beforeend",
        `<tr><td>${arrPlayer[i]}</td><td>${arrMoves[i]}</td></tr>`
      );
    }
  }
  return (arrPlayerLocalStorage = arrPlayer), (arrMovesLocalStorage = arrMoves);
}

window.addEventListener("load", getLocalStorage);

// DISPLAY WINNER

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

// FIND EMPTY SQUARES

function emptySquares() {
  return origBoard.filter((s) => typeof s == "number");
}

// RESULT MINIMAX (AI)

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

// CHECKTIE

function checkTie() {
  let emptySquaresLocal = 8 - (emptySquares().length - 1);
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "rgb(0,255,102)";
      cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner(`Tie Game. Moves: ${emptySquaresLocal}`);

    return true;
  }
  return false;
}

// AI

function minimax(newBoard, player) {
  var availSpots = emptySquares();

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// PLAY AUDIO

const audioTic = new Audio();

function playAudioTic() {
  audioTic.src = "./assets/audio/tic.mp3";
  audioTic.currentTime = 0;
  audioTic.play();
}

const audioToe = new Audio();

function playAudioToe() {
  audioToe.src = "./assets/audio/toe.mp3";
  audioToe.currentTime = 0;
  audioToe.play();
}

const audioTie = new Audio();

function playAudioTie() {
  audioTie.src = "./assets/audio/tie.mp3";
  audioTie.currentTime = 0;
  audioTie.play();
}

const audioEnd = new Audio();

function playAudioEnd() {
  audioTie.src = "./assets/audio/end.mp3";
  audioTie.currentTime = 0;
  audioTie.play();
}

// CONSOLE.LOG

console.log(`
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
Итого 70
`)