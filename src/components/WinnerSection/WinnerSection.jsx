import React from 'react'
import { Square } from '../Square/Square';

export function WinnerSection({winner,resetGame}) {
    if(winner === null) return null;
    const winnerText = winner===false ? 'Draw' : 'Winner'
    return (
        <section className='winner'>
          <div className='text'>
            <h2>{winnerText}</h2>
            
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Restart</button>
            </footer>
          </div>
        </section>
  )
}

