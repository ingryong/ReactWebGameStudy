import React, { Component } from 'react';
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
class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨공
    winBalls: [],
    bonus: null, // 보너스공
    redo: false,
  };

  timeouts = [];

  /** 로또 추첨진행 */
  runTimeouts = () => {
    console.log('runTimeouts');
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    console.log('didMount');
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate');
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach(v => {
      clearTimeout(v);
    });
  }

  /** 처음으로 초기화 */
  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
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
        <div>{redo && <button onClick={this.onClickRedo}>한 번 더!</button>}</div>
      </>
    );
  }
}
export default LottoClass;
