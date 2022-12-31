import React, { useEffect, useRef, useState } from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSPHooks = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);

  const interval = useRef();
  const onoff = useRef(true);

  /*
  Hooks는 라이프사이클이 없지만 useEffect를 사용해서 흉내를 낼 수 있다.
  useEffect에서 작성된 코드는 componentDidMount, componentDidUpdate 역할을 함(1대1 대응은 아님)
  useEffect의 return()=>{}에서 componentWillUnmount 역할을 한다.
  */
  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할
    interval.current = setInterval(changeHand, 80);
    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]); // 이 배열에 들어가는 state가 변동되면 다시 실행

  // 컴퓨터 가위/바위/보 돌아가게
  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  // 가위/바위/보 클릭 시 이벤트
  const onClickBtn = choice => () => {
    if (onoff.current === true) {
      onoff.current = false;
      clearInterval(interval.current);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult('비겼습니다.');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다.');
        setScore(prevScore => prevScore + 1);
      } else {
        setResult('졌습니다.');
        setScore(prevScore => prevScore - 1);
      }
      setTimeout(() => {
        interval.current = setInterval(changeHand, 80);
        onoff.current = true;
      }, 1000);
    }
  };
  return (
    <>
      <div
        id="computer"
        style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};
export default RSPHooks;
