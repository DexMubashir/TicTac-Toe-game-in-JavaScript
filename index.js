
'use strict';
const displayStatus = document.querySelector('.status');
let gameActive = true;
let currentPlayer = "X";
let gameStatus =["","","","","","","","",""];
const winningMessage = () => `Player ${currentPlayer} won`;
const drawMessage = () => 'Game tied';
const currentPlayerTurn = () => `It is ${currentPlayer}'s turn`;
displayStatus.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if(gameStatus[clickedCellIndex] !== "" || !gameActive ){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameStatus[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation(){
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameStatus[winningCondition[0]];
        let b = gameStatus[winningCondition[1]];
        let c = gameStatus[winningCondition[2]];
        if(a === ''  || c === ''){
            continue;
        }
        if (a === b && b ===c){
            roundWon = true;
            break;
        }
    }
    if (roundWon){
        displayStatus.innerHTML = winningMessage();
        gameActive =false;
        return;
    }
    let roundDraw = !gameStatus.includes("");
    if (roundDraw){
        displayStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayStatus.innerHTML = currentPlayerTurn();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameStatus = ["","","","","","","","",""];
    displayStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.button').addEventListener('click', handleRestartGame);
