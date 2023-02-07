const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const moviesRouter = require('./routers/moviesRoutes');
const actorsRouter = require('./routers/actorRoutes');
const movieActorRouter = require('./routers/actorMovieRoutes');

const app = express();

const uri = "mongodb+srv://joacocataldo:Hola12345-@moviesapi.m1qlgkc.mongodb.net/?retryWrites=true&w=majority";

app.use('/movies-images', express.static(path.join(__dirname, "./imagesUploads")));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/movies', moviesRouter);

app.use('/actors', actorsRouter);

mongoose.Promise = global.Promise; //making mongoose global. 
mongoose.connect(uri)
// returns a promise
    .then(() => {
        console.log('Mongo DB Connected');
        const port = 3010;
        app.listen(port, () => {
        console.log(`Server opened on ${port}`);
})
    })
    .catch(err => {
        console.log(`Mongo DB connection error: ${err.message}`)
    });

