var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var LocationSource = require('../sources/LocationSource');
var FavoritesStore = require('./FavoritesStore');
var LocationsStore = require('./LocationStore');

class LocationStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
      setFavorites: LocationActions.FAVORITE_LOCATION,
      remFavorites: LocationActions.NOT_FAVORITE_LOCATION,
      addCity: LocationActions.ADD_LOCATIONS
    });
    this.exportPublicMethods({
      getLocation: this.getLocation
    });
    this.exportAsync(LocationSource);
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }

  handleFetchLocations() {
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  resetAllFavorites() {
    this.locations = this.locations.map((location) => {
      return {
        id: location.id,
        name: location.name,
        has_favorite: false,
      };
    });
  }
  addCity(location){
    this.locations.push(location);
  }

  setFavorites(location) {
    this.updateFavorites(location)
  }

  remFavorites(location) {
    this.updateFavorites(location);
  }
  
  updateFavorites(location) {
    this.waitFor(FavoritesStore);
    var favoritedLocations = FavoritesStore.getState().locations;
    this.resetAllFavorites();
    favoritedLocations.forEach((location) => {
      // find each location in the array
      for (var i = 0; i < this.locations.length; i += 1) {
        // set has_favorite to true
        if (this.locations[i].id === location.id) {
          this.locations[i].has_favorite = true;
        }
      }
    });
  }

  getLocation(id) {
    var { locations } = this.getState();
    for (var i = 0; i < locations.length; i += 1) {
      if (locations[i].id === id) {
        return locations[i];
      }
    }
    return null;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
