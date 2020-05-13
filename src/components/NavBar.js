import React from 'react';
import '../css/Toolbar.css';

import DotGray from '../icons/dot-gray.svg';
import DotWhite from '../icons/dot-white.svg';

import {
  Toolbar
} from 'react-onsenui';

const NavApp = ({ navigator }) => (
  <Toolbar className="toolbar-container" modifier="transparent">
    <div className="center">
      <img src={DotGray} />
      <img src={DotGray} />
      <img src={DotWhite} />
      <img src={DotGray} />
      {navigator && <h4>teste</h4>}
    </div>
  </Toolbar>
);

export default NavApp;
