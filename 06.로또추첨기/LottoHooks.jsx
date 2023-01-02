import React, { useCallback, useEffect, useRef, useState } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1]; // shuffle의 마지막에 들어온 숫자가 bonusNumber(보너스번호)
  const getWinNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // shuffle의 0~6번째가 getNumbers(당첨번호)
  return [...getWinNumbers, bonusNumber];
}

const LottoHooks = () => {
  // useMemo: 복잡한 함수의 결과값을 기억
  // useRef: 일반 값을 기억
  const [winNumbers, setWinNumbers] = useState(getWinNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    // 기본적으로 componentDidMount 역할
    console.log('useEffect');
    /** 로또 추첨 진행 */
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      // return은 componentDidUnmount 역할
      timeouts.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 배열에 요소가 있으면 componentDidUpdate역할 추가

  /** 처음으로 초기화 */
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    // useCallback()은 함수 자체를 기억했다가 실행됨
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, []);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      <div>{redo && <button onClick={onClickRedo}>한 번 더!</button>}</div>
    </>
  );
};
export default LottoHooks;
