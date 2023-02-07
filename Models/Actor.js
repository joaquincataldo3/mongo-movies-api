const {mongoose, Schema, Types} = require('mongoose');
const ObjectID = Types.ObjectId;

// setting up new mongoose schema
const ActorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
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
module.exports = mongoose.model('Actor', ActorSchema);
