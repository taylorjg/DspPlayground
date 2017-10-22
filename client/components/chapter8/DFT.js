import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { dft, inverseDft } from '../../../dsp';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';

const DFT = () => {

    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const x = signal1.map((value, index) => value + signal2[index]);
    const { ReX, ImX } = dft(x);
    const x2 = inverseDft(ReX, ImX);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x} caption="x [ ]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={ReX} caption="ReX [ ]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={ImX} caption="ImX [ ]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={x2} caption="x2 [ ]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x} caption="x [ ]" />
            </div>
            <div className="row">
                <Diagram dataPoints={ReX} caption="ReX [ ]" />
            </div>
            <div className="row">
                <Diagram dataPoints={ImX} caption="ImX [ ]" />
            </div>
            <div className="row">
                <Diagram dataPoints={x2} caption="x2 [ ]" />
            </div>
        </div>
    );
};

export default DFT;
