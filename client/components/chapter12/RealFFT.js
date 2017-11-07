import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { realFft, inverseFft } from '../../../dsp';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';

const RealFFT = () => {

    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const x1 = signal1.map((value, index) => value + signal2[index]);
    const { ReX: FReX, ImX: FImX } = realFft(x1);
    const { ReX: x2 } = inverseFft(FReX, FImX);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x1} caption="x1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FReX} caption="FReX[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FImX} caption="FImX[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={x2} caption="x2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x1} caption="x1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FReX} caption="FReX[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FImX} caption="FImX[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={x2} caption="x2[n]" joinPoints={true} />
            </div>
        </div>
    );
};

export default RealFFT;
