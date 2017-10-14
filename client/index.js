// import inputSignal from './InputSignals/singleImpulse.json';
// import inputSignal from './InputSignals/sine_1_4_4.json';
// import inputSignal from './InputSignals/sine_1_16_16.json';
// import inputSignal from './InputSignals/sine_1_16_32.json';
import inputSignal from './InputSignals/sine_1_16_128.json';
// import inputSignal from './InputSignals/sine_4_16_64.json';
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

    drawDiagram('svg-x', x);
    drawDiagram('svg-ReX', ReX);
    drawDiagram('svg-ImX', ImX);
    drawDiagram('svg-x2', x2);
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

    return x.map(y => Math.abs(y) > EPSILON ? y : 0);
};

const normalise = (xs, isIm) => {
    const nover2 = xs.length - 1;
    return xs.map((x, index) => {
        const v1 = x / nover2;
        const v2 = v1 * (isIm ? -1 : 1);
        return (!isIm && (index == 0 || index == nover2)) ? v2 / 2 : v2;
    });
};

const drawDiagram = (id, values) => {
    const svg = document.getElementById(id);
    const w = svg.scrollWidth;
    const h = svg.scrollHeight;
    [1, 2, 3].forEach(i => {
        const y = h * i / 4;
        const line = createElement('line', {
            x1: 0,
            y1: y,
            x2: w - 1,
            y2: y,
            stroke: 'grey',
            'stroke-width': 1,
            'stroke-dasharray': [1, 4]
        });
        svg.appendChild(line);
    });
    [1, 2, 3, 4, 5, 6, 7].forEach(i => {
        const x = w * i / 8;
        const line = createElement('line', {
            x1: x,
            y1: 0,
            x2: x,
            y2: h - 1,
            stroke: 'grey',
            'stroke-width': 1,
            'stroke-dasharray': [1, 4]
        });
        svg.appendChild(line);
    });
    const SQUARE_SIZE = w / 128;
    const MIN_VALUE = Math.min(...values);
    const MAX_VALUE = Math.max(...values);
    const MAX = Math.max(Math.abs(MIN_VALUE), Math.abs(MAX_VALUE));
    const RANGE = 4 * MAX || 64;
    const MID_VALUE = 0;
    const MID_Y = h / 2;
    const STEP = h / RANGE;
    values.forEach((value, index) => {
        const x = w / values.length * index - (SQUARE_SIZE / 2);
        const dy = (value - MID_VALUE) * STEP;
        const y = MID_Y - dy - (SQUARE_SIZE / 2);
        const rect = createElement('rect', {
            x,
            y,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
            fill: 'black'
        });
        svg.appendChild(rect);
    });
};

const createElement = (elementName, additionalAttributes) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
    if (additionalAttributes) {
        Object.keys(additionalAttributes).forEach(k =>
            element.setAttribute(k, additionalAttributes[k]));
    }
    return element;
};
