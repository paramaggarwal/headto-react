/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var ReactAsync  = require('react-async');

var superagent  = require('superagent');
var Link = ReactRouter.Link;

var SearchBox = require('../components/searchbox');
var Title = require('../components/title');

var foursquare = require('../lib/foursquare');

module.exports = React.createClass({
  mixins: [ReactAsync.Mixin],

  getInitialStateAsync: function(cb) {
    foursquare.getVenue(this.props.id, function(err, res) {
      if (err) {
        console.log('Error', err);
      } else {
        cb(err, res);
      }
    });
  },

  render: function() {
    return (
      <div className="VenuePage container">
        <Title />
        <h1>{ this.state.venue.name }</h1>
        <strong>{ this.state.venue.categories[0].name }</strong>
        <p>{ this.state.venue.location.address }, { this.state.venue.location.city }.</p>
        <p><a id="postHeadto">I am heading here</a></p>
        <p><img src={'//a.tiles.mapbox.com/v3/paramaggarwal.map-mkz04dpf/pin-m-star('
          + this.state.venue.location.lng + ','
          + this.state.venue.location.lat + ')/'
          + this.state.venue.location.lng + ','
          + this.state.venue.location.lat + ','
          + '14/400x200.png'} /></p>
        <pre>{ JSON.stringify(this.state, null, 4) }</pre>
      </div>
    );
  }
});