const AppError = require('./utils/AppError');

const notFound = (req, res, next) => {
    const error = new AppError(`Not found - ${req.originalUrl}`, 404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🤯' : error.stack,
    });
}

module.exports = {
    notFound,
    errorHandler
}