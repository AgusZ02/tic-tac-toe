
import { Component, useState } from 'react';
import './App.css'


const TURNS = {
  X:'X',
  O:'O'
};

const WINNER_COMBOS = [
  [0,3,6], //Columna 1
  [1,4,7], //Columna 2
  [2,5,8], //Columna 3
  [0,1,2], //Fila 1
  [3,4,5], //Fila 2
  [6,7,8], //Fila 3
  [0,4,8], //Diag 1
  [2,4,6]  //Diag 2
]


const Square = ({children, isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index);

  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );

};

function App() {
  
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  //null -> No hay ganador, false -> empate 
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) =>{
    if (tablero[index] || winner) { //si el elemento no es null, no lo debo modificar
      return;
    }

    //creas una copia del tablero
    const newTablero = [... tablero];
    //indicas el indice que debe cambiar y le asignas el turno(X | O)
    newTablero[index] = turn;
    //Reescribes el tablero
    
    setTablero(newTablero);
    //Si el turno es X, entocnes pasa a O, sino X
    const newTurn = turn ===TURNS.X ? TURNS.O : TURNS.X;
    //Reescribe el turno
    setTurn(newTurn);
    const newWinner = checkWin(newTablero);
    if(newWinner){
      setWinner(newWinner);
    }
  }

  const checkWin = (board) =>{
    for(let i = 0; i < WINNER_COMBOS.length; i++){
      const [a, b, c] = WINNER_COMBOS[i];
      if (
        board[a]&&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  }

  const resetGame =() =>{
    setTablero(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          tablero.map((_, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {tablero[index]}
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
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner===false ? 'Empate' : 'Ganó'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )

      }
    </main>
  )
}

export default App
