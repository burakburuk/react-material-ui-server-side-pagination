import {takeEvery, call, put, select} from "redux-saga/effects";
import * as actionTypes from "../constants";
import * as api from '../services';
import {
    requestListPropertiesComplete, updatePropertiesTable,
    requestGeoAutoCompleteDone,
    onLocationChange, onMessageBoxStatusChange
} from '../actions';
import objectAssign from 'object-assign';

/******************************************************************************/
/******************************* WATCHERS *************************************/

/******************************************************************************/

export function* watchGeoAutoCompleteRequest() {
    yield takeEvery(actionTypes.HANDLE_GEO_AUTO_COMPLETE_REQUEST, requestGeoAutoComplete);
}

export function* watchListPropertiesRequest() {
    yield takeEvery(actionTypes.HANDLE_LIST_PROPERTIES_REQUEST, requestListProperties);
}

export function* watchChangeTableActionsRequest() {
    yield takeEvery(actionTypes.HANDLE_CHANGE_TABLE_ACTIONS, requestListProperties);
}

export function* watchChangeTablePageRequest() {
    yield takeEvery(actionTypes.HANDLE_CHANGE_TABLE_PAGE_ACTIONS, requestListProperties);
}

export function* watchChangeSortOrderRequest() {
    yield takeEvery(actionTypes.HANDLE_CHANGE_SORT_ORDER_REQUEST, requestListProperties);
}

/******************************************************************************/
/******************************* SAGAS ****************************************/

/******************************************************************************/

function* requestGeoAutoComplete(action) {
    try {
        if (action.searchTerm === "") {
            return yield put(requestGeoAutoCompleteDone([]));
        }

        const params = {
            search_type: 'listings',
            search_term: action.searchTerm
        };
        const {response, error} = yield call(() => api.requestGeoAutoComplete(params));
        if (error) {
            throw new Error(error);
        } else {
            if (response.suggestions.length > 0) {
                yield put(onLocationChange(action.searchTerm));
            }
            const result = response.suggestions.map(item => {
                return {
                    label: item.value ? item.value._text : "",
                    value: item.identifier ? item.identifier._text : "",
                }
            });

            yield put(requestGeoAutoCompleteDone(result));
        }
    }
    catch
        (error) {
        console.warn(error.message);
    }
}

export function getSearchParams(filters = {}, state) {
    let requestParams = {
        'area': state.get('filterBox').get('selectedLocation').get('value'),
        'minimum_price': state.get('filterBox').get('minPrice'),
        'minimum_beds': state.get('filterBox').get('minBeds'),
        'page_number': state.get('resultTable').get('page'),
        'page_size': state.get('resultTable').get('rowsPerPage')
    };
    const sortBy = state.get('filterBox').get('sortBy').split('-');
    if (sortBy && sortBy.length === 2) {
        requestParams.order_by = sortBy[0];
        requestParams.ordering = sortBy[1];
    }
    return objectAssign({}, requestParams, filters);
}

function* requestListProperties(action) {
    try {
        const state = yield select();
        const innerFilters = getSearchParams(action.filter, state);
        if (innerFilters.area === "" || innerFilters.min_price === "" || innerFilters.minimum_beds === "") {
            return yield put(onMessageBoxStatusChange(true));
        }
        const {response, error} = yield call(() => api.requestProperties(innerFilters));
        if (error) {
            throw new Error(error);
        } else {
            const listing = response.listing.map(item => {
                return {
                    'listingId': item.listing_id._text,
                    'price': item.price._text,
                    'bedrooms': item.num_bedrooms._text,
                    'propertyType': item.property_type._text,
                    'agentName': item.agent_name._text,
                }
            });
            const result = {
                areaName: response.area_name._text,
                resultCount: parseInt(response.result_count._text, 10),
                data: listing
            };
            yield put(updatePropertiesTable(result));
        }
    }
    catch (error) {
        console.warn(error.message);
    } finally {
        yield put(requestListPropertiesComplete());
    }
}
