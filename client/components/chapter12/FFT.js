import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { fft } from '../../../dsp';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';

const FFT = () => {

    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const x = signal1.map((value, index) => value + signal2[index]);
    const { ReX, ImX } = fft(x);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x} caption="x[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={ReX} caption="ReX[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={ImX} caption="ImX[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x} caption="x[n]" />
            </div>
            <div className="row">
                <Diagram dataPoints={ReX} caption="ReX[n]" />
            </div>
            <div className="row">
                <Diagram dataPoints={ImX} caption="ImX[n]" />
            </div>
        </div>
    );
};

export default FFT;
