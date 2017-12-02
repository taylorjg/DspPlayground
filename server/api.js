import express from 'express';
import { tryToMatchPassage } from './matching';
// import songFingerprint from '../InputSignals/AlmostBlue_fingerprint.json';
import songFingerprint from '../InputSignals/440_fingerprint.json';

const match = (req, res) => {
    const passageFingerprint = req.body.passageFingerprint;
    const result = tryToMatchPassage(passageFingerprint, songFingerprint);
    res.json(result);
};

export default express.Router()
    .post('/match', match);
