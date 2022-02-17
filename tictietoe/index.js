let origBoard;
let huPlayer = '';
let aiPlayer = '';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const tic = document.querySelector('.tic');
const toe = document.querySelector('.toe');

// CHOOSE SIDE (X OR O)

function chooseTic() {
	huPlayer = 'X';
	aiPlayer = 'O';
	document.querySelector(".startGameWindow").style.display = "none";
	document.querySelector("table").style.display = "block";
	return huPlayer, aiPlayer;
}

tic.addEventListener('click', chooseTic);

function chooseToe() {
	huPlayer = 'O';
	aiPlayer = 'X';
	document.querySelector(".startGameWindow").style.display = "none";
	document.querySelector("table").style.display = "block";
	turn(randomInteger(0, 8), aiPlayer);
	return huPlayer, aiPlayer;
}

toe.addEventListener('click', chooseToe);

// RANDOM INTEGER

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
  }
  
// GAME

const cells = document.querySelectorAll('.cell');
startGame();



function startGame() {
	document.querySelector(".endgame").style.display = "none";
	document.querySelector(".startGameWindow").style.display = "block";
	document.querySelector("table").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
		if (emptySquares().length == 0) (checkWin(origBoard, aiPlayer) || checkTie());
		if (emptySquares().length == 0) resultTable('Tie', 9);
		
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
	
}




function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	
	return gameWon;
	
}



function gameOver(gameWon) {
	let emptySquaresLocal = 8-(emptySquares().length - 1);
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? `Win ${gameWon.player}. Moves: ${emptySquaresLocal}` : `Win ${gameWon.player}. Moves: ${emptySquaresLocal}`);
	resultTable(gameWon.player, emptySquaresLocal);
	
	
}


function resultTable(player, numberMove) {
	const result = {userName: player, score: numberMove}
	const savedScores = localStorage.getItem('highScore') || '[]'
	const highScores = [...JSON.parse(savedScores), result]
	localStorage.setItem('highScore', JSON.stringify(highScores))
	let results = JSON.parse( localStorage.highScore );
	let arrPlayer = []
	let arrMoves = []
	for (let keys in results) {
		arrPlayer.unshift(results[keys]['userName']);
		arrMoves.unshift(results[keys]['score']);
	}
	console.log(arrPlayer)
	console.log(arrMoves)
	
	
	
		  
	for(let i=0; i<10; i++) {
	  tableResult.insertAdjacentHTML('beforeend', `<tr><td>${arrPlayer[i]}</td><td>${arrMoves[i]}</td></tr>`);
	} 
	for(let i=1; i<11; i++) {
		 		
				 let firstRow = document.getElementById("tableResult1").rows[i];
				 firstRow.deleteCell(0);
				 firstRow.deleteCell(0);
				 
						
					
				 
		 	}

			 
	//  if (tableResult.rows.length > 9) {
	// 	for(let i=1; i<9; i++) {
	// 		tableResult.deleteRow(i)
	// 	}
	// }
}
		// for (let i = 0; i < 10; i++) {
	
				 
		// 		tableResult.insertAdjacentHTML('beforeend', `<tr><td>${arrPlayer[i]}</td><td>${arrMoves[i]}</td></tr>`);
		// 		arrPlayer = []
		// 		arrMoves = []
		// 	 }
			 
			
		 
	
		//  function getListContent() {
		// 	let result = [];
		  
		// 	for(let i=1; i<=10; i++) {
		// 	  let li = tableResult.insertAdjacentHTML('beforeend', `<tr><td>${arrPlayer[i]}</td><td>${arrMoves[i]}</td></tr>`);
		// 	  li.append(i);
		// 	  result.push(li);
		// 	  result.pop();
		// 	}
		  
		// 	return result;
		//   }	 
		 



	// }
	
	
	// let result = {userName: player, move: numberMove}
	// let arr = []
	// arr.push(result);
	// console.log(arr);




function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	let emptySquaresLocal = 8-(emptySquares().length - 1);
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner(`Tie Game. Moves: ${emptySquaresLocal}`)
		
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
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
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}