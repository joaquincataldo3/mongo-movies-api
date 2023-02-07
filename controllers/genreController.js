const Genre = require('../Models/Genre');


const controller = {
    createGenre: async (req, res) => {
        try {
            const genreName = req.body.name;
            
            if(!genreName) {
                return res.status(400).json({msg: 'Please type the genre name'})
            }

            await Genre.create(genreName) 
            return res.status(201).json({msg: 'Genre succesfully created'});
        } catch (error) {
            console.log(error);
            return res.status(400).json({msg:'There was an error while creating the genre'})
        }
    }
}

module.exports = controller;