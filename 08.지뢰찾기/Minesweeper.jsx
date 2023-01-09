import React, { createContext, useMemo, useReducer } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 opend
};

// contextAPI. 부모 자식간 데이터를 오갈 수 있게
export const TableContext = createContext({
  tableData: [],
  dispatchEvent: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

/** 지뢰 심기 */
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  // 2차원 배열 생성
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 지뢰 생성
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // contextAPI는 리렌더링 될 때마다 데이터를 다시 불러오면서 자식 컴포넌트들도 리랜더링 되므로 성능적으로 문제가 있을 수 있음
  // useMemo로 캐싱해주어 위 방식의 성능 저하 문제를 보완할 수 있음
  const value = useMemo(
    () => ({
      tableData: state.tableData,
      dispatch,
    }),
    [state.tableData]
  );
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};
export default MineSearch;
