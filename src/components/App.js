import React from 'react';

import {
  Navigator
} from 'react-onsenui';

import MainPage from './MainPage';
import { pages } from '../util';

const renderPage = (route, navigator) => (
  <route.component
    key={route.key}
    navigator={navigator}
    pages={pages}
    currentPage={currentPage(route.key)}
    country={route.country}
  />
);

const currentPage = (key) => {
  return pages.find(element => element.name === key);
};

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{ component: MainPage, key: pages[0].name }}
  />
);

export default App;
