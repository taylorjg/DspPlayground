import { inverseDft } from './dft';

// TODO: add parameter for cut off frequency
// - as a fraction (0 - 0.5) of the sampling frequency
export const createLowPassFilterKernel = () => {
    const ReX = LOW_PASS_DATA;
    const ImX = ReX.map(() => 0);
    const x = inverseDft(ReX, ImX);
    const mid = x.length / 2;
    return x.slice(mid).concat(x.slice(0, mid));
};

// TODO: add parameter for cut off frequency (0 - 0.5) 
// - as a fraction (0 - 0.5) of the sampling frequency
export const createHighPassFilterKernel = () => {
    const ReX = LOW_PASS_DATA.slice().reverse();
    const ImX = ReX.map(() => 0);
    const x = inverseDft(ReX, ImX);
    const mid = x.length / 2;
    return x.slice(mid).concat(x.slice(0, mid));
};

// See p. 271 FIGURE 14-5b
const LOW_PASS_DATA =
    [].concat(
        Array(7).fill(1),
        [0.99, 0.9, 0.7, 0.3, 0.1, 0.01],
        Array(20).fill(0));
