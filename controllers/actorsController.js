const Movie = require('../Models/Movie');
const { ObjectId } = require('mongodb');

const controller = {
    createActor: async (req, res) => {
        try {

            const bodyName = req.body.name;
            const imageBody = req.file.path;

            if(!(bodyName || imageBody)) {
                return res.status(400).json({msg: 'Please complete all the text fields'})
            }

            const actorInBody = {
                name: bodyName,
                image: imageBody
            };

            await Actor.create(actorInBody) 
            return res.json({msg: 'Actor succesfully created'});
        } catch (error) {
            console.log(error);
            return res.send({msg:'There was an error while creating the actor'})
        }

    },
    fetchActors: async (req, res) => {
        const id = req.params.id;

        if(ObjectId.isValid(id)) {
            const movie = await Movie.findById(id);

            if(!movie){
                return res.status(404).json(
                    {msg: 'Movie not found'},
                )
            }

            const actors = movie.actors;

            return res.status(200).json({msg: actors})

        } else {
            return res.status(400).json({
                msg: 'Movie ID invalid'
            });
        } 
    }
}

module.exports = controller;