import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { sineWave, addSignals } from '../../../dsp';

const AddingSineWaves = () => {
    const signal1 = sineWave(2, 128);
    const signal2 = sineWave(8, 128);
    const signal3 = addSignals(signal1, signal2);
    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={signal1} caption="signal1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={signal2} caption="signal2[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={signal3} caption="signal3[n] = signal1[n] + signal2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={signal1} caption="signal1[n]" />
            </div>
            <div className="row">
                <Diagram dataPoints={signal2} caption="signal2[n]" />
            </div>
            <div className="row">
                <Diagram dataPoints={signal3} caption="signal3[n] = signal1[n] + signal2[n]" />
            </div>
        </div>
    );
};

export default AddingSineWaves;
