import React from 'react';

export default function Grid({ grid, toggleCell, cssRows }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cssRows}, 20px)`,
      }}
      className='grid'
    >
      {grid.map((rows, i) =>
        rows.map((val, j) => (
          <div
            className='cell'
            key={`${i} ${j}`}
            style={{
              width: '20px',
              height: '20px',
              border: 'solid 1px black',
              backgroundColor: `${val ? 'black' : 'white'}`,
            }}
            onClick={() => toggleCell(i, j)}
          />
        ))
      )}
    </div>
  );
}
