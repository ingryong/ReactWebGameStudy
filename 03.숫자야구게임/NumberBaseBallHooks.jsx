import React, { Component, useState } from 'react';
import Try from './TryHooks';

// 숫자 네 개를 랜덤하게 뽑는 함수
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseBall = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);

  // 입력버튼 클릭 후 이벤트
  const onSubmitForm = e => {
    e.preventDefault();
    // 비구조할당으로 this.state를 매번 쓰지 않아도 되도록 할 수 있다.

    if (value === answer.join('')) {
      // 정답일 때
      setResult(`홈런!`);
      setTries(prevTries => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      setTimeout(() => {
        alert('홈런! 게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        setResult('');
      }, 500);
    } else {
      // 오답일 때
      console.log(answer);
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        setResult(`10회 실패! 정답은 ${answer.join(',')}입니다!`);
        setTimeout(() => {
          alert('패배! 게임을 다시 시작합니다!');
          setValue('');
          setAnswer(getNumbers());
          setTries([]);
          setResult('');
        }, 500);
      } else {
        // 10번 미만 틀렸을 때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries(prevTries => [...prevTries, { try: value, result: `${strike}스트라이크, ${ball}볼 입니다.` }]);
        setValue('');
      }
    }
    return;
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도`} value={v} index={i} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseBall;
