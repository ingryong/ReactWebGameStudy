const React = require('react');
const ReactDom = require('react-dom');

const GuGuDan = require('./GuGuDan');
const GuGuDanTitle = require('./GuGuDanTitle');

ReactDom.render(
  <>
    <GuGuDanTitle />
    <GuGuDan />
  </>,
  document.querySelector('#root')
);
