const { useState, useRef } = require('react');
const React = require('react');

const WordRelayHooks = () => {
  const [word, setWord] = useState('가');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef();

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult(`딩동댕`);
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult(`땡`);
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = e => {
    setValue(e.currentTarget.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="text" value={value} onChange={onChangeInput} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelayHooks;
