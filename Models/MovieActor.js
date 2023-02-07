/* const mongoose = require('mongoose');
const {mongoose, Schema, Types, model} = require('mongoose');
const MovieSchema = require('./Movie');
const ActorSchema = require('./Actor');

const ObjectID = Types.ObjectId;

// setting up new mongoose schema
const movieActorSchema = new mongoose.Schema({
   movie: {
    type: ObjectID, ref: MovieSchema
   },
   actor: {
    type: ObjectID, ref: ActorSchema
   }
})

// creating a new model. movies is the collection name and movieSchema is the schema we created
module.exports = model('movieActor', movieActorSchema); */