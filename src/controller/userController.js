const AppError = require('../utils/AppError');
const router = require('express').Router();
const User = require('../model/User');

router.route('/')
    // @route GET /api/users
    // @desc  Get all users
    .get(async(req, res, next) => {
        try{
            const users = await User.find({});
            res.status(200).json({
                status: 'success',
                data: {
                    users
                }
            })
        }catch(err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })
    // @route POST /api/users
    // @desc  Creating a user with username and password
    .post(async(req, res, next) => {
        try {
            const {username, password} = req.body;
            const user = await User.create(req.body);
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })
    // @route DELETE /api/users
    // @desc  Delete all users from db
    .delete(async(req, res, next) => {
        try {
            const users = await User.deleteMany({});
            res.status(200).json({
                status: 'success',
                data: {
                    users
                }
            })
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })

router.route('/:id')
    // @route GET /api/users/:id
    // @desc  Get the user by id
    .get(async(req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })
    // @route DELETE /api/user/:id
    // @desc  Delete user with 'id' from db
    .delete(async(req, res, next) => {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndDelete(id);
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    })

module.exports = router;