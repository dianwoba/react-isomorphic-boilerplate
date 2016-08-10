import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import createLogger from 'redux-logger';
import combinedReducers from '../reducers';

// toggle redux-devtool panel
window.$REDUX_DEVTOOL = false;

const logger = createLogger({
    level: 'info',
    collapsed: true,
  // predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
});

const createStoreWithMiddleware = applyMiddleware(
    logger,
    promiseMiddleware,
)(createStore);


const devToolsExtension = global.devToolsExtension && global.devToolsExtension();

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(combinedReducers, initialState, devToolsExtension);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
