import { realFft, rectToPolar, multiplySignals } from '../dsp';
import { blackmanWindow } from '../dsp'; // eslint-disable-line
import { rectangularWindow } from '../dsp'; // eslint-disable-line

export const SAMPLE_RATE = 8192;
const POINTS_PER_CHUNK = SAMPLE_RATE / 32;
// bins: indices 0-127, 32 Hz wide up to 4 KHz
// const RANGES = [0, 40, 80, 120, 180, 300];
// const RANGES = [0, 4, 8, 16, 32, 127];
const RANGES = [0, 2, 6, 32, 127];

const NUM_RANGES = RANGES.length - 1;
const LOWER_LIMIT = RANGES[0];
const UPPER_LIMIT = RANGES.slice(-1)[0];

const getRangeIndex = binIndex => {
    if (binIndex < LOWER_LIMIT || binIndex > UPPER_LIMIT) {
        throw new Error(`Bin index ${binIndex} is out of range.`);
    }
    const loop = i => binIndex > RANGES[i + 1] ? loop(i + 1) : i;
    return loop(0);
};

const range = (start, count) =>
    Array.from(Array(count).keys()).map(index => index + start);

export const findHighs = MagX => {
    const binIndices = range(LOWER_LIMIT, UPPER_LIMIT - LOWER_LIMIT + 1);
    return binIndices.reduce((acc, binIndex) => {
        const value = MagX[binIndex];
        const rangeIndex = getRangeIndex(binIndex);
        if (!acc[rangeIndex] || value > acc[rangeIndex].value) {
            acc[rangeIndex] = { binIndex, value };
        }
        return acc;
    }, Array(NUM_RANGES));
};

export const processChunk = chunk => {
    // const window = blackmanWindow(chunk.length);
    const window = rectangularWindow(chunk.length);
    const windowed = multiplySignals(chunk, window);
    const { outReXcomplex, outImXcomplex } = realFft(windowed);
    const nd2 = chunk.length / 2;
    const ReX = outReXcomplex.slice(0, nd2);
    const ImX = outImXcomplex.slice(0, nd2);
    const { MagX } = rectToPolar(ReX, ImX);
    return findHighs(MagX);
};

export const processChunks = signal => {
    const numChunks = Math.floor(signal.length / POINTS_PER_CHUNK);
    return range(0, numChunks).map(i => {
        const from = i * POINTS_PER_CHUNK;
        const to = from + POINTS_PER_CHUNK;
        const chunk = signal.slice(from, to);
        return processChunk(chunk);
    });
};

// TODO: add optional 2nd param: options
// default to POINTS_PER_CHUNK and RANGES
export const fingerprint = signal =>
    processChunks(signal).map(items => items.map(item => item.binIndex));
