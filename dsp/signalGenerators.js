const TWO_PI = Math.PI * 2;

// p. 150, EQUATION 8-1
export const cosineWave = (f, s, n = s) =>
    Array.from(Array(n))
        .map((_, i) => Math.cos(TWO_PI * f * i / s));

// p. 150, EQUATION 8-1
export const sineWave = (f, s, n = s) =>
    Array.from(Array(n))
        .map((_, i) => Math.sin(TWO_PI * f * i / s));
