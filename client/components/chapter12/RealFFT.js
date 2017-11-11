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
    const {outReXcomplex: FReXcomplex, outImXcomplex: FImXcomplex } = realFft(x1);
    const { TReXcomplex: x2 } = inverseFft(FReXcomplex, FImXcomplex);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x1} caption="x1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FReXcomplex} caption="FReXcomplex[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FImXcomplex} caption="FImXcomplex[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={x2} caption="x2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x1} caption="x1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FReXcomplex} caption="FReXcomplex[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FImXcomplex} caption="FImXcomplex[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={x2} caption="x2[n]" joinPoints={true} />
            </div>
        </div>
    );
};

export default RealFFT;
