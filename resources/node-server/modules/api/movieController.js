var movieService = require('./movieService');
var utils = require('./utils');

module.exports = {
	listMovies: function(req, res) {
		var search = (req.query.search !== undefined) ? utils.searchString(req.query.search) : utils.alwaysTrue;
		var genre = (req.query.genre !== undefined) ? utils.matchGenre(req.query.genre) : utils.alwaysTrue;
		var order = (req.query.order !== undefined) ? utils.orderBy(req.query.order) : null;
		var limit = (req.query.limit !== undefined) ? req.query.limit : undefined;

		var result = movieService.listMovies()
			.filter(search)
			.filter(genre)
			.sort(order)
			.slice(0, limit);

		res.status(200).send(result);
	},
	getMovie: function(req, res) {
		var movie = movieService.getMovie(req.params.id);

		if(movie !== undefined) {
			res.status(200).send(movie);
		} else {
			console.log(('GET /api/movie/' + req.params.id + ' - Movie not found').yellow);
			res.status(404).send({error: 'The requested movie id was not found.'});
		}
	},
	createMovie: function(req, res) {
		var error = null;
		var requiredFields = ['title', 'released', 'genre', 'actors', 'rating'];
		requiredFields.forEach(function(field) {
			if(req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
				error = field + ' is required';
			}
		});

		if(error === null) {
			var newId = movieService.addMovie(req.body);
			res.status(201).send({ id: newId });
		} else {
			console.log(('Bad request: POST /api/movie/ - ' + error).red);
			res.status(400).send({error: 'Invalid request, please check parameters.'});
		}
	}
};
