/**
 * @jsx React.DOM
 */

var React = require('react');

var SearchResults = React.createClass({
	render: function() {
		var createItem = function(itemText) {
			return <li>{itemText}</li>;
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
		e.preventDefault();
		var nextItems = this.state.items.concat([this.state.text]);
		var nextText = '';
		this.setState({
			items: nextItems,
			text: nextText
		});
	},
	render: function() {
		return (
			<div>
				<form className='search' onSubmit={this.handleSubmit}>
					<input className='typeahead' onChange={this.onChange} placeholder='Where are you heading?' value={this.state.text}/>
					<button>Search</button>
				</form>
    			<SearchResults items={this.state.items} />
  			</div>
		);
	}
});