const TWO_PI = Math.PI * 2;
const FOUR_PI = Math.PI * 4;

// p. 286, EQUATION 16-1
export const hammingWindow = n =>
    Array.from(Array(n))
        .map((_, i) => 0.54 - 0.46 * Math.cos(TWO_PI * i / (n - 1)));

// p. 286, EQUATION 16-2
export const blackmanWindow = n =>
    Array.from(Array(n))
        .map((_, i) => 0.42 - 0.5 * Math.cos(TWO_PI * i / (n - 1)) + 0.08 * Math.cos(FOUR_PI * i / (n - 1)));
