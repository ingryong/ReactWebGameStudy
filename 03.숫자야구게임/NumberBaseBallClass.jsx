import React, { Component } from 'react';

// 숫자 네 개를 랜덤하게 뽑는 함수
function getNumbers() {}

class NumberBaseBall extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [
      { fruit: '사과', taste: '아삭하다' },
      { fruit: '바나나', taste: '부드럽다' },
      { fruit: '포도', taste: '달달하다' },
      { fruit: '딸기', taste: '새콤하다' },
      { fruit: '귤', taste: '시다' },
    ],
  };

  onSubmitForm = e => {
    return;
  };

  onChangeInput = e => {
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm} value={this.state.value} onChange={e => this.onChangeInput}>
          <input maxLength={4} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((value, index) => {
            return (
              <li key={value.fruit + value.taste}>
                {index + 1}. {value.fruit} : {value.taste}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseBall;
