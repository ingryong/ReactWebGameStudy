import React, { Component } from 'react';

class ReactionRateClass extends Component {
  state = {
    state: 'waiting',
    message: '클릭하면 시작됩니다.',
    result: [],
  };
  timeout;
  startTime;
  endTime;

  onClickScreen = e => {
    const { state, result, message } = this.state;
    if (state === 'waiting') {
      // 클릭하면 게임 시작
      this.setState(() => {
        return {
          state: 'ready',
          message: '초록색이 되면 클릭하세요!',
        };
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '클릭하세요!!',
        });
        this.startTime = new Date();
        console.log(result);
      }, Math.floor(Math.random() * 1000) + 2000); // 최소 2초 이후;
    } else if (state === 'ready') {
      // 이 때 클릭하면 게임패배
      clearTimeout(this.timeout);
      alert('게임 패배! 처음으로 돌아갑니다.');
      this.setState(() => {
        return {
          state: 'waiting',
          message: '클릭하면 시작됩니다.',
          result: [],
        };
      });
    } else if (state === 'now') {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: 'waiting',
          message: '클릭하면 시작됩니다.',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  reset = () => {
    this.setState(() => {
      return {
        result: [],
      };
    });
  };

  // 평균시간 구하기
  renderAverage = () => {
    const { result } = this.state;
    return !result.length ? null : (
      <div>
        반응 속도 : {result[result.length - 1]}ms
        <br />
        평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms
        <br />
        <button onClick={this.reset}>기록 리셋</button>
      </div>
    );
  };

  render() {
    const { message, state } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}
export default ReactionRateClass;
