import React, { useState } from 'react'

const ChessBoard = () => {
  const [position, setPosition] = useState('opposition')
  const [board, setBoard] = useState(Array(8).fill().map(() => Array(8).fill(null)))
  const [selectedSquare, setSelectedSquare] = useState(null)

  const pieces = {
    whiteKing: '♔',
    blackKing: '♚',
    whiteRook: '♖',
    blackRook: '♜',
    whitePawn: '♙'
  }

  const positions = {
    opposition: {
      pieces: {
        'e4': { piece: 'whiteKing', color: 'white' },
        'e6': { piece: 'blackKing', color: 'black' }
      },
      description: 'Opposition: Tving den sorte konge tilbage'
    },
    lucena: {
      pieces: {
        'e2': { piece: 'whiteKing', color: 'white' },
        'e8': { piece: 'blackKing', color: 'black' },
        'h1': { piece: 'whiteRook', color: 'white' },
        'h7': { piece: 'blackRook', color: 'black' },
        'e6': { piece: 'whitePawn', color: 'white' }
      },
      description: 'Lucena: Byg broen med tårnet'
    }
  }

  const handleSquareClick = (row, col) => {
    if (selectedSquare) {
      // Flyt brik
      const newBoard = [...board]
      newBoard[row][col] = newBoard[selectedSquare.row][selectedSquare.col]
      newBoard[selectedSquare.row][selectedSquare.col] = null
      setBoard(newBoard)
      setSelectedSquare(null)
    } else if (board[row][col]?.color === 'white') {
      // Vælg brik
      setSelectedSquare({ row, col })
    }
  }

  const setupPosition = (posName) => {
    const newBoard = Array(8).fill().map(() => Array(8).fill(null))
    const pos = positions[posName]
    
    Object.entries(pos.pieces).forEach(([square, { piece, color }]) => {
      const [file, rank] = square.split('')
      const x = file.charCodeAt(0) - 'a'.charCodeAt(0)
      const y = 8 - parseInt(rank)
      newBoard[y][x] = { piece: pieces[piece], color }
    })
    
    setBoard(newBoard)
    setPosition(posName)
  }

  // Initialiser bræt når komponenten loades
  React.useEffect(() => {
    setupPosition('opposition')
  }, [])

  return (
    <div className="chess-container">
      <div className="controls">
        <button onClick={() => setupPosition('opposition')}>Opposition</button>
        <button onClick={() => setupPosition('lucena')}>Lucena</button>
      </div>

      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((square, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  square 
                  ${(i + j) % 2 ? 'dark' : 'light'}
                  ${selectedSquare?.row === i && selectedSquare?.col === j ? 'selected' : ''}
                `}
                onClick={() => handleSquareClick(i, j)}
              >
                {square?.piece}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChessBoard
