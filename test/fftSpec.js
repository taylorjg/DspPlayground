import { expect } from 'chai';
import { dft, fft } from '../dsp';
import sineWave2Hz from '../InputSignals/sine_2_128_128.json';

describe('FFT tests', () => {

    const TOLERANCE = 1e-6;

    it('compare FFT result to DFT result', () => {
        const x = sineWave2Hz.x;
        const { ReX: ReX1, ImX: ImX1 } = dft(x);
        const { ReX: ReX2, ImX: ImX2 } = fft(x);
        const n = x.length;
        const nd2 = n / 2;
        for (let k = 0; k <= nd2; k++) {
            expect(ReX1[k]).to.be.closeTo(ReX2[k], TOLERANCE);
            expect(ImX1[k]).to.be.closeTo(ImX2[k], TOLERANCE);
        }
    });
});
