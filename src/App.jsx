import { useState } from 'react';
import './App.css'
//React components are regular JavaScript functions, but their names must start with a capital letter or they won’t work!
//There can be only one return statement in the component or else they must be wrapped in a enclosing tag i.e, a fragemnt or div. We cannot have adjacent jsx.

//creating a component for squares in tic-tac-toe game

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);
  //console.log('value', value)

  // function handleClick () {
  //   setValue('X')
  //   // alert(`${value} is clicked`)
  // }

  //console.log(`square rendered`)
  return <button onClick={onSquareClick} className='square'>{value}</button>
}

//creating a component for board in tic-tac-toe game
function Board({ xIsNext, squares, onPlay }) {
  //console.log(`Board rendered`)
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // const [xIsNext, setXIsNext] = useState(true);

  console.log('squares', squares)

  //function to handle clicks of squares
  function handleClick(i) {
    console.log(i, "is clicked")

    if (squares[i] || calculateWinner(squares)) return; //if the square already has an element then it will return inshort stops the value from being updated again.

    //creating a copy of squares state 
    const updatedSquares = squares.slice();

    //flips to "X" and "O"
    if (xIsNext) {
      updatedSquares[i] = 'X';
    }
    else {
      updatedSquares[i] = 'O';
    }

    // setXIsNext(!xIsNext);
    // setSquares(updatedSquares);

    onPlay(updatedSquares);
  }

  const winner = calculateWinner(squares);
  console.log('winner', winner)

  let status;
  if (winner) {
    status = `🥳 Winner is You my Friend! that is: ${winner} 🥳`
  }
  //checking for the condition that all the squares are filled
  else if (squares.every(square => square !== null)) {
    status = `😐 Hoho!! It's a draw 🥹 Try Again!! 🙂`
  }
  else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

//calculating a winner
function calculateWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    //checking for the same value in the squares
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(updatedSquares) {
    // setHistory([...history, updatedSquares]);
    //console.log("history", history)
    const nextHistory = [...history.slice(0, currentMove + 1), updatedSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = `RESET Game!`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol start="1">{moves}</ol>
      </div>
    </div>
  )
}

// function App() {
//   //console.log('App rendered')
//   return (
//     <div>
//       <h1>Tic-Tac-Toe</h1>
//       <Game />
//     </div>
//   )
// }


function App() {
  const appContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  };

  const h1Style = {
    marginBottom: '20px',
  };

  return (
    <div style={appContainerStyle}>
      <h1 style={h1Style}>Tic-Tac-Toe</h1>
      <Game />
    </div>
  );
}


export default App