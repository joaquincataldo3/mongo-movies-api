/* const MovieActor = require('../Models/MovieActor');
const MovieModel = require('../Models/Movie');
const ActorModel = require('../Models/Actor');

const controller = {

     createRelationship: async (req, res) => {

        const movie = req.body.movie;
        const actors = req.body.actors;

        /* const movie = req.query.m;
        const actor = req.query.a; */

      /*   actors.forEach(actor => {
            await MovieActor.create()
        }) 

        const findMovie = await MovieModel.findOne({_id: movie});
        const findActor = await ActorModel.findOne({name: actor});

        await MovieActor.create({
            movie: findMovie._id,
            actor: findActor._id
        })
  
        return res.status(201).json({
            msg: "New Actor Movie Relationship Created"
        });
    }
}

module.exports = controller; */