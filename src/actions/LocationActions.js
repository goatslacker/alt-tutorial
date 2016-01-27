var alt = require('../alt');

class LocationActions {
  updateLocations(locations) {
    return locations;
  }

  fetchLocations() {
    return null;
  }

  locationsFailed(errorMessage) {
    return errorMessage;
  }

  favoriteLocation(location) {
    return location;
  }
}

module.exports = alt.createActions(LocationActions);
