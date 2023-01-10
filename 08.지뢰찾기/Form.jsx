import React, { useCallback, useContext, useState } from 'react';
import { START_GAME, TableContext } from './Minesweeper';

/** 가로/세로/지뢰 개수 나타냄 */
const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  /** 세로 개수 변경 */
  const onChangeRow = useCallback(e => {
    setRow(e.target.value);
  }, []);
  /** 가로 개수 변경 */
  const onChangeCell = useCallback(e => {
    setCell(e.target.value);
  }, []);
  /** 지뢰 개수 변경 */
  const onChangeMine = useCallback(e => {
    setMine(e.target.value);
  }, []);

  /** 시작 버튼 클릭 시 input에 담긴 정보와 START_GAME을 보냄 */
  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
};
export default Form;
