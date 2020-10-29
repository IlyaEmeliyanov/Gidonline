class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // if 4xx, than fail, otherwise error
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor); // creates a .stack prop on the current obj
    }
}

module.exports = AppError;