const mongoose = require('mongoose');
const validator = require('validator');

const urlSchema = new mongoose.Schema({

    longURL: {

        type: String,
        required: true,
        trim: true

    },

    shortURL: {

        type: String,
        required: true,
        
    }

},{

    timestamps: true

});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;