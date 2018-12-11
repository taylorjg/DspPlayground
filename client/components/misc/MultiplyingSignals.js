import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { createIdealLowPassFilterKernel, blackmanWindow, multiplySignals } from '../../../dsp';

const MultiplyingSignals = () => {
    const n = 65;
    const fc = 0.25;
    const filterKernel = createIdealLowPassFilterKernel(n, fc);
    const window = blackmanWindow(filterKernel.length);
    const windowed = multiplySignals(filterKernel, window);
    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={window} caption="window[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={filterKernel} caption="filterKernel[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={windowed} caption="windowed[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={window} caption="window[n]" joinPoints={true} range={{ min: -1.5, max: +1.5 }} />
            </div>
            <div className="row">
                <Diagram dataPoints={filterKernel} caption="filterKernel[n]" joinPoints={true} range={{ min: -0.25, max: +0.25 }} />
            </div>
            <div className="row">
                <Diagram dataPoints={windowed} caption="windowed[n]" joinPoints={true} range={{ min: -0.25, max: +0.25 }} />
            </div>
        </div>
    );
};

export default MultiplyingSignals;
