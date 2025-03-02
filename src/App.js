import React, { useState } from 'react';

import './App.css';

import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { ResetButton } from './components/ResetButton';
import { StartScreen } from './components/Inicio';

function App() {

  //Estableciendo como se gana
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  //Los 9 Cuadros Vacios
  const [board, setBoard] = useState(Array(9).fill(null));
  //Para estableces quien esta jugando si X o O
  const [xPlaying, setXPlaying] = useState(true);
  //Para ver el Score
  const [scores, setScores] = useState({xScore: 0, oScore: 0});
  //Para Resetear despues de Ganar/Perder
  const [gameOver, setGameOver] = useState(false);
  //Pantalla de Inicio
  const [pantallaInicio, setPantallaInicio] = useState(true);

  //Funcion para los clicks por turnos
  const handleBoxClick = (boxIdx) => {
    const updateBoard = board.map((value, idx) => {
      if(idx === boxIdx){
        return xPlaying === true ? "X" : "O";
      }else {
        return value;
      }
    })

    //Verificar quien gano segun la win conditions
    const winner = checkWinner(updateBoard);
    //Para contar cuantas veces a ganado cada quien
    if(winner){
      if (winner === "O"){
        let {oScore} = scores;
        oScore += 1
        setScores({...scores, oScore})
      }else{
        let {xScore} = scores;
        xScore += 1
        setScores({...scores, xScore})
      }
    }
    //Para que se marquen los x o los o
    setBoard(updateBoard);
    //Para que se ponga O en vez de X cuando X ya jugo
    setXPlaying(!xPlaying);
  }

  //Para verificar quien Gano
  const checkWinner = (board) => {
    for(let i = 0; i < WIN_CONDITIONS.length; i++){

      const [x,y,z] = WIN_CONDITIONS[i];

      if(board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        return board[x];
      }
    }
  }

  //Para Resetear el Juego despues de Gnar/Prder
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  const handleStartGame = () => {
    setPantallaInicio(false);
  };

  return (
    <div className="App">
      {pantallaInicio ? (
      <StartScreen onStart={handleStartGame}/>
      ) : (
        <>
          <ScoreBoard scores={scores} xPlaying={xPlaying}/>
          <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
          <ResetButton resetBoard={resetBoard}/>
        </>
      )}
    </div> 

  );  
}

export default App;
