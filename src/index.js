
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');

const {notFound, errorHandler} = require('./middlewares');

const {cyanBright, greenBright, redBright} = require('cli-color');

const app = express();
const port = process.env.PORT || 3000;

const {mongoURI, dbName, dbPassword} = require('./config/config.json');

const mongodbURIMod = mongoURI.replace('<dbname>', dbName).replace('<password>', dbPassword);
const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(mongodbURIMod, options)
    .then(() => console.log(greenBright('Connected to db...')))
    .catch(err => console.log(redBright(err.message)))


app.use(express.json());

const userController = require('./controller/userController');
const movieController = require('./controller/movieController');
const authController = require('./controller/authController');

app.use('/api/users', userController);
app.use('/api/movies', movieController);
app.use('/api/', authController);

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        statusCode: 200,
        message: 'Hello, World 🖖🏻'
    })
})

// Not found middleware
app.use(notFound);
// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(cyanBright(`Listening on port ${port}...`));
});