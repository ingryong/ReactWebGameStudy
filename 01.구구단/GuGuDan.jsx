const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const inputRef = useRef();

  const onSubmitForm = e => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(`${first} x ${second} = ${value} 정답!`);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      setScore(score + 1);
      inputRef.current.focus();
    } else {
      setResult(`${first} x ${second} = ${value} 땡!`);
      setValue('');
      setScore(score - 1);
      inputRef.current.focus();
    }
  };
  const onchangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onchangeInput} type="number" value={value} />
        <button>입력</button>
      </form>
      <div>점수 : {score}</div>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
