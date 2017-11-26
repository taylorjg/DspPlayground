import { expect } from 'chai';
import { sineWave, dft, fft, inverseFft, realFft, realInverseFft, timeRealToComplex } from '../dsp';

describe('fft tests', () => {

    const TOLERANCE = 1e-12;

    it('fft round trip', () => {
        const x = sineWave(2, 128);
        const { TReXcomplex: TReXcomplex1, TImXcomplex: TImXcomplex1 } = timeRealToComplex(x);
        const { outReXcomplex: FReXcomplex, outImXcomplex: FImXcomplex } = fft(TReXcomplex1, TImXcomplex1);
        const { TReXcomplex: TReXcomplex2, TImXcomplex: TImXcomplex2 } = inverseFft(FReXcomplex, FImXcomplex);
        const n = x.length;
        for (let k = 0; k < n; k++) {
            expect(TReXcomplex1[k]).to.be.closeTo(TReXcomplex2[k], TOLERANCE);
            expect(TImXcomplex1[k]).to.be.closeTo(TImXcomplex2[k], TOLERANCE);
        }
    });

    it('compare realFft result to dft result', () => {
        const x = sineWave(2, 128);
        const { ReX: ReX1, ImX: ImX1 } = dft(x);
        const { outReXcomplex: ReX2, outImXcomplex: ImX2 } = realFft(x);
        const n = x.length;
        const nd2 = n / 2;
        for (let k = 0; k <= nd2; k++) {
            expect(ReX1[k]).to.be.closeTo(ReX2[k], TOLERANCE);
            expect(ImX1[k]).to.be.closeTo(ImX2[k], TOLERANCE);
        }
    });

    it('x => dft => realInverseFft => x', () => {
        const x1 = sineWave(2, 128);
        const { ReX, ImX } = dft(x1);
        const { x: x2, zeros } = realInverseFft(ReX, ImX);
        const n = x1.length;
        expect(x2.length).to.equal(n);
        expect(zeros.length).to.equal(n);
        for (let k = 0; k < n; k++) {
            expect(x1[k]).to.be.closeTo(x2[k], TOLERANCE);
            expect(zeros[k]).to.be.closeTo(0, TOLERANCE);
        }
    });

    it('x => realFft => inverseFft => x', () => {
        const x1 = sineWave(2, 128);
        const { outReXcomplex: FReXcomplex, outImXcomplex: FImXcomplex } = realFft(x1);
        const { TReXcomplex: x2 } = inverseFft(FReXcomplex, FImXcomplex);
        const n = x1.length;
        expect(x2.length).to.equal(n);
        for (let k = 0; k < n; k++) {
            expect(x1[k]).to.be.closeTo(x2[k], TOLERANCE);
        }
    });

    // TODO: add tests re symmetry (see figures 12-10 and 12-11)
});
