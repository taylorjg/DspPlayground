import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { convolve, sineWave } from '../../../dsp';
import { createLowPassFilterKernel } from '../../../dsp';
import { createHighPassFilterKernel } from '../../../dsp';

const sineWave2Hz = sineWave(2, 128);

// See p. 112 FIGURE 6-5
const DEMO_1 = {
    x: [0, -1, -1.2, 2, 1.2, 1.2, 0.6, 0, -0.6],
    h: [1, -0.5, -0.2, -0.1]
};

const DEMO_2 = {
    x: sineWave2Hz,
    h: createLowPassFilterKernel()
};

const DEMO_3 = {
    x: sineWave2Hz,
    h: createHighPassFilterKernel()
};

const DEMOS = {
    '1': DEMO_1,
    '2': DEMO_2,
    '3': DEMO_3,
};

const DEFAULT_DEMO = DEMO_1;

const Convolution = route => {
    const id = route.match.params.id;
    const { x, h } = DEMOS[id] || DEFAULT_DEMO;
    const y = convolve(x, h);
    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x} caption="x[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={h} caption="h[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={y} caption="y[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x} caption="x[n]" />
            </div>
            <div className="row">
                <Diagram dataPoints={h} caption="h[n]" />
            </div>
            <div className="row">
                <Diagram dataPoints={y} caption="y[n]" />
            </div>
        </div>
    );
};

export default Convolution;
