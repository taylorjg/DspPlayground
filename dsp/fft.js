// TABLE 12-7 p. 242
export const realFft = x => {

    // TODO: even/odd optimisation. For now, keep it simple.
    return fft(x, x.map(() => 0));

    //     const n = x.length;
    //     const nh = n / 2;
    //     const evens = Array(nh);
    //     const odds = Array(nh);
    //     for (let i = 0; i < nh; i++) {
    //         const ii = 2 * i;
    //         evens[i] = x[ii];
    //         odds[i] = x[ii + 1];
    //     }
    //     const ReX = Array(n);
    //     const ImX = Array(n);
    //     return { ReX, ImX };
};

// TABLE 12-4 p. 235
export const fft = (TReX, TImX) => {

    const n = TReX.length;
    const ReX = TReX.slice();
    const ImX = TImX.slice();

    const nm1 = n - 1;
    const nd2 = n / 2;
    const m = Math.floor(Math.log2(n));
    let j = nd2;

    for (let i = 1; i <= n - 2; i++) {
        if (i < j) {
            const temp1 = ReX[j];
            ReX[j] = ReX[i];
            ReX[i] = temp1;
            const temp2 = ImX[j];
            ImX[j] = ImX[i];
            ImX[i] = temp2;
        }
        let k = nd2;
        while (k <= j) {
            j -= k;
            k /= 2;
        }
        j += k;
    }

    for (let l = 1; l <= m; l++) {
        const le = Math.pow(2, l);
        const le2 = le / 2;
        let ur = 1;
        let ui = 0;
        const sr = Math.cos(Math.PI / le2);
        const si = -Math.sin(Math.PI / le2);
        for (let j = 1; j <= le2; j++) {
            const jm1 = j - 1;
            for (let i = jm1; i <= nm1; i += le) {
                const ip = i + le2;
                const tr = ReX[ip] * ur - ImX[ip] * ui;
                const ti = ReX[ip] * ui + ImX[ip] * ur;
                ReX[ip] = ReX[i] - tr;
                ImX[ip] = ImX[i] - ti;
                ReX[i] += tr;
                ImX[i] += ti;
            }
            const tr2 = ur;
            ur = tr2 * sr - ui * si;
            ui = tr2 * si + ui * sr;
        }
    }

    return { ReX, ImX };
};

// TABLE 12-5 p. 236
export const inverseFft = (FReX, FImX) => {
    const n = FReX.length;
    const { ReX: a, ImX: b } = fft(FReX, FImX.map(v => -v));
    return {
        ReX: a.map(v => v/n),
        ImX: b.map(v => -v/n)
    };
};
