import * as actionTypes from '../constants';
import * as utils from './reducerUtilities';
import * as mutate from "./mutators";
import initialState from './initialState';
import {fromJS, List} from 'immutable';

export default function resultTableReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_PROPERTIES_TABLE:
            return utils.pipe([
                mutate.updateAreaName(action.areaName),
                mutate.updateResultCount(action.resultCount),
                mutate.updateData(fromJS(action.data)),
                mutate.updateIsDisabled(action.isDisabled),
            ], state);
        case actionTypes.HANDLE_CHANGE_TABLE_ACTIONS:
            return utils.pipe([
                mutate.updateRowsPerPage(action.rowsPerPage),
                mutate.updateIsDisabled(action.isDisabled),
            ], state);
        case actionTypes.HANDLE_CHANGE_TABLE_PAGE_ACTIONS:
            return utils.pipe([
                mutate.updatePage(action.page),
                mutate.updateIsDisabled(action.isDisabled),
            ], state);
        case actionTypes.CLEAR_RESULT_DATA:
            return utils.pipe([
                mutate.updateData(List()),
                mutate.updatePage(0),
                mutate.updateRowsPerPage(20),
                mutate.updateAreaName(""),
                mutate.updateResultCount(0)
            ], state);
        default :
            return state;
    }
}
