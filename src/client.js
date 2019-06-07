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
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import firebaseConfig from './constants/FirebaseConfig';
import thunk from 'redux-thunk';

import Page404 from 'routes/404/components/404';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const middleWareArr = [
  historyMiddleware,
  logger,
  thunk.withExtraArgument({ getFirebase, getFirestore }),
]

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(...middleWareArr),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {attachAuthIsReady: true}),
  ),
);

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
