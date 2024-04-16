import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Grid from './components/Grid';
import './styles.scss';

export default function GameOfLife() {
  const [cssRows, setCssRows] = useState(25);
  const [row, setRow] = useState(25);
  const [col, setCol] = useState(25);
  const [grid, setGrid] = useState(() =>
    Array.from({ length: row }, () => Array.from({ length: col }, () => 0))
  );

  const [run, setRun] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setInputSpeed] = useState(100);

  // for manual and automatic toggling of cell values
  const toggleCell = (x, y) => {
    setGrid(
      produce(grid, newGrid => {
        newGrid[x][y] = !grid[x][y];
      })
    );
  };

  // customize grid dimensions
  const updateDimensions = () => {
    setCssRows(row);
    setGrid(() =>
      Array.from({ length: row }, () => Array.from({ length: col }, () => 0))
    );
  };

  const toggleRun = () => {
    setRun(prevRun => !prevRun);
  };

  const randomPopulate = () => {
    setGrid(prevGrid =>
      produce(prevGrid, newGrid => {
        for (let x = 0; x < row; x++) {
          for (let y = 0; y < col; y++) {
            newGrid[x][y] = Math.random() > 0.5 ? 1 : 0; // Adjust probability as needed
          }
        }
      })
    );
  };

  const clear = () => {
    setGrid(prevGrid =>
      produce(prevGrid, newGrid => {
        for (let x = 0; x < row; x++) {
          for (let y = 0; y < col; y++) {
            newGrid[x][y] = 0;
          }
        }
      })
    );
  };

  useEffect(() => {
    let runGame;
    if (run) {
      runGame = setInterval(() => {
        setGrid(prevGrid => game(prevGrid));
        setGeneration(prevGeneration => prevGeneration + 1);
      }, speed);
    } else {
      clearInterval(runGame);
    }
    return () => clearInterval(runGame);
  }, [run, speed]);

  // game of life logic
  const game = g => {
    console.log('in game function');
    return produce(g, newGrid => {
      // one of two state - alive (black) or dead (white)
      for (let x = 0; x < row; x++) {
        for (let y = 0; y < col; y++) {
          const livingNeighbors = getAliveNeighbors(
            g,
            x,
            y,
            g.length,
            g[0].length
          );
          if (g[x][y]) {
            // curr cell is alive
            // any living cell with fewer than two living neighbor dies
            // any living cell with two || three neighbors lives into the next gen
            // any living cell with more than three neighbor dies
            newGrid[x][y] =
              livingNeighbors === 2 || livingNeighbors === 3 ? 1 : 0;
          } else {
            // Any dead cell with exactly three live neighbors becomes a live cell.
            newGrid[x][y] = livingNeighbors === 3 ? 1 : 0;
          }
        }
      }
    });
  };

  const getAliveNeighbors = (currGrid, x, y, rowSize, colSize) => {
    let countAlive = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let r = x + i;
        let c = y + j;
        // skips anything that goes past the perimeter of the grid and skips counting the cell we're checking itself
        if (
          r < 0 ||
          r + 1 > rowSize ||
          c < 0 ||
          c + 1 > colSize ||
          (r === x && c === y)
        ) {
          continue;
        }
        countAlive += currGrid[r][c] ? 1 : 0;
      }
    }
    return countAlive;
  };

  const handleRowChange = e => {
    const newRow = parseInt(e.target.value);
    if (Number.isInteger(newRow) && newRow > 0 && newRow <= 100) {
      setRow(newRow);
    }
  };

  const handleColChange = e => {
    const newCol = parseInt(e.target.value);
    if (Number.isInteger(newCol) && newCol > 0 && newCol <= 100) {
      setCol(newCol);
    }
  };

  const handleInputSpeed = e => {
    const newSpeed = parseInt(e.target.value);
    if (Number.isInteger(newSpeed)) {
      setInputSpeed(newSpeed);
    }
  };

  return (
    <div
      className='game-of-life'
      style={{ width: 'fit-content', margin: '0 auto', textAlign: 'center' }}
    >
      <h1>Game of Life</h1>
      <Grid grid={grid} toggleCell={toggleCell} cssRows={cssRows} />
      <div className='enter-dimensions-container'>
        <input
          type='number'
          id='row'
          name='row'
          onChange={handleRowChange}
          placeholder={`Enter row: ${row}`}
        />
        <input
          type='number'
          id='col'
          name='col'
          onChange={handleColChange}
          placeholder={`Enter col: ${col}`}
        />
        <button onClick={updateDimensions}>submit</button>
      </div>
      <div className='running-container'>
        <input
          type='number'
          id='speed'
          name='row'
          onChange={handleInputSpeed}
          placeholder={`Enter speed: ${speed}ms`}
        />
        <button onClick={toggleRun}>{run ? 'stop' : 'run'}</button>
        <button onClick={randomPopulate}>randomize</button>
        <button onClick={clear}>clear</button>
      </div>
    </div>
  );
}
