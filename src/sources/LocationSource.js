var LocationActions = require('../actions/LocationActions');

var mockData = [
  { id: 0, name: 'Abu Dhabi',has_favorite: false },
  { id: 1, name: 'Berlin',has_favorite: false },
  { id: 2, name: 'Bogota',has_favorite: false },
  { id: 3, name: 'Buenos Aires',has_favorite: false },
  { id: 4, name: 'Cairo',has_favorite: false },
  { id: 5, name: 'Chicago',has_favorite: false },
  { id: 6, name: 'Lima',has_favorite: false },
  { id: 7, name: 'London',has_favorite: false },
  { id: 8, name: 'Miami',has_favorite: false },
  { id: 9, name: 'Moscow',has_favorite: false },
  { id: 10, name: 'Mumbai',has_favorite: false },
  { id: 11, name: 'Paris',has_favorite: false },
  { id: 12, name: 'San Francisco',has_favorite: false }
];

var LocationSource = {
  fetchLocations() {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
          setTimeout(function () {

            // change this to `false` to see the error action being handled.
            if (true) {
              // resolve with some mock data
              resolve(mockData);
            } else {
              reject('Things have broken');
            }
          }, 250);
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },
      success: LocationActions.updateLocations,
      error: LocationActions.locationsFailed,
      loading: LocationActions.fetchLocations
    }
  }
};

module.exports = LocationSource;
