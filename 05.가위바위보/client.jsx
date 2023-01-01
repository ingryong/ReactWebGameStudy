import React from 'react';
import ReactDom from 'react-dom/client';

import RSPClass from './RSPClass';
import RSPHooks from './RSPHooks';

ReactDom.createRoot(document.querySelector('#root')).render(<RSPHooks />);
