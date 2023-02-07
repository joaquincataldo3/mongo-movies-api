const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

// setting up new mongoose schema
const movieSchema = new Schema({
    title: {
        String,
        required: true
    },
    length: {
        Number,
        required: true
    },
    rating: {
        Number,
        required: true,
        min: 1,
        max: 10
    },
    releaseDate: {
        Date,
        required: true
    },
    image: {
        String,
        required: true     
    },
    genre: {
        type: Types.ObjectId, ref: 'Genre'
    },
    actors:[{
        type: Types.ObjectId, ref: 'Actor'   
    }],
    createdAt: {
        Date,
        default: () => Date.now(), // every time we create a new movie, it will create the date automatically
        immutable: true // not modifiable
    }
})

// creating a new model. movies is the collection name and movieSchema is the schema we created
module.exports = mongoose.model('Movie', movieSchema);

