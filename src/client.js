import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import App from './containers/App';
import logger from 'redux-logger';

import Page404 from 'routes/404/components/404';

import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
 
const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewareArr = [historyMiddleware, sagaMiddleware];
middlewareArr.push(logger);
const store = createStore(
  reducers,
  undefined,
  compose(applyMiddleware(...middlewareArr))
);

sagaMiddleware.run(mySaga);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
        <Route component={Page404} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app-container')
);
