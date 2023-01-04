import React from 'react';
import ReactDom from 'react-dom/client';

import TicTacToeClass from './TicTacToeClass';
import TicTacToeHooks from './TicTacToeHooks';

ReactDom.createRoot(document.querySelector('#root')).render(<TicTacToeHooks />);
