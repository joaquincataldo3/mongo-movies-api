const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
require("dotenv").config({path: path.join(__dirname, './.env') })
const moviesRouter = require('./routers/moviesRoutes');
const actorsRouter = require('./routers/actorRoutes');
const genreRouter = require('./routers/genreRoutes');

const app = express();
const {MONGO_URI} = process.env

app.set('view engine', 'ejs')

app.use('/movies-images', express.static(path.join(__dirname, "./imagesUploads")));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/actors', actorsRouter);
app.use('/movies', moviesRouter);
app.use('/genres', genreRouter);

app.get('/', (req, res) => {
    return res.json({msg: 'Success'})
})

console.log(MONGO_URI)

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Mongo DB Connected');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        console.log(`Server opened on ${PORT}`);
})
    })
    .catch(err => {
        console.log(`Mongo DB connection error: ${err.message}`)
    });

