import inputSignal from './InputSignals/singleImpulse.json';
// import inputSignal from './InputSignals/sine_16_32_32.json';
// import inputSignal from './InputSignals/sine_16_128_128.json';

$(document).ready(() => {

    const x = inputSignal.x;
    const { ReX, ImX } = dft(x);
    const x2 = inverseDft(ReX, ImX);
    
    $('#x').html(JSON.stringify(x));
    $('#ReX').html(JSON.stringify(ReX));
    $('#ImX').html(JSON.stringify(ImX));
    $('#x2').html(JSON.stringify(x2));
});

const TWO_TIMES_PI = Math.PI * 2;
const EPSILON = 1e-13;

const dft = x => {

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

    return { ReX, ImX };
};

const inverseDft = (ReX, ImX) => {

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

    return x.map(y => y > EPSILON ? y : 0);
};

const normalise = (xs, isIm) => {
    const nover2 = xs.length - 1;
    return xs.map((x, index) => {
        const v1 = x / nover2;
        const v2 = v1 * (isIm ? -1 : 1);
        return (!isIm && (index == 0 || index == nover2)) ? v2 / 2 : v2;
    });
};
