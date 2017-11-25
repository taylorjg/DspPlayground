import express from 'express';
import { SAMPLE_RATE } from '../shazam';

const tryToMatchPassage = passage => {
    console.log(`passage length: ${passage.length}`);
    console.log(`SAMPLE_RATE: ${SAMPLE_RATE}`);
    const result = {
        match: false
    };
    return result;
};

const match = (req, res) => {
    const passage = req.body.passage;
    const result = tryToMatchPassage(passage);
    res.json(result);
};

export default express.Router()
    .post('/match', match);
