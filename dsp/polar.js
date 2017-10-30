export const rectToPolar = (ReX, ImX) => {
    const n = ReX.length;
    const MagX = Array(n);
    const PhaseX = Array(n);
    for (let k = 0; k < n; k++) {
        const re = ReX[k];
        const im = ImX[k];
        MagX[k] = Math.sqrt(re * re + im * im);
        const re2 = re || 1e-20;
        PhaseX[k] = Math.atan(im/re2);
        if (re < 0 && im < 0) {
            PhaseX[k] -= Math.PI;
        }
        if (re < 0 && im >= 0) {
            PhaseX[k] += Math.PI;
        }
    }
    return { MagX, PhaseX };
};

export const polarToRect = (MagX, PhaseX) => {
    const n = MagX.length;
    const ReX = Array(n);
    const ImX = Array(n);
    for (let k = 0; k < n; k++) {
        const mag = MagX[k];
        const phase = PhaseX[k];
        ReX[k] = mag * Math.cos(phase);
        ImX[k] = mag * Math.sin(phase);
    }
    return { ReX, ImX };
};
