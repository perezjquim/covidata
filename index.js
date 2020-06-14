import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import App from './src/components/App';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import './src/stylus/index.styl';

const logger = createLogger();

const rootElement = document.getElementById('root');

ons.ready(() => render(
  <AppContainer>
    <Provider>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
));

if (module.hot) {
  module.hot.accept('./src/components/App', () => {
    const NextApp = require('./src/components/App').default;
    render(
      <AppContainer>
        <Provider>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
