import React, { PureComponent, createRef } from 'react';
import Try from './TryClass';

// 숫자 네 개를 랜덤하게 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseBall extends PureComponent {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [], // tris[{try:'',result:''}]
  };

  // 입력버튼 클릭 후 이벤트
  onSubmitForm = e => {
    e.preventDefault();
    // 비구조할당으로 this.state를 매번 쓰지 않아도 되도록 할 수 있다.
    const { value, answer, result, tries } = this.state;

    if (value === answer.join('')) {
      // 정답일 때
      this.setState(prevState => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, { try: value, result: '홈런!' }],
        };
      });
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
        result: '',
      });
    } else {
      // 오답일 때
      console.log(answer);
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
          result: '',
        });
      } else {
        // 10번 미만 틀렸을 때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState(prevState => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike}스트라이크, ${ball}볼 입니다.` }],
            value: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
    return;
  };

  onChangeInput = e => {
    this.setState({ value: e.target.value });
  };

  inputRef = createRef();

  render() {
    // 비구조할당으로 this.state를 매번 쓰지 않아도 되도록 할 수 있다.
    const { result, value, tries } = this.state;

    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
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
  }
}

export default NumberBaseBall;
