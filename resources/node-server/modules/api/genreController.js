var movies = require('../../json/movies.json');
var utils = require('./utils');

module.exports = {
	listGenres: function(req, res) {
		var genres = [];
		movies.forEach(function(movie) {
			genres = genres.concat(movie.genre.split(', '));
		});
		genres = genres.filter(utils.distinct);

		res.status(200).send(genres);
	}
};