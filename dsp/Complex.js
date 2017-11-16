export class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }
    plus(b) {
        const a = this;
        return new Complex(a.re + b.re, a.im + b.im);
    }
    minus(b) {
        const a = this;
        return new Complex(a.re - b.re, a.im - b.im);
    }
    times(b) {
        const a = this;
        return new Complex(
            a.re * b.re - a.im * b.im,
            a.re * b.im + a.im * b.re);
    }
    abs() {
        return Math.hypot(this.re, this.im);
    }
}
