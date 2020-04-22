import React from 'react';

import {
  Navigator
} from 'react-onsenui';

import MainPage from './MainPage';

// >>> import do amcharts
/* import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4worldLow from '@amcharts/amcharts4-geodata/worldLow';*/
// <<< import do amcharts

/* am4core;
am4charts;
am4maps;
am4worldLow; */

const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
);

const App = () => (
  <Navigator
    renderPage={renderPage}
    initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
  />
);

export default App;
