import React from 'react';
import ReactDom from 'react-dom';

import RSPClass from './RSPClass';
import RSPHooks from './RSPHooks';

ReactDom.render(
  <>
    <RSPClass />
  </>,
  document.querySelector('#root')
);
