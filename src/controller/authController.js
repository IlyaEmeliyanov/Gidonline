
const router = require('express').Router();
const AppError = require('../utils/AppError');
const User = require('../model/User');

const jwt = require('jsonwebtoken');
const {jwtPrivateKey, JWT_EXPIRES_IN} = require('../config/config.json');

const bcrypt = require('bcryptjs');

const createJwt = (id) => {
    const token = jwt.sign({id}, jwtPrivateKey, {
        expiresIn: `${JWT_EXPIRES_IN}d`
    });
    return token;
}

const sendToken = (user, statusCode, res) => {
    console.log(user);
    const token = createJwt(user._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + JWT_EXPIRES_IN * 24 * 60 * 60 * 1000)
    });

    res.status(statusCode).json({
        status: 'success',
        data: {
            user,
            token
        }
    });
}

router.route('/signup')
    // @route POST /api/signup
    // @desc  Signup a user
    .post(async(req, res, next) => {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (user) {
                next(new AppError(`A user with that username already exists`, 400));
                return;
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await new User({username, password: hashedPassword});
            await newUser.save();

            sendToken(newUser, 200, res);
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    });

router.route('/login')
    // @route POST /api/login
    // @desc  Login a user
    .post(async(req, res, next) => {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user)
                return next(new AppError(`A user with taht username doesn't exist`, 400));
            
            const decrypted = await bcrypt.compare(password, user.password);

            if (!decrypted)
                return next(new AppError(`Password is not correct`, 401));

            sendToken(user, 200, res);
        } catch (err) {
            const error = new AppError(err.message, err.statusCode);
            next(error);
        }
    });

// router.route('/addtofavorites/:id')
//     // @route POST /api/users/addtofavorites
//     // @desc  Adding to favorites the id of the movie
//     .patch(async(req, res, next) => {
//         try {
//             const movieId = req.params.id;
//             const user = await User.findByIdAndUpdate(id, {})
//             res.status(200).json({
//                 status: 'success',
//                 data: {
                    
//                 }
//             });
//         } catch (err) {
//             const error = new AppError(err.message, err.statusCode);
//             next(error)
//         }
//     })


module.exports = router;