import React from 'react';
import '../css/Toolbar.css';

import DotGray from '../icons/dot-gray.svg';
import DotWhite from '../icons/dot-white.svg';

import {
  Toolbar
} from 'react-onsenui';

const NavApp = ({ navigator, currentPage }) => (
  <Toolbar className="toolbar-container" modifier="transparent">
    <div className="center">
      {currentPage.order === 1 ? <img src={DotWhite} /> : <img src={DotGray} />}
      {currentPage.order === 2 ? <img src={DotWhite} /> : <img src={DotGray} />}
      {currentPage.order === 4 ? <img src={DotWhite} /> : <img src={DotGray} />}
      {currentPage.order === 3 ? <img src={DotWhite} /> : <img src={DotGray} />}
    </div>
  </Toolbar>
);

export default NavApp;
