/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');

var Pages       = ReactRouter.Pages;
var Page        = ReactRouter.Page;

var MainPage = require('./main');
var UserPage = require('./user');

module.exports = React.createClass({

  render: function() {
    return (
      <html>
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# headtoapp: http://ogp.me/ns/fb/headtoapp#">
          <link rel="stylesheet" href="/assets/style.css" />
          <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="assets/favicon.ico" type="image/x-icon" />
          <script src="/assets/bundle.js" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/" handler={MainPage} />
          <Page path="/users/:username" handler={UserPage} />
        </Pages>
      </html>
    );
  }
});