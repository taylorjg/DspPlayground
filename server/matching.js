const sameBins = (bins1, bins2) => {
    for (let i = 0; i < bins1.length; i++) {
        if (bins1[i] !== bins2[i]) return false;
        // if (Math.abs(bins1[i] - bins2[i]) > 2) return false;
    }
    return true;
};

const findMatchingPairs = (passageFingerprint, songFingerprint) => {

    const findMatchInSong = (passageBins, prevIdx2 = -1) =>
        songFingerprint.findIndex((songBins, idx2) =>
            idx2 > prevIdx2 && sameBins(passageBins, songBins));

    const pairs = passageFingerprint.map((passageBins, idx1) => {
        const idx2 = findMatchInSong(passageBins);
        return { idx1, idx2 };
    });
    
    return pairs.filter(({ idx2 }) => idx2 >= 0);

    // const pairs = [];

    // for (let idx1 = 0; idx1 < passageFingerprint.length; idx1++) {
    //     const passageBins = passageFingerprint[idx1];
    //     const lastPair = pairs.slice(-1)[0];
    //     if (lastPair) {
    //         const idx2 = findMatchInSong(passageBins, lastPair.idx2);
    //         if (idx2 >= 0) {
    //             pairs.push({ idx1, idx2 });
    //         }
    //         else {
    //             const idx2 = findMatchInSong(passageBins);
    //             idx2 >= 0 && pairs.push({ idx1, idx2 });
    //         }
    //     }
    //     else {
    //         const idx2 = findMatchInSong(passageBins);
    //         idx2 >= 0 && pairs.push({ idx1, idx2 });
    //     }
    // }

    // return pairs;
};

export const tryToMatchPassage = (passageFingerprint, songFingerprint) => {
    console.log(`passageFingerprint: ${JSON.stringify(passageFingerprint)}`);
    console.log(`songFingerprint: ${JSON.stringify(songFingerprint)}`);
    const matchingPairs = findMatchingPairs(passageFingerprint, songFingerprint);
    console.log(`matchingPairs: ${JSON.stringify(matchingPairs)}`);
    const numMatchingPairs = matchingPairs.length;
    console.log(`numMatchingPairs: ${numMatchingPairs}`);
    const diffs = matchingPairs.map(({ idx1, idx2 }) => idx2 - idx1);
    console.log(`diffs: ${JSON.stringify(diffs)}`);
    console.log(`diffs.length: ${diffs.length}`);
    const setDiffs = new Set(diffs);
    console.log(`setDiffs: ${JSON.stringify(Array.from(setDiffs))}`);
    console.log(`setDiffs.size: ${setDiffs.size}`);
    const match = numMatchingPairs > 0 && setDiffs.size / numMatchingPairs * 100 < 50;
    const result = {
        match
    };
    return result;
};
