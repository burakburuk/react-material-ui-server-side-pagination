import * as actionTypes from "../constants";

export const requestGeoAutoComplete = (event) => ({
    type: actionTypes.HANDLE_GEO_AUTO_COMPLETE_REQUEST,
    searchTerm: event.target.value
});

export const requestListPropertiesStart = (filter) => ({
    type: actionTypes.HANDLE_LIST_PROPERTIES_REQUEST,
    filter, disabled: true
});

export const requestListPropertiesComplete = () => ({
    type: actionTypes.LIST_PROPERTIES_REQUEST_COMPLETE,
    disabled: false
});

export const updatePropertiesTable = (result) => ({
    type: actionTypes.UPDATE_PROPERTIES_TABLE,
    ...result, isDisabled: true
});

export const onFilterMinPriceFieldChange = (field) => ({
    type: actionTypes.ON_FILTER_MIN_PRICE_FIELDS_CHANGE,
    field
});

export const onFilterMinBedsFieldChange = (field) => ({
    type: actionTypes.ON_FILTER_MIN_BEDS_FIELDS_CHANGE,
    field
});

export const filterFieldsError = (errors) => ({
    type: actionTypes.FILTER_FORM_FIELDS_ERROR,
    errors
});

export const requestGeoAutoCompleteDone = (data) => ({
    type: actionTypes.GEO_AUTO_COMPLETE_REQUEST_DONE,
    suggestions: data
});

export const handleChangeRowsPerPage = (event) => ({
    type: actionTypes.HANDLE_CHANGE_TABLE_ACTIONS,
    rowsPerPage: event.target.value, isDisabled: true
});

export const handleChangePage = (page) => ({
    type: actionTypes.HANDLE_CHANGE_TABLE_PAGE_ACTIONS,
    page, isDisabled: true
});

export const onLocationChange = (location) => ({
    type: actionTypes.ON_LOCATION_FILTER_CHANGE,
    location
});

export const onSelectionComplete = (selectedLocation, locationError) => ({
    type: actionTypes.ON_LOCATION_FILTER_SET,
    selectedLocation, locationError
});

export const onMessageBoxStatusChange = (isOpen) => ({
    type: actionTypes.ON_MESSAGE_BOX_STATUS_CHANGE,
    isOpen
});

export const clearFilters = () => ({
    type: actionTypes.CLEAR_FILTERS,
});

export const clearResultData = () => ({
    type: actionTypes.CLEAR_RESULT_DATA,
});

export const onSortByChange = (e) => ({
    type: actionTypes.HANDLE_CHANGE_SORT_ORDER_REQUEST,
    sortBy: e.target.value
});