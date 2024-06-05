
import './App.css'
import { useState } from 'react';
import { Square } from '../Square/Square';
import { TURNS } from '../../Constants';
import { checkWin } from '../../logic/board';
import { WinnerSection } from '../WinnerSection/WinnerSection';
function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  //null -> No hay ganador, false -> empate 
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) =>{
    if (board[index] || winner) { //si el elemento no es null, no lo debo modificar
      return;
    }

    //creas una copia del Board
    const newBoard = [... board];
    //indicas el indice que debe cambiar y le asignas el turno(X | O)
    newBoard[index] = turn;
    //Reescribes el Board
    
    setBoard(newBoard);
    //Si el turno es X, entocnes pasa a O, sino X
    const newTurn = turn ===TURNS.X ? TURNS.O : TURNS.X;
    //Reescribe el turno
    setTurn(newTurn);
    const newWinner = checkWin(newBoard);
    if(newWinner){
      setWinner(newWinner);
    } else {
      if(checkDraw(newBoard)){
        setWinner(false);
      }
    }
    
  }

  const checkDraw = (board) =>{
    return !board.includes(null);
  }

  const resetGame =() =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })
        }  
      </section>
      <section className='turn'>
        <Square isSelected={turn ===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn ===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerSection winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
