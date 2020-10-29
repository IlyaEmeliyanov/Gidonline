
const AppError = require('../utils/AppError');
const router = require('express').Router();
const Movie = require('../model/Movie');

router.route('/')
    // @route GET /api/movies
    // @desc  Get all the movies
    .get(async(req, res, next) => {
        try {
            const movies = await Movie.find();
            res.status(200).json({
                status: 'success',
                data: {
                    movies
                }
            });
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })
    // @route POST /api/movies
    // @desc  Create a movie
    .post(async(req, res, next) => {
        try {
            const movie = await Movie.create(req.body);
            res.status(200).json({
                status: 'success',
                data: {
                    movie
                }
            });
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })
    // @route DELETE /api/movies
    // @desc  Delete all movies
    .delete(async(req, res) => {
        const movies = await Movie.deleteMany({});
        res.status(200).json({
            status: 'success',
            data: {
                movies
            }
        });
    })

router.route('/:id')
    // @route GET /api/movies/:id
    // @desc  Get movie with 'id'
    .get(async(req, res, next) => {
        try {
            const id = req.params.id;
            const movie = Movie.findById(id);
            res.status(200).json({
                status: 'success',
                data: {
                    movie
                }
            });
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })
    // @route DELETE /api/movies/:id
    // @desc  Delete the movie with 'id' from db
    .delete(async(req, res, next) => {
        try {
            const id = req.params.id;
            const movie = Movie.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                data: {
                    movie
                }
            })
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })

module.exports = router;