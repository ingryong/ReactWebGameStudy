import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            // .map((tr,i)=>()에서 i는 몇 번째 줄인지
            <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
