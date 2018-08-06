export const updateMinPrice = minPrice => s => s.set('minPrice', minPrice);
export const updateMinPriceError = minPriceError => s => s.set('minPriceError', minPriceError);

export const updateMinBeds = minBeds => s => s.set('minBeds', minBeds);
export const updateMinBedsError = minBedsError => s => s.set('minBedsError', minBedsError);

export const updateLocation = location => s => s.set('location', location);
export const updateLocationError = locationError => s => s.set('locationError', locationError);
export const updateMessageBoxOpen = messageBoxOpen => s => s.set('messageBoxOpen', messageBoxOpen);

export const updateSuggestions = suggestions => s => s.set('suggestions', suggestions);
export const updateSelectedLocation = selectedLocation => s => s.set('selectedLocation', selectedLocation);
export const updateSortBy = sortBy => s => s.set('sortBy', sortBy);

export const updateAreaName = areaName => s => s.set('areaName', areaName);
export const updateResultCount = resultCount => s => s.set('resultCount', resultCount);
export const updateData = data => s => s.set('data', data);
export const updateIsDisabled = isDisabled => s => s.set('isDisabled', isDisabled);

export const updateRowsPerPage = rowsPerPage => s => s.set('rowsPerPage', rowsPerPage);
export const updatePage = page => s => s.set('page', page);
