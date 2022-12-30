import React, { useRef, useState } from 'react';

const ReactionRateClassHooks = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭하면 시작됩니다.');
  const [result, setResult] = useState([]);

  // Hooks에서는 렌더링 되지 않는 변수는 useRef()와 xxx.current를 사용해야 함
  const startTime = useRef();
  const endTime = useRef();
  const timeOut = useRef(null);

  const onClickScreen = () => {
    if (state === 'waiting') {
      // 클릭하면 게임 시작
      setState('ready');
      setMessage('초록색이 되면 클릭하세요!');
      timeOut.current = setTimeout(() => {
        setState('now');
        setMessage('지금 바로 클릭하세요!!');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      // 이 때 클릭하면 게임패배
      clearTimeout(timeOut.current);
      alert('패배! 게임을 다시 시작합니다.');
      setState('waiting');
      setMessage('클릭하면 시작됩니다.');
    } else if (state === 'now') {
      // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭하면 시작됩니다.');
      setResult(prevResult => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return !result.length ? null : (
      <div>
        반응 속도 : {result[result.length - 1]}ms
        <br />
        평균시간 : {result.reduce((a, c) => a + c) / result.length}ms
        <br />
        <button onClick={onReset}>Reset</button>
      </div>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};
export default ReactionRateClassHooks;
