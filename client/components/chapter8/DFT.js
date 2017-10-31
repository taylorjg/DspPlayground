import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { dft, inverseDft, rectToPolar } from '../../../dsp';
import inputSignal1 from '../../../InputSignals/sine_2_128_128.json';
import inputSignal2 from '../../../InputSignals/sine_8_128_128.json';

const DFT = route => {

    const id = Number(route.match.params.id);
    const signal1 = inputSignal1.x;
    const signal2 = inputSignal2.x;
    const x = signal1.map((value, index) => value + signal2[index]);
    const { ReX, ImX } = dft(x);
    const { MagX, PhaseX } = rectToPolar(ReX, ImX);
    const x2 = inverseDft(ReX, ImX);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x} caption="x[n]" />
            </div>
            {
                (id === 1)
                    ? (
                        <div>
                            <div className="row">
                                <DataPoints dataPoints={ReX} caption="ReX[n]" />
                            </div>
                            <div className="row">
                                <DataPoints dataPoints={ImX} caption="ImX[n]" />
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <DataPoints dataPoints={MagX} caption="MagX[n]" />
                            </div>
                            <div className="row">
                                <DataPoints dataPoints={PhaseX} caption="PhaseX[n]" />
                            </div>
                        </div>
                    )
            }
            <div className="row">
                <DataPoints dataPoints={x2} caption="x2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x} caption="x[n]" />
            </div>
            {
                (id === 1)
                    ? (
                        <div>
                            <div className="row">
                                <Diagram dataPoints={ReX} caption="ReX[n]" />
                            </div>
                            <div className="row">
                                <Diagram dataPoints={ImX} caption="ImX[n]" />
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <Diagram dataPoints={MagX} caption="MagX[n]" />
                            </div>
                            <div className="row">
                                <Diagram dataPoints={PhaseX} caption="PhaseX[n]" />
                            </div>
                        </div>
                    )
            }
            <div className="row">
                <Diagram dataPoints={x2} caption="x2[n]" />
            </div>
        </div>
    );
};

export default DFT;
