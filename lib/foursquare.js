var superagent = require('superagent');
var config = require('./config')

module.exports = {
	getVenue: function (id, callback) {
		var foursquareURL = "https://api.foursquare.com/v2/venues/" + id
			+ "?v=20130725"
			+ "&client_id=" + config.foursquareClientId
			+ "&client_secret=" + config.foursquareClientSecret;

		superagent.get(foursquareURL, function(err, res) {
			if (err || res.error) {
				// error
				callback(err || res.error, null);
				return;
			} else {
				// success
				callback(err, res.body && res.body.response);
			}
		});
	},

	suggestCompletion: function(q, callback) {
		var foursquareURL = "https://api.foursquare.com/v2/venues/suggestcompletion"
			+ "?v=20130725"
			+ "&client_id=" + config.foursquareClientId
			+ "&client_secret=" + config.foursquareClientSecret
			+ "&limit=10"
			+ "&near=India"
			+ "&query=" + q;

		superagent.get(foursquareURL, function(err, res) {
			if (err || res.error) {
				// error
				callback(err || res.error, null);
				return;
			} else {
				// success
				callback(err, res.body && res.body.response);
			}
		});
	}
};
