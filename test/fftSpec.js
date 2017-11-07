import { expect } from 'chai';
import { dft, fft, realFft, inverseFft } from '../dsp';
import sineWave2Hz from '../InputSignals/sine_2_128_128.json';

describe('fft tests', () => {

    const TOLERANCE = 1e-6;

    it('fft round trip', () => {
        const x = sineWave2Hz.x;
        const n = x.length;
        const TReX1 = x;
        const TImX1 = x.map(() => 0);
        const { ReX: FReX, ImX: FImX } = fft(TReX1, TImX1);
        const { ReX: TReX2, ImX: TImX2 } = inverseFft(FReX, FImX);
        for (let k = 0; k < n; k++) {
            expect(TReX1[k]).to.be.closeTo(TReX2[k], TOLERANCE);
            expect(TImX1[k]).to.be.closeTo(TImX2[k], TOLERANCE);
        }
    });

    it('compare realFft result to dft result', () => {
        const x = sineWave2Hz.x;
        const { ReX: ReX1, ImX: ImX1 } = dft(x);
        const { ReX: ReX2, ImX: ImX2 } = realFft(x);
        const n = x.length;
        const nd2 = n / 2;
        for (let k = 0; k <= nd2; k++) {
            expect(ReX1[k]).to.be.closeTo(ReX2[k], TOLERANCE);
            expect(ImX1[k]).to.be.closeTo(ImX2[k], TOLERANCE);
        }
    });
});
