import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';

const AddingSineWaves = () => {
    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const signal3 = signal1.map((value, index) => value + signal2[index]);
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
