const Genre = require('../Models/Genre');
const { ObjectId } = require('mongodb');


const controller = {
    createGenre: async (req, res) => {
        try {
            const genreInBody = req.body.name;
            
            if(!genreInBody) {
                return res.status(400).json({msg: 'Please type the genre name'})
            }

            const newGenre = await Genre.create(genreInBody) 

            return res.status(201).json(newGenre);

        } catch (error) {
            console.log(error);
            return res.status(400).json({msg:'There was an error while creating the genre'})
        }
    },
    updateGenre: async (req, res) => {
        try {
            const genreId = req.params.id
            const genreInBody = req.body.name;

            if(!ObjectId.isValid(genreId)) {
                return res.status(400).json({msg: 'Genre ID invalid'})
            }

            const genreToUpdate = await Genre.findByIdAndUpdate(genreId, {
                $set: {
                    name: genreInBody
                }
            },{
                new: true
            })

            const genreUpdated = genreToUpdate

            return res.status(201).json(genreUpdated);
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({msg:'There was an error while creating the genre'})
        }
    },
    deleteGenre: async (req, res) => {
        try {
            const genreId = req.params.id

            if(!ObjectId.isValid(genreId)) {
                return res.status(400).json({msg: 'Genre ID invalid'})
            }

            await Genre.findByIdAndRemove(genreId)

            return res.status(200).json(genreId);
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({msg:'There was an error while creating the genre'})
        }
    }
}

module.exports = controller;