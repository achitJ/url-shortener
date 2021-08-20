const express = require('express');
const router = new express.Router();
const URL = require('../models/url');
const validator = require('validator');
const crypto = require('crypto');

router.post('/api/url', async (req,  res) => {

    let longURL = req.body.url;

    if(!longURL)
    {
        return res.status(400).send({error: "Enter a URL."});
    }

    if(!validator.isURL(longURL))
    {
        return res.status(400).send({error: "Enter a valid URL."});
    }

    try {

        if(!longURL.match(/^(https|http):\/\//))
        {
            longURL = "http://" + longURL;
        }

        const doesURLExists = await URL.findOne({longURL : longURL});

        if(doesURLExists)
        {
            return res.send(doesURLExists);
        }

        let shortURL = crypto.randomBytes(4).toString('hex');
        let shortURLExists = await URL.findOne({shortURL: shortURL});

        while(shortURLExists)
        {
            shortURL = crypto.randomBytes(4).toString('hex');
            shortURLExists = await URL.findOne({shortURL: shortURL});
        }

        const url = new URL ({

            longURL,
            shortURL

        });

        await url.save();

        res.send(url);

    } catch(error) {

        console.log(error);

        res.status(500).send({error: "Internal Server Error"});

    }

})

router.get('/:url', async(req, res) => {

    const shortURL = req.params.url;

    try {

        const url = await URL.findOne({shortURL});

        if(!url)
        {
            return res.status(404).send({error: "URL does not exist."});
        }

        res.redirect(url.longURL);

    } catch(error) {

        res.status(500).send({error: "Internal Server Error."});

    }
})

module.exports = router;