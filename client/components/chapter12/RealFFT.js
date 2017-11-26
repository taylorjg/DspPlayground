import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { realFft, inverseFft, sineWave, addSignals } from '../../../dsp';

const RealFFT = () => {

    const signal1 = sineWave(2, 128);
    const signal2 = sineWave(8, 128);
    const x1 = addSignals(signal1, signal2);
    const {outReXcomplex: FReXcomplex, outImXcomplex: FImXcomplex } = realFft(x1);
    const { TReXcomplex: x2 } = inverseFft(FReXcomplex, FImXcomplex);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x1} caption="x1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FReXcomplex} caption="Re X[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FImXcomplex} caption="Im X[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={x2} caption="x2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x1} caption="x1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FReXcomplex} caption="Re X[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FImXcomplex} caption="Im X[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={x2} caption="x2[n]" joinPoints={true} />
            </div>
        </div>
    );
};

export default RealFFT;
