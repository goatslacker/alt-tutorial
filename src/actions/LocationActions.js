var alt = require('../alt');
var LocationsFetcher = require('../utils/LocationsFetcher');

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(location) {
    this.dispatch(location);
  }
}

module.exports = alt.createActions(LocationActions);
