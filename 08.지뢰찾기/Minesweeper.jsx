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

/** contextAPI. 부모 자식간 데이터를 오갈 수 있게 */
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatchEvent: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: true, // true일 경우 게임 중단
};

/** 지뢰 심기 */
const plantMine = (row, cell, mine) => {
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

  /** 지뢰 생성 */
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

/** Td.jsx에서 보내온 클릭 값을 CODE.~~~ 로 변경해줌 */
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;

      let around = [];
      // 주위 8칸 중 위쪽 셀이 있을 경우
      if (tableData[action.row - 1]) {
        // 위 3개
        around = around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1]
        );
      }
      // 가운데 양 옆
      around = around.concat(tableData[action.row][action.cell - 1], tableData[action.row][action.cell + 1]);
      // 주위 8칸 중 아래쪽 셀이 있을 경우
      if (tableData[action.row + 1]) {
        // 아래 3개
        around = around.concat(
          tableData[action.row + 1][action.cell - 1],
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1]
        );
      }
      // 주위 지뢰 개수 보여줌
      const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      console.log(around, count);
      tableData[action.row][action.cell] = count;
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 클릭한 위치가 MINE이면 FLAG_MINE으로, 아니면 FLAG로 변경
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 클릭한 위치가 FLAG_MINE이면 QUESTION_MINE으로, 아니면 QUESTION 변경
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 클릭한 위치가 QUESTION_MINE이면 MINE으로, 아니면 NORMAL 변경
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }

    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  // contextAPI는 리렌더링 될 때마다 데이터를 다시 불러오면서 자식 컴포넌트들도 리랜더링 되므로 성능적으로 문제가 있을 수 있음
  // useMemo로 캐싱해주어 위 방식의 성능 저하 문제를 보완할 수 있음
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};
export default MineSearch;
