var alt = require('../alt');
var LocationsFetcher = require('../utils/LocationsFetcher');

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();

    LocationsFetcher.fetch()
      .then((locations) => {
        // we can access other actions within our action through `this.actions`
        this.actions.updateLocations(locations);
      })
      .catch((errorMessage) => {
        this.actions.locationsFailed(errorMessage);
      });
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(location) {
    this.dispatch(location);
  }
}

module.exports = alt.createActions(LocationActions);
