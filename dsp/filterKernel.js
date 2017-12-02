import { inverseDft } from './dft';

// TODO: add parameter for cut off frequency
// - as a fraction (0 - 0.5) of the sampling frequency
export const createLowPassFilterKernel = () =>
    makeFilterKernel(LOW_PASS_DATA);

// TODO: add parameter for cut off frequency (0 - 0.5) 
// - as a fraction (0 - 0.5) of the sampling frequency
export const createHighPassFilterKernel = () =>
    makeFilterKernel(LOW_PASS_DATA.slice().reverse());

// p. 287, FIGURE 16-1a
export const createIdealLowPassFilterKernel = (n, fc) => {
    const numOnes = Math.floor(n * fc);
    const numZeros = n - numOnes;
    const data = Array(numOnes).fill(1).concat(Array(numZeros).fill(0));
    return makeFilterKernel(data);
};

export const createIdealHighPassFilterKernel = (n, fc) => {
    const numZeros = Math.floor(n * fc);
    const numOnes = n - numOnes;
    const data = Array(numZeros).fill(0).concat(Array(numOnes).fill(1));
    return makeFilterKernel(data);
};

const makeFilterKernel = data => {
    const ReX = data;
    const ImX = data.map(() => 0);
    const x = inverseDft(ReX, ImX);
    const mid = x.length / 2;
    return x.slice(mid + 1).concat(x.slice(0, mid));
};

// p. 271, FIGURE 14-5b
const LOW_PASS_DATA =
    [].concat(
        Array(7).fill(1),
        [0.99, 0.9, 0.7, 0.3, 0.1, 0.01],
        Array(20).fill(0));
