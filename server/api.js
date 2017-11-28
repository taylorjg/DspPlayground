import express from 'express';
import songFingerprint from '../InputSignals/AlmostBlue_fingerprint.json';

const findMatchingPairs = (passageFingerprint, songFingerprint) => {
    const same = (fs1, fs2) =>
        fs1[0] === fs2[0] &&
        fs1[1] === fs2[1] &&
        fs1[2] === fs2[2] &&
        fs1[3] === fs2[3];
    const findMatchInSong = fs1 => songFingerprint.findIndex(fs2 => same(fs1, fs2));
    const pairs = passageFingerprint.map((fs, idx1) => {
        const idx2 = findMatchInSong(fs);
        return { idx1, idx2 };
    });
    return pairs.filter(({ idx2 }) => idx2 >= 0);
};

const tryToMatchPassage = passageFingerprint => {
    console.log(`passageFingerprint: ${JSON.stringify(passageFingerprint)}`);

    let match = false;

    const matchingPairs = findMatchingPairs(passageFingerprint, songFingerprint);
    console.log(`matchingPairs: ${JSON.stringify(matchingPairs)}`);
    const numMatchingPairs = matchingPairs.length;
    console.log(`numMatchingPairs: ${numMatchingPairs}`);
    const diffs = matchingPairs.map(({ idx1, idx2 }) => idx2 - idx1);
    console.log(`diffs: ${JSON.stringify(diffs)}`);
    const setDiffs = new Set(diffs);
    if (numMatchingPairs > 0) {
        if (setDiffs.size / numMatchingPairs * 100 < 50) {
            match = true;
        }
    }

    const result = {
        match
    };

    return result;
};

const match = (req, res) => {
    const passageFingerprint = req.body.passageFingerprint;
    const result = tryToMatchPassage(passageFingerprint);
    res.json(result);
};

export default express.Router()
    .post('/match', match);
