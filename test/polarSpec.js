import { expect } from 'chai';
import { rectToPolar, polarToRect, dft } from '../dsp';
import sineWave2Hz from '../InputSignals/sine_2_128_128.json';

describe('polar tests', () => {

    const TOLERANCE = 1e-12;

    it('rect => polar => rect', () => {
        const x = sineWave2Hz.x;
        const { ReX: ReX1, ImX: ImX1 } = dft(x);
        const { MagX, PhaseX } = rectToPolar(ReX1, ImX1);
        const { ReX: ReX2, ImX: ImX2 } = polarToRect(MagX, PhaseX);
        const n = ReX1.length;
        for (let k = 0; k < n; k++) {
            expect(ReX1[k]).to.be.closeTo(ReX2[k], TOLERANCE);
            expect(ImX1[k]).to.be.closeTo(ImX2[k], TOLERANCE);
        }
    });
});
