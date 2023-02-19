const Movie = require('../Models/Movie');
const Actor = require('../Models/Actor');
const { ObjectId } = require('mongodb');

const controller = {
    createActor: async (req, res) => {
        try {

            const fullName = req.body.fullName;
           
            if (!fullName) {
                return res.status(400).json({ msg: 'Please complete the text field' })
            } 

            const newActor = await Actor.create(fullName)
            return res.status(201).json(newActor);
        } catch (error) {

            console.log(error);
            return res.json({ msg: `There was an error while creating the actor: ${error}` })
        }

    },
    fetchActors: async (req, res) => {
        try {

            const actors = await Actor.find()

            return res.status(200).json(actors)
        } catch (error) {
            console.log(error)
            return res.json({msg: `There was a problem while trying to fetch the actors: ${error}`})
        }

    },
    pushActorsInMovie: async (req, res) => {
        try {
            const movieId = req.query.m;
            const actorId = req.query.a;

            if (!ObjectId.isValid(movieId) || !ObjectId.isValid(actorId)) {
                return res.status(400).json({ msg: 'Movie or Actor ID invalid' })
            }

            const movieToFind = await Movie.findById(movieId);
            const actorToFind = await Actor.findById(actorId);

            if (!movieToFind || !actorToFind) {
                return res.status(404).json({ msg: 'Movie or Actor not found' })
            }

            const movieFound = movieToFind
            const actorFound = actorToFind;

            const movieUpdated = await Movie.findByIdAndUpdate({
                _id: movieId
            }, {
                $addToSet: { // it pushes the actor in case is not found
                    actors: actorFound
                },
            }, {
                new: true
            })

            return res.status(200).json(movieUpdated)


        } catch (error) {
            return res.json({ msg: `Error while pushing the actor to the movie: ${error}` })
        }
    },
    deleteActorInMovie: async (req, res) => {

        try {
            const movieId = req.query.m;
            const actorId = req.query.a;

            if (!ObjectId.isValid(movieId) || !ObjectId.isValid(actorId)) {
                return res.status(400).json({ msg: 'Movie or Actor ID invalid' })
            }

            const movieToFind = await Movie.findById(movieId);
            const actorToFind = await Actor.findById(actorId);

            if (!movieToFind || !actorToFind) {
                return res.status(404).json({ msg: 'Movie or Actor not found' })
            }

            await Movie.updateOne(movieId, {
                $pull: {
                    actors: actorId
                }
            })

            return res.status(200).json({id: actorId})
            


        } catch (error) {
            console.log(error)
            return res.json({ msg: `There was a problem while deleting the actor in a movie: ${error}` })
        }




    },
    deleteActorCompletely: async (req, res) => {
        const actorId = req.params.id;

        if(!ObjectId.isValid(actorId)){
            return res.status(400).json({msg: 'Actor ID invalid'})
        }

        const actorToFind = await Actor.find(actorId)

        if(!actorToFind){
            return res.status(404).json({msg: 'Actor not found'})
        }

        await Movie.updateMany({}, {
            $pull: {
                actors: actorId
            }
        })

        await Actor.deleteOne({_id: actorId})

        return res.status(200).json({id: actorId})
        
    }
}

module.exports = controller;