const TWO_PI = Math.PI * 2;

// EQUATION 8-1
export const sineWave = (f, s, n = s) =>
    Array.from(Array(n))
        .map((_, i) => Math.sin(TWO_PI * f * i / s));

export const addSignals = (...signals) => {
    const n = signals[0].length;
    return Array.from(Array(n)).map((_, i) =>
        signals.reduce((acc, signal) => acc + signal[i], 0)
    );
};
