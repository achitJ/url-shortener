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

urlSchema.methods.toJSON = function() {

    const url = this;
    const urlObject = url.toObject();

    delete urlObject._id;

    return urlObject;

}

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;