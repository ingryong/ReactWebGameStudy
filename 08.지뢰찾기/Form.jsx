import React, { useCallback, useState } from 'react';

/** 가로/세로/지뢰 개수 나타냄 */
const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);

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

  const onClickBtn = useCallback(() => {}, []);

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
