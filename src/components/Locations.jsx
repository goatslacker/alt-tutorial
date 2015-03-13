var React = require('react');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');

var Locations = React.createClass({
  getStoreState() {
    return {
      locations: LocationStore.getState(),
      favorites: FavoritesStore.getState()
    };
  },
  getInitialState() {
    return this.getStoreState();
  },

  componentDidMount() {
    LocationStore.listen(this.onChange);
    FavoritesStore.listen(this.onChange);

    LocationActions.fetchLocations();
  },

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
    FavoritesStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(this.getStoreState());
  },

  addFave(ev) {
    var location = LocationStore.getLocation(Number(ev.target.getAttribute('data-id')));
    LocationActions.favoriteLocation(location);
  },

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!this.state.locations.locations.length) {
      return (
        <div>
          <img src="ajax-loader.gif" />
        </div>
      )
    }


    return (
      <div>
        <h1>Locations</h1>
        <ul>
          {this.state.locations.locations.map((location) => {
            var faveButton = (
              <button onClick={this.addFave} data-id={location.id}>Favorite</button>
            );

            return (
              <li>{location.name} {location.has_favorite ? '<3' : faveButton}</li>
            );
          })}
        </ul>
        <h1>Favorites</h1>
        <ul>
          {this.state.favorites.locations.map((location) => {
            return (
              <li>{location.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Locations;
