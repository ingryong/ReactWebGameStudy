import React from 'react';
import ReactDom from 'react-dom/client';

import Minesweeper from './Minesweeper';

ReactDom.createRoot(document.querySelector('#root')).render(<Minesweeper />);
