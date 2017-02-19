var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class FavoritesStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      addFavoriteLocation: LocationActions.FAVORITE_LOCATION,
      removeFavoriteLocation: LocationActions.NOT_FAVORITE_LOCATION,
      addfavCity: LocationActions.ADD_LOCATIONS
    });
  }

  addFavoriteLocation(location) {
    this.locations.push(location);
  }
  
  addfavCity(location){
    if(location.has_favorite)
    this.locations.push(location)
  }

  removeFavoriteLocation(id) {
   	const updatedList = this.locations.filter(function(item) {
   		return item.id != id;
   	});
   	this.locations = updatedList;
  }
}

module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');
