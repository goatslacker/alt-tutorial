var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');

var Favorites = React.createClass({
  removeFave(ev) {
    const cid = Number(ev.target.getAttribute('data-id'));
    console.log(cid);
    LocationActions.notFavoriteLocation(cid);
  },
  render() {
    return (
      <ul>
        {this.props.locations.map((location, i) => {
          var faveButton = (
            <button onClick={this.removeFave} data-id={location.id}>
              Favorite
            </button>
          );
          return (
            <li key={i}>{location.name}  {faveButton}</li>
          );
        })}
      </ul>
    );
  }
});

var AllLocations = React.createClass({
 
  addFave(ev) {
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    console.log(location)
    LocationActions.favoriteLocation(location);
  },
  addCity(){
    nextId = this.props.locations.length;
    const city = document.getElementById('city').value;
    const location = {id: nextId, name: city ,has_favorite: false};
    LocationActions.addLocations(location);
    document.getElementById('city').value ="";
  },
  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }
    if (LocationStore.isLoading()) {
      return (
        <div>
          <img src="ajax-loader.gif" />
        </div>
      )
    }
    return (
      <div>
        <input id="city"ref="city" type="text" />
        <button onClick={this.addCity}>Add</button>
      <ul>
        {this.props.locations.map((location, i) => {
          var faveButton = (
            <button onClick={this.addFave} data-id={location.id}>
              Favorite
            </button>
          );
        
          return (
            <li key={i}>
              {location.name} {location.has_favorite ? '<3' : faveButton}
            </li>
          );
        })}
      </ul>
      </div>
    );
  }
});

var Locations = React.createClass({
  componentDidMount() {
    LocationStore.fetchLocations();
  },
  render() {
    return (
      <div>
        <h1>Locations</h1>
        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer>

        <h1>Favorites</h1>
        <AltContainer store={FavoritesStore}>
          <Favorites />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Locations;
