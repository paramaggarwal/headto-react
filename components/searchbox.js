/**
 * @jsx React.DOM
 */

var React = require('react');

var foursquare = require('../lib/foursquare');

var SearchResults = React.createClass({
	render: function() {
		var createItem = function(miniVenue) {
			return (
				<li>
					<div className="venue-icon">
						<img src={miniVenue.categories[0].icon.prefix + 'bg_44' + miniVenue.categories[0].icon.suffix} />
					</div>
					<div className="venue-name">{miniVenue.name}</div>
					<div className="venue-address">{miniVenue.location.address}<br />{miniVenue.location.crossStreet}</div>
				</li>
			);
		};

		return (
			<ul>{this.props.items.map(createItem)}</ul>
		);
	}
});

module.exports = React.createClass({
	getInitialState: function() {
		return {
			items: [],
			text: ''
		};
	},
	onChange: function(e) {
		this.setState({
			text: e.target.value
		});
	},
	handleSubmit: function(e) {
		var self = this;

		e.preventDefault();

		foursquare.suggestCompletion(this.state.text, function(err, res) {
		 	if (err) {
				console.log('Error', err);
			} else {
				self.setState({
					text: self.state.text,
					items: res.minivenues
				});
			}
		});
		
		// var nextItems = this.state.items.concat([this.state.text]);
		// var nextText = '';
		// this.setState({
		// 	items: nextItems,
		// 	text: nextText
		// });
	},
	render: function() {
		return (
			<div>
				<form className='search' onSubmit={this.handleSubmit}>
					<input className='typeahead' onChange={this.onChange} placeholder='Where are you heading?' value={this.state.text}/>
					<button>Search</button>
				</form>
    			<SearchResults items={this.state.items} />
    			<pre>{JSON.stringify(this.state, null, 4)}</pre>
  			</div>
		);
	}
});