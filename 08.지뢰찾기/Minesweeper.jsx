import React, { useReducer } from 'react';
import Form from './Form';
import Table from './Table';

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

const reducer = (state, action) => {
  switch ((action, type)) {
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Form dispatch={dispatch} />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </>
  );
};
export default MineSearch;
