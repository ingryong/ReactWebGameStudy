import React, { Component } from 'react';
import Table from './Table';

class TicTacToeClass extends Component {
  state = {
    winner: '',
  };
  render() {
    const { winner } = this.state;
    return (
      <>
        <Table />
        {winner && <div>{winner}님의 승리</div>}
      </>
    );
  }
}

export default TicTacToeClass;
