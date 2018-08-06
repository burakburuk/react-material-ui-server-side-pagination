import React, {Component} from 'react';
import {connect} from 'react-redux';
import FilterBox from '../components/FilterBox';
import {
    requestListPropertiesStart, onFilterMinPriceFieldChange,
    onFilterMinBedsFieldChange, filterFieldsError, onLocationChange,
    requestGeoAutoComplete, onSelectionComplete, onMessageBoxStatusChange,
    clearFilters, clearResultData, onSortByChange
} from '../actions';
import {Map} from 'immutable';

class Filter extends Component {
    onSubmit = (e) => {
        const {filterBoxState} = this.props;
        const selectedLocation = filterBoxState.get('selectedLocation').toJS();
        const errorObj = {
            "locationError": (selectedLocation.value === ""),
            "minPriceError": (filterBoxState.get('minPrice') === ""),
            "minBedsError": (filterBoxState.get('minBeds') === "")
        };
        for (let key in errorObj) {
            if (errorObj[key]) {
                return this.props.filterFieldsError(errorObj);
            }
        }
        const requestParams = {
            'area': selectedLocation.value,
            'min_price': filterBoxState.get('minPrice'),
            'minimum_beds': filterBoxState.get('minBeds')
        };
        this.props.requestListPropertiesStart(requestParams);
    };

    onFilterMinPriceFieldChange = (field) => {
        field[field.property + "Error"] = (field.value === "");
        field[field.property] = field.value;
        this.props.onFilterMinPriceFieldChange(field);
    };

    onFilterMinBedsFieldChange = (field) => {
        field[field.property + "Error"] = (field.value === "");
        field[field.property] = field.value;
        this.props.onFilterMinBedsFieldChange(field);
    };

    onLocationChange = (event) => {
        this.props.requestGeoAutoComplete(event);
    };

    onSelectionComplete = (selection) => {
        let locationError = true;
        if (selection.value === "") {
            this.props.clearResultData();
        }
        else {
            locationError = false;
        }
        this.props.onSelectionComplete(Map(selection), locationError);
    };

    onMessageBoxClose = () => {
        this.props.onMessageBoxStatusChange(false);
    };

    clearFilters = () => {
        this.props.clearFilters();
        this.props.clearResultData();
    };

    onSortByChange = (e) => {
        this.props.onSortByChange(e);
    };

    render() {
        const {filterBoxState} = this.props;
        return (
            <FilterBox filterBoxState={filterBoxState} onSubmit={this.onSubmit}
                       onFilterMinPriceFieldChange={this.onFilterMinPriceFieldChange}
                       onFilterMinBedsFieldChange={this.onFilterMinBedsFieldChange} onSortByChange={this.onSortByChange}
                       onMessageBoxClose={this.onMessageBoxClose}
                       onLocationChange={this.onLocationChange} onSelectionComplete={this.onSelectionComplete}/>
        );
    }
}

const mapStateToProps = (state) => ({
    filterBoxState: state.get('filterBox')
});

const mapDispatchToProps = (dispatch) => ({
    requestListPropertiesStart: (filter) => dispatch(requestListPropertiesStart(filter)),
    onFilterMinPriceFieldChange: (field) => dispatch(onFilterMinPriceFieldChange(field)),
    onFilterMinBedsFieldChange: (field) => dispatch(onFilterMinBedsFieldChange(field)),
    filterFieldsError: (errors) => dispatch(filterFieldsError(errors)),
    onLocationChange: (event) => dispatch(onLocationChange(event)),
    onMessageBoxStatusChange: (isOpen) => dispatch(onMessageBoxStatusChange(isOpen)),
    requestGeoAutoComplete: (event) => dispatch(requestGeoAutoComplete(event)),
    onSelectionComplete: (selection) => dispatch(onSelectionComplete(selection)),
    clearFilters: () => dispatch(clearFilters()),
    clearResultData: () => dispatch(clearResultData()),
    onSortByChange: (e) => dispatch(onSortByChange(e)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);
