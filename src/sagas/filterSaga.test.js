import initialStateMock from '../mocks/initialStateMock';
import * as filterSaga from './filterSaga';
import {fromJS} from 'immutable';

it('getSearchParams without filter parameter', () => {
    return expect(filterSaga.getSearchParams({}, initialStateMock)).toEqual({
        "area": "",
        "minimum_beds": "",
        "minimum_price": "",
        "page_number": 0,
        "page_size": 20
    });
});

it('getSearchParams with filter parameter', () => {
    return expect(filterSaga.getSearchParams({"area": "Oxford"}, initialStateMock)).toEqual({
        "area": "Oxford",
        "minimum_beds": "",
        "minimum_price": "",
        "page_number": 0,
        "page_size": 20
    });
});

it('getSearchParams with sortBy parameter', () => {
    let js = initialStateMock.toJS();
    js.filterBox.sortBy = "price-ascending";
    return expect(filterSaga.getSearchParams({}, fromJS(js))).toEqual({
        "area": "",
        "minimum_beds": "",
        "minimum_price": "",
        "order_by": "price",
        "ordering": "ascending",
        "page_number": 0,
        "page_size": 20
    });
});

it('getSearchParams with incorrect sortBy parameter', () => {
    let js = initialStateMock.toJS();
    js.filterBox.sortBy = "price";
    return expect(filterSaga.getSearchParams({}, fromJS(js))).toEqual({
        "area": "",
        "minimum_beds": "",
        "minimum_price": "",
        "page_number": 0,
        "page_size": 20
    });
});
