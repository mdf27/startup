var movieService = require('./movieService');

module.exports = {
	listGenres: function(req, res) {
		res.status(200).send(movieService.listGenres());
	}
};