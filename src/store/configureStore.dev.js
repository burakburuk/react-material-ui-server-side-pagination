import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger'
import createSagaMiddleware, {END} from 'redux-saga'
import rootReducer from '../reducers';
import {fromJS} from 'immutable'

export default function configureStore(initialState) {
    const logger = createLogger({
        collapsed: true,
    });

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        fromJS(initialState),
        compose(
            applyMiddleware(
                sagaMiddleware,
                logger
            )
        )
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store
}
