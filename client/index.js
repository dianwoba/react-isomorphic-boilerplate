import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/utils/configureStore';
import routes from '../common/routes/routing';

const state = window.$REDUX_STATE || null;
const store = configureStore(state);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
	document.querySelector('.container')
);

