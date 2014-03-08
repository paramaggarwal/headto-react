/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');

var Link        = ReactRouter.Link;


module.exports = React.createClass({

  render: function() {
    return (
      <div className="MainPage container">
        <div className="title">
          <h1><Link href="/">Headto</Link></h1>
          <h2>Tell your friends where you are heading.</h2>
        </div>
      </div>
    );
  }
});