// p. 114, TABLE 6-1
export const convolve = (x, h) => {
    const y = Array(x.length + h.length - 1).fill(0);
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < h.length; j++) {
            y[i + j] += x[i] * h[j];
        }
    }
    return y;
};
