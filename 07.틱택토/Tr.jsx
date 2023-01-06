import React, { memo, useEffect, useRef } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex === ref.current[0], dispatch === ref.current[2], rowData === ref.current[3]);
    ref.current = [rowIndex, dispatch, rowIndex];
  }, [rowIndex, dispatch, rowData]);

  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>
            {''}
          </Td>
        ))}
    </tr>
  );
});

export default Tr;
