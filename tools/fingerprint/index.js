// Use the following command to run this program:
// $ node_modules/.bin/babel-node tools/fingerprint/index.js
// or
// node -r babel-register tools/fingerprint

import * as pcm from 'pcm';
import { fingerprint, SAMPLE_RATE } from '../../shazam';

const INPUT_FILE = './InputSignals/AlmostBlue.mp3';
// const INPUT_FILE = './InputSignals/440-1.mp3';
// const INPUT_FILE = './InputSignals/440-2.mp3';
// const INPUT_FILE = './InputSignals/85.mp3';
// const INPUT_FILE = './InputSignals/walton.m4a';

const options = {
    stereo: false,
    sampleRate: SAMPLE_RATE
};

const signal = [];

pcm.getPcmData(
    INPUT_FILE,
    options,
    (sample, channel) => {
        // console.log(`[sampleCallback] sample: ${sample}; channel: ${channel}`);
        signal.push(sample);
    },
    (err, output) => {
        if (err) {
            console.log(`[endCallback] err: ${err}`);
        }
        else {
            // console.log(`[endCallback] output: ${output}`);
            // console.log(`signal.length: ${signal.length}`);
            // const inputSignal = { x: signal };
            // console.log(JSON.stringify(inputSignal));
            const fp = fingerprint(signal);
            console.log(JSON.stringify(fp, null, 2));
        }
    }
);
