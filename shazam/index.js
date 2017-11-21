import { realFft, rectToPolar } from '../dsp';

export const SAMPLE_RATE = 8192;
export const NUM_CHUNKS_PER_SEC = 8;
export const POINTS_PER_CHUNK = SAMPLE_RATE / NUM_CHUNKS_PER_SEC;

// const RANGES = [40, 80, 120, 180, 300];
const RANGES = [40, 100, 400, 800, 1100];
const NUM_RANGES = RANGES.length - 1;
const LOWER_LIMIT = RANGES[0];
const UPPER_LIMIT = RANGES.slice(-1)[0];

const getRangeIndex = freq => {
    if (freq < LOWER_LIMIT || freq > UPPER_LIMIT) {
        throw new Error(`Frequency ${freq} is out of range.`);
    }
    const loop = i => freq > RANGES[i + 1] ? loop(i + 1) : i;
    return loop(0);
};

const range = (start, count) =>
    Array.from(Array(count).keys()).map(index => index + start);

export const findHighs = MagX => {
    const freqs = range(LOWER_LIMIT, UPPER_LIMIT - LOWER_LIMIT + 1);
    return freqs.reduce((acc, freq) => {
        const value = MagX[freq];
        const rangeIndex = getRangeIndex(freq);
        if (!acc[rangeIndex] || value > acc[rangeIndex].value) {
            acc[rangeIndex] = { freq, value };
        }
        return acc;
    }, Array(NUM_RANGES));
};

export const processChunk = chunk => {
    const zeros = Array(SAMPLE_RATE - POINTS_PER_CHUNK).fill(0);
    const paddedChunk = chunk.concat(zeros);
    const { outReXcomplex: ReX, outImXcomplex: ImX } = realFft(paddedChunk);
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
