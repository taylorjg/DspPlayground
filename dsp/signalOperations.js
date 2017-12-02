export const addSignals = (...signals) => {
    const n = signals[0].length;
    return Array.from(Array(n)).map((_, i) =>
        signals.reduce((acc, signal) => acc + signal[i], 0)
    );
};

export const multiplySignals = (...signals) => {
    const n = signals[0].length;
    return Array.from(Array(n)).map((_, i) =>
        signals.reduce((acc, signal) => acc * signal[i], 1)
    );
};
