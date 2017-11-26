import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { correlate, sineWave, addSignals } from '../../../dsp';

const Correlation = route => {
    const id = Number(route.match.params.id);
    const signal1 = sineWave(2, 128);
    const signal2 = sineWave(8, 128);
    const x = addSignals(signal1, signal2);
    const h = id === 1 ? signal1 : signal2;
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
