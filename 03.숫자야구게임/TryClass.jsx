import React, { Component } from 'react';

// 차시 로그
class Try extends Component {
  render() {
    const { index, value } = this.props;
    return (
      <li>
        {index + 1}번째 시도 [{value.try}] : {value.result}
      </li>
    );
  }
}

export default Try;
