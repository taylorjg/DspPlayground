import { expect } from 'chai';
import { sineWave, rectToPolar, polarToRect, dft } from '../dsp';

describe('polar tests', () => {

    const VERY_SMALL_TOLERANCE = 1e-12;

    it('rect => polar => rect', () => {
        const x = sineWave(2, 128);
        const { ReX: ReX1, ImX: ImX1 } = dft(x);
        const { MagX, PhaseX } = rectToPolar(ReX1, ImX1);
        const { ReX: ReX2, ImX: ImX2 } = polarToRect(MagX, PhaseX);
        const n = ReX1.length;
        for (let k = 0; k < n; k++) {
            expect(ReX1[k]).to.be.closeTo(ReX2[k], VERY_SMALL_TOLERANCE);
            expect(ImX1[k]).to.be.closeTo(ImX2[k], VERY_SMALL_TOLERANCE);
        }
    });
});
