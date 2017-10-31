import { convolve } from './convolution';

export const correlate = (x, h) =>
    convolve(x, h.slice().reverse());
