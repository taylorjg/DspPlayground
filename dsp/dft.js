const TWO_TIMES_PI = Math.PI * 2;
const NUM_DECIMAL_PLACES = 6;

export const dft = x => {

    const n = x.length;
    const ReX = Array(n / 2 + 1).fill(0);
    const ImX = Array(n / 2 + 1).fill(0);

    for (let k = 0; k < n / 2 + 1; k++) {
        for (let i = 0; i < n; i++) {
            const r = TWO_TIMES_PI * k * i / n;
            ReX[k] += x[i] * Math.cos(r);
            ImX[k] += -x[i] * Math.sin(r);
        }
    }

    return {
        ReX: ReX.map(round),
        ImX: ImX.map(round)
    };
};

export const inverseDft = (ReX, ImX) => {

    const normalisedReX = normalise(ReX, false);
    const normalisedImX = normalise(ImX, true);
    const n = (ReX.length - 1) * 2;
    const x = Array(n).fill(0);

    for (let k = 0; k < n / 2 + 1; k++) {
        for (let i = 0; i < n; i++) {
            const r = TWO_TIMES_PI * k * i / n;
            x[i] += normalisedReX[k] * Math.cos(r) + normalisedImX[k] * Math.sin(r);
        }
    }

    return x.map(round);
};

const normalise = (xs, isIm) => {
    const nover2 = xs.length - 1;
    return xs.map((x, index) => {
        const v1 = x / nover2;
        const v2 = v1 * (isIm ? -1 : 1);
        return (!isIm && (index == 0 || index == nover2)) ? v2 / 2 : v2;
    });
};

const round = x => Number(Number(x).toFixed(NUM_DECIMAL_PLACES));
