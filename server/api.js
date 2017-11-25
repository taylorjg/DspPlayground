const express = require('express');

const match = (req, res) => {
    const passage = req.body.passage;
    console.log(`passage length: ${passage.length}`);
    const result = {
        match: false
    };
    res.status(200).json(result);
};

const router = express.Router();
router.post('/match', match);

module.exports = {
    match,
    router
};
