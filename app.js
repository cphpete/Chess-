// Chess Trainer Component
const ChessTrainer = () => {
  const [board, setBoard] = React.useState(Array(8).fill().map(() => Array(8).fill(null)));
  const [selectedPiece, setSelectedPiece] = React.useState(null);
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  
  // Skak konstanter
  const PIECES = {
    WHITE_KING: '♔',
    BLACK_KING: '♚',
    WHITE_PAWN: '♙',
    BLACK_PAWN: '♟',
  };

  const SCENARIOS = {
    opposition: {
      title: 'Opposition',
      description: 'Øv dig i at bruge opposition med konger',
      position: {
        'e4': 'WHITE_KING',
        'e6': 'BLACK_KING',
      }
    }
  };

  // Initialisér brættet
  React.useEffect(() => {
    const newBoard = Array(8).fill().map(() => Array(8).fill(null));
    const scenario = SCENARIOS.opposition;
    
    Object.entries(scenario.position).forEach(([square, piece]) => {
      const [file, rank] = square.split('');
      const x = file.charCodeAt(0) - 'a'.charCodeAt(0);
      const y = 8 - parseInt(rank);
      newBoard[y][x] = PIECES[piece];
    });
    
    setBoard(newBoard);
  }, []);

  // Håndter klik på bræt
  const handleSquareClick = (row, col) => {
    if (selectedPiece && selectedSquare) {
      const newBoard = [...board];
      newBoard[row][col] = selectedPiece;
      const [oldRow, oldCol] = selectedSquare;
      newBoard[oldRow][oldCol] = null;
      setBoard(newBoard);
      setSelectedPiece(null);
      setSelectedSquare(null);
    } else if (board[row][col]) {
      setSelectedPiece(board[row][col]);
      setSelectedSquare([row, col]);
    }
  };

  return React.createElement('div', { className: 'p-4' },
    React.createElement('h1', { className: 'text-2xl font-bold mb-4' }, 'Slutspils Træner'),
    React.createElement('div', { className: 'grid grid-cols-8 gap-0 border-2 border-gray-800' },
      board.map((row, rowIndex) => 
        row.map((piece, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected = selectedSquare && 
            selectedSquare[0] === rowIndex && 
            selectedSquare[1] === colIndex;
          
          return React.createElement('div', {
            key: `${rowIndex}-${colIndex}`,
            className: `
              w-12 h-12 flex items-center justify-center text-3xl cursor-pointer
              ${isLight ? 'bg-amber-200' : 'bg-amber-800'}
              ${isSelected ? 'bg-green-300' : ''}
              ${selectedPiece ? 'hover:bg-green-200' : ''}
            `,
            onClick: () => handleSquareClick(rowIndex, colIndex)
          }, piece);
        })
      )
    )
  );
};

// Render applikationen
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ChessTrainer));