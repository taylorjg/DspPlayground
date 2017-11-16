import { Complex } from './Complex';

export const fft2 = x => {

    const n = x.length;

    if (n === 1) {
        return [x[0]];
    }

    // Doesn't look quite right e.g. 6 is even but not a power of 2.
    // How about this: check whether Math.log2(n) is a whole number.
    if (n % 2 !== 0) {
        throw new Error('n is not a power of 2');
    }

    const nd2 = n / 2;
    const evens = Array(nd2);
    for (let k = 0; k < nd2; k++) {
        evens[k] = x[2 * k];
    }
    const q = fft2(evens);

    const odds = Array(nd2);
    for (let k = 0; k < nd2; k++) {
        odds[k] = x[2 * k + 1];
    }
    const r = fft2(odds);

    const y = Array(n);
    for (let k = 0; k < nd2; k++) {
        const kth = -2 * k * Math.PI / n;
        const wk = new Complex(Math.cos(kth), Math.sin(kth));
        y[k] = q[k].plus(wk.times(r[k]));
        y[k + nd2] = q[k].minus(wk.times(r[k]));
    }

    return y;
};
