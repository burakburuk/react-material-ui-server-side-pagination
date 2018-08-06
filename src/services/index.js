import {xml2json} from 'xml-js';

const API_ROOT = 'https://api.zoopla.co.uk/api/v1/';
const API_KEY = 'dfdz5hck8anunvtqjeva6ys3';

function createParams(params = {}) {
    let result = "?";
    for (let key in params) {
        result += `${key}=${params[key]}&`;
    }
    return result;
}

// Fetches an API response and returns a promise
function callApi(endpoint, params) {
    let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    const parameters = createParams(params);
    return fetch(fullUrl + parameters + `api_key=${API_KEY}`)
        .then(response =>
            response.text().then(xml => ({xml, response}))
        ).then(({xml, response}) => {
            if (!response.ok) {
                return Promise.reject(xml)
            }
            return JSON.parse(xml2json(xml, {compact: true, spaces: 4})).response;
        })
        .then(
            response => ({response}),
            error => ({error: error.message || 'Something bad happened'})
        )
}

// api services
export const requestProperties = (params) => callApi('property_listings', params);
export const requestGeoAutoComplete = (params) => callApi('geo_autocomplete', params);
