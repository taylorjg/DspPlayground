export const timeRealToComplex = x => ({
    TReXcomplex: x,
    TImXcomplex: x.map(() => 0)
});

// p. 227, TABLE 12-1
export const frequencyRealToComplex = (FReXreal, FImXreal) => {
    const l = FReXreal.length;
    const n = (l - 1) * 2;
    const FReXcomplex = FReXreal.slice().concat(Array(n - l));
    const FImXcomplex = FImXreal.slice().concat(Array(n - l));
    for (let k = l; k < n; k++) {
        FReXcomplex[k] = FReXreal[n - k];
        FImXcomplex[k] = -FImXreal[n - k];
    }
    return {
        FReXcomplex,
        FImXcomplex
    };
};

// p. 242, TABLE 12-7
export const realFft = x => {

    // TODO: implement the even/odd optimisation.
    const { TReXcomplex, TImXcomplex } = timeRealToComplex(x);
    return fft(TReXcomplex, TImXcomplex);

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

// p. 239, TABLE 12-6
export const realInverseFft = (FReXreal, FImXreal) => {
    const { FReXcomplex, FImXcomplex } = frequencyRealToComplex(FReXreal, FImXreal);
    const sum = FReXcomplex.map((v, index) => v + FImXcomplex[index]);
    const { outReXcomplex, outImXcomplex } = realFft(sum);
    const n = outReXcomplex.length;
    const x = outReXcomplex.map((v, index) => (v + outImXcomplex[index]) / n);
    return { x, zeros: x.map(() => 0) };
};

// p. 235, TABLE 12-4
export const fft = (inReXcomplex, inImXcomplex) => {

    const n = inReXcomplex.length;
    const reBuffer = inReXcomplex.slice();
    const imBuffer = inImXcomplex.slice();

    const nm1 = n - 1;
    const nd2 = n / 2;
    const m = Math.floor(Math.log2(n));
    let j = nd2;

    for (let i = 1; i <= n - 2; i++) {
        if (i < j) {
            const temp1 = reBuffer[j];
            reBuffer[j] = reBuffer[i];
            reBuffer[i] = temp1;
            const temp2 = imBuffer[j];
            imBuffer[j] = imBuffer[i];
            imBuffer[i] = temp2;
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
                const tr = reBuffer[ip] * ur - imBuffer[ip] * ui;
                const ti = reBuffer[ip] * ui + imBuffer[ip] * ur;
                reBuffer[ip] = reBuffer[i] - tr;
                imBuffer[ip] = imBuffer[i] - ti;
                reBuffer[i] += tr;
                imBuffer[i] += ti;
            }
            const tr2 = ur;
            ur = tr2 * sr - ui * si;
            ui = tr2 * si + ui * sr;
        }
    }

    return {
        outReXcomplex: reBuffer,
        outImXcomplex: imBuffer
    };
};

// p. 236, TABLE 12-5
export const inverseFft = (FReXcomplex, FImXcomplex) => {
    const { outReXcomplex: a, outImXcomplex: b } = fft(FReXcomplex, FImXcomplex.map(v => -v));
    const n = FReXcomplex.length;
    return {
        TReXcomplex: a.map(v => v / n),
        TImXcomplex: b.map(v => -v / n)
    };
};
