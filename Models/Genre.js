const {mongoose, Schema, Types} = require('mongoose');


// setting up new mongoose schema
const GenreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), // every time we create a new movie, it will create the date automatically
        immutable: true // not modifiable
    }
} 
)

// creating a new model. movies is the collection name and movieSchema is the schema we created
module.exports = mongoose.model('Genre', GenreSchema);
