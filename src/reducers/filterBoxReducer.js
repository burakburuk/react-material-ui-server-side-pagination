import * as actionTypes from '../constants';
import * as utils from './reducerUtilities';
import * as mutate from "./mutators";
import initialState from './initialState';
import {fromJS, List, Map} from 'immutable';

export default function filterBoxReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ON_FILTER_MIN_BEDS_FIELDS_CHANGE:
            return utils.pipe([
                mutate.updateMinBeds(action.field.minBeds),
                mutate.updateMinBedsError(action.field.minBedsError)
            ], state);
        case actionTypes.ON_FILTER_MIN_PRICE_FIELDS_CHANGE:
            return utils.pipe([
                mutate.updateMinPrice(action.field.minPrice),
                mutate.updateMinPriceError(action.field.minPriceError)
            ], state);
        case actionTypes.FILTER_FORM_FIELDS_ERROR:
            return utils.pipe([
                mutate.updateMinBedsError(action.errors.minBedsError),
                mutate.updateLocationError(action.errors.locationError),
                mutate.updateMinPriceError(action.errors.minPriceError),
                mutate.updateMessageBoxOpen(true)
            ], state);
        case actionTypes.LIST_PROPERTIES_REQUEST_COMPLETE:
        case actionTypes.HANDLE_LIST_PROPERTIES_REQUEST:
            return utils.pipe([mutate.updateIsDisabled(action.disabled)], state);
        case actionTypes.ON_MESSAGE_BOX_STATUS_CHANGE:
            return utils.pipe([mutate.updateMessageBoxOpen(action.isOpen)], state);
        case actionTypes.ON_LOCATION_FILTER_CHANGE:
            return utils.pipe([mutate.updateLocation(action.location)], state);
        case actionTypes.GEO_AUTO_COMPLETE_REQUEST_DONE:
            return utils.pipe([mutate.updateSuggestions(fromJS(action.suggestions))], state);
        case actionTypes.HANDLE_CHANGE_SORT_ORDER_REQUEST:
            return utils.pipe([mutate.updateSortBy(action.sortBy)], state);
        case actionTypes.ON_LOCATION_FILTER_SET:
            return utils.pipe([
                mutate.updateSelectedLocation(action.selectedLocation),
                mutate.updateLocationError(action.locationError ? action.locationError : false),
            ], state);
        case actionTypes.CLEAR_FILTERS:
            return utils.pipe([
                mutate.updateMinBeds(""),
                mutate.updateMinBedsError(false),
                mutate.updateMinPrice(""),
                mutate.updateMinPriceError(false),
                mutate.updateMessageBoxOpen(false),
                mutate.updateIsDisabled(false),
                mutate.updateSortBy(""),
                mutate.updateLocation(""),
                mutate.updateSuggestions(List()),
                mutate.updateSelectedLocation(Map({
                    label: "",
                    value: ""
                }))
            ], state);
        default :
            return state;
    }
}
