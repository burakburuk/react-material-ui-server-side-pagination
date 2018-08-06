import {combineReducers} from 'redux-immutable';
import filterBoxReducer from './filterBoxReducer';
import resultTableReducer from './resultTableReducer';

const rootReducer = combineReducers({
    filterBox: filterBoxReducer,
    resultTable: resultTableReducer
});

export default rootReducer;
