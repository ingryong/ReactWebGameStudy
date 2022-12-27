import React from 'react';
import ReactDom from 'react-dom';

import NumberBaseBallClass from './NumberBaseBallClass';
import NumberBaseBallHooks from './NumberBaseBallHooks';
import Test from './RenderTest';

ReactDom.render(
  <>
    <NumberBaseBallHooks />
    <Test />
  </>,
  document.querySelector('#root')
);
