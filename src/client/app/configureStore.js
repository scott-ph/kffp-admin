import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import authMiddleware from './middleware/authMiddleware';

const NODE_ENV = process.env.NODE_ENV;
console.log('__NODE_ENV__', NODE_ENV);

const storeFactory = (initialState) => {
    const appReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    const rootReducer = (state, action) => {
        if (action.type === 'LOGOUT_SUCCESS') {
            state = undefined;
            // TODO: uncomment if routing is not working properly
            // const { routing } = state
            //
            // state = { routing }
        }

        return appReducer(state, action);
    };

    const middleware = [thunk, authMiddleware, routerMiddleware(browserHistory)];

    const devToolComposition = compose(
        applyMiddleware(...middleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore);

    const factory = process.env.NODE_ENV !== 'production' ? devToolComposition : applyMiddleware(...middleware)(createStore);
    const store = factory(rootReducer, initialState);
    return store;
};

export default storeFactory;
