var express = require('express');
var api = express.Router();
var movieController = require('./movieController');
var genreController = require('./genreController');

api.get('/movie', movieController.listMovies);
api.get('/movie/:id(\\d+)/', movieController.getMovie);
api.post('/movie', movieController.createMovie);

api.get('/genre', genreController.listGenres);

module.exports = api;