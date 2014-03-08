/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');

var ReactAsync  = require('react-async');
var superagent  = require('superagent');

var Link        = ReactRouter.Link;

module.exports = React.createClass({
  mixins: [ReactAsync.Mixin],

  getInitialStateAsync: function(cb) {
    superagent.get(
      'http://localhost:3000/api/users/' + this.props.username,
      function(err, res) {
        cb(err, res ? res.body : null);
      });
  },

  render: function() {
    return (
      <div className="UserPage">
        <h1>Hello, {this.state.name}!</h1>
        <p><Link href="/">Logout</Link></p>
      </div>
    );
  }
});