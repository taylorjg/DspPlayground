const yargs = require('yargs');

const argv = yargs
    .option('f', {
        describe: 'sine wave frequency',
        default: 16
    })
    .option('s', {
        describe: 'sampling frequency',
        default: 32
    })
    .option('n', {
        describe: 'number of samples',
        default: 32
    }).argv;

const f = argv.f;
const s = argv.s;
const n = argv.n;

if (f > s / 2) {
    console.warn('WARNING: Signal frequency > half the sampling frequency!');
}

const NUM_DECIMAL_PLACES = 6;
const TOTAL_RADIANS = 2 * Math.PI * f * n / s;
const INDICES = Array.from(Array(n).keys());

const round = x => Number(Number(x).toFixed(NUM_DECIMAL_PLACES));

const x = INDICES.map(index => {
    const r = TOTAL_RADIANS * index / n;
    const v = Math.sin(r);
    return round(v);
});

const inputSignal = { x };

console.log(JSON.stringify(inputSignal));
