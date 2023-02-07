const { ObjectId } = require('mongodb');
const Movie = require('../Models/Movie');

const controller = {
    // find all movies
    allMovies: async (req, res) => {
        try {
            // making the pagination
            const pages = req.query.p; // catching the req.query
            const filterByQueryParams = req.query.f;
            const moviePerPage = 3;
            if (!filterByQueryParams) {
                const allMovies = await Movie
                    .find()
                    .skip(pages * moviePerPage) // pages could be 0, 1, 2 etc. times the movie per page
                    .limit(3);  // limiting it to 3 movies per page    
                return res.json(allMovies);
            }
            else if (filterByQueryParams == "rating") {
                const allMoviesFilteredByRating = await Movie
                    .find()
                    .skip(pages * moviePerPage)
                    .limit(3)
                    .sort({ rating: -1 });
                return res.json(allMoviesFilteredByRating);
            }
            else if (filterByQueryParams == "length") {
                const allMoviesFilteredByLength = await Movie
                    .find()
                    .skip(pages * moviePerPage)
                    .limit(3)
                    .sort({ length: -1 });
                return res.json(allMoviesFilteredByLength);
            }
        } catch (error) {
            return res.json({ msg: `Error while fetching the movies: ${error}` })
        }
    },
    findOne: async (req, res) => {
        try {
            const movieId = req.params.id;

            if (ObjectId.isValid(movieId)) {
                const movieToFind = await Movie.findById(movieId);

                if (!movieToFind) {
                    return res.status(404).json({ msg: 'Movie not found' })
                }

                const movieFound = movieToFind;

                return res.status(200).json(movieFound)

            } else {
                return res.status(400).json({
                    msg: 'Movie ID invalid'
                });
            }
        } catch (error) {
            return res.json({ msg: `Error while finding a movie: ${error}` })
        }

    },
    createMovie: async (req, res) => {
        try {
            const title = req.body.title;
            const length = req.body.length;
            const rating = req.body.rating;
            const releaseDate = req.body.releaseDate;
            const image = req.file.path;

            if (!(title || length || rating || releaseDate || image)) {
                res.status(400).json({ msg: 'Please complete all the text fields' })
            }

            const movieInBody = {
                title: req.body.title,
                length: req.body.length,
                rating: req.body.rating,
                releaseDate: req.body.releaseDate,
                image: req.file.path,
            }

             const newMovie = await Movie.create(movieInBody)
            return res.status(201).json(newMovie);
        } catch (error) {
            return res.json({ msg: `Error while processing the creation of a movie: ${error}` })
        }
    },
    updateMovie: async (req, res) => {

        try {
            const movieIdToUpdate = req.params.id;

            if (!ObjectId.isValid(movieIdToUpdate)) {
                return res.status(400).json({ msg: 'Movie ID invalid' })
            }

            const movieToUpdate = await Movie.findById(movieIdToUpdate)

            if (!movieToUpdate) {
                return res.status(404).json({ msg: 'Movie not found' })
            }

            const data = {
                title: req.body.title ? req.body.title : movieToUpdate.title,
                length: req.body.length ? req.body.length : movieToUpdate.length,
                rating: req.body.rating ? req.body.rating : movieToUpdate.rating,
                releaseDate: req.body.releaseDate ? req.body.releaseDate : movieToUpdate.releaseDate,
                image: req.file ? req.file.path : movieToUpdate.file.path,
                genre: movieToUpdate.genre,
                actors: movieToUpdate.actors
            }

            const updatedMovie = await Movie.findByIdAndUpdate(movieIdToUpdate, data, {new: true})

            return res.status(200).json(updatedMovie)
        } catch (error) {
            return res.json({ msg: `Error while processing the update of a movie: ${error}` })
        }


    },
    deleteMovie: async (req, res) => {
        try {
            const movieIdToDelete = req.params.id

            if (!ObjectId.isValid(movieIdToDelete)) {
                return res.status(400).json({ msg: 'Movie ID invalid' })
            }

            const movieToDelete = await Movie.deleteOne({ _id: movieIdToDelete })

            if (!movieToDelete) {
                return res.status(404).json({ msg: 'Movie not found' })
            }

            return res.status(200).json({ msg: 'Movie successfully deleted' })
        } catch (error) {
            return res.json({ msg: `Error while processing the elimination of a movie: ${error}` })
        }

    }
}

module.exports = controller;