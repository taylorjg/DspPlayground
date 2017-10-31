import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { correlate } from '../../../dsp';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';

const Correlation = () => {
    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const x = signal1.map((value, index) => value + signal2[index]);
    const h = signal2;
    const y = correlate(x, h);
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

export default Correlation;
