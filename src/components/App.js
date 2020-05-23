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
    nextPage={nextPage(route.key)}
  />
);

const currentPage = (key) => {
  return pages.find(element => element.name === key);
};

const nextPage = (key) => {
  let currentPage = pages.find(element => element.name === key);

  if (currentPage.name !== "INDICATIONS_PAGE") {
    let nextPage = pages.find(element => element.order === currentPage.order + 1);
    return nextPage.name;
  }
};

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{ component: MainPage, key: pages[0].name }}
  />
);

export default App;
