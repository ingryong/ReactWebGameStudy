import React, { Component } from 'react';

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

class RSPClass extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;
  onoff = true;

  /*
  # React Class에서 라이프사이클

  ## 첫 실행일 때
  constructor(state나 메서드들 실행) -> 첫 render 실행 -> ref -> componentDidMount 실행

  ## 이 후 업데이트 될 때
  setState/props 업데이트 -> shouldComponentUpdate(true일때) -> render -> componentDidUpdate

  # 부모가 나를 없앴을 때 
  componentWillUnmount -> 소멸

  */

  componentDidMount() {
    // 렌더가 처음 실행되고 componentDidMount가 실행된다. 리랜더링시에는 실행되지 않는다.
    this.interval = setInterval(this.changeHand, 80);
  }

  componentDidUpdate() {
    // 리랜더링시 실행된다.
  }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전에 실행된다.
    clearInterval(this.interval);
  }

  // 컴퓨터 가위/바위/보 돌아가게
  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  // 가위/바위/보 클릭 시 이벤트
  onClickBtn = choice => () => {
    if (this.onoff === true) {
      this.onoff = false;
      clearInterval(this.interval);
      const { imgCoord } = this.state;
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        this.setState({
          result: '비겼습니다.',
        });
      } else if ([-1, 2].includes(diff)) {
        this.setState(prevState => {
          return {
            result: '이겼습니다.',
            score: prevState.score + 1,
          };
        });
      } else {
        this.setState(prevState => {
          return {
            result: '졌습니다.',
            score: prevState.score - 1,
          };
        });
      }
      setTimeout(() => {
        this.interval = setInterval(this.changeHand, 80);
        this.onoff = true;
      }, 1000);
    }
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
        ></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>
            바위
          </button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSPClass;
