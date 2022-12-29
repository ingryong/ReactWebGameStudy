import React from 'react';
import ReactDom from 'react-dom';

import ReactionRateClass from './ReactionRateClass';
import ReactionRateHooks from './ReactionRateHooks';

ReactDom.render(
  <>
    <ReactionRateClass />
  </>,
  document.querySelector('#root')
);
