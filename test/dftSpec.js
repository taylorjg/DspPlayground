import { expect } from 'chai';
import { dft, inverseDft } from '../dsp';
import sineWave2Hz from '../InputSignals/sine_2_128_128.json';

describe('dft tests', () => {

    const VERY_SMALL_TOLERANCE = 1e-12;

    it('dft round trip', () => {
        const x1 = sineWave2Hz.x;
        const { ReX, ImX } = dft(x1);
        const x2 = inverseDft(ReX, ImX);
        const n = x1.length;
        for (let k = 0; k < n; k++) {
            expect(x1[k]).to.be.closeTo(x2[k], VERY_SMALL_TOLERANCE);
        }
    });
});
