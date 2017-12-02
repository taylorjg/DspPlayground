import { expect } from 'chai';
import { fingerprint, SAMPLE_RATE } from '../shazam';
import { tryToMatchPassage } from '../server/matching';
import { passage as passage440 } from '../InputSignals/440_passage.json';
import { passage as passageAlmostBlue } from '../InputSignals/AlmostBlue_passage.json';
import pcm from 'pcm';

const loadMp3 = (filename, cb) => {

    const options = {
        stereo: false,
        sampleRate: SAMPLE_RATE
    };

    const samples = [];

    pcm.getPcmData(
        filename,
        options,
        sample => samples.push(sample),
        err => cb(err, samples)
    );
};

describe.skip('Shazam tests', () => {
    
    describe('basic matching', () => {

        it('440 Hz', done => {
            loadMp3('./InputSignals/440.mp3', (err, song) => {
                expect(err).to.be.null;
                const songFingerprint = fingerprint(song);
                const passageFingerprint = fingerprint(passage440);
                const { match } = tryToMatchPassage(passageFingerprint, songFingerprint);
                expect(match).to.be.true;
                done();
            });
        });

        it('AlmostBlue', done => {
            loadMp3('./InputSignals/AlmostBlue.mp3', (err, song) => {
                expect(err).to.be.null;
                const songFingerprint = fingerprint(song);
                const passageFingerprint = fingerprint(passageAlmostBlue);
                const { match } = tryToMatchPassage(passageFingerprint, songFingerprint);
                expect(match).to.be.true;
                done();
            });
        });
    });
});
