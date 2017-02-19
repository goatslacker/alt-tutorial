var alt = require('../alt');

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();
  }
  addLocations(location) {
    this.dispatch(location);
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(location) {
    this.dispatch(location);
  }
  notFavoriteLocation(id) {
    this.dispatch(id);
  }
  addTodo(todo){
    this.dispatch(todo);
  }
  addToFavoriteTodo(i){
    this.dispatch(i);
    console.log('why')
  }
}

module.exports = alt.createActions(LocationActions);
