import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { dft, inverseDft, rectToPolar, sineWave, addSignals } from '../../../dsp';

const DFT = route => {

    const id = Number(route.match.params.id);
    const signal1 = sineWave(2, 128);
    const signal2 = sineWave(8, 128);
    const x1 = addSignals(signal1, signal2);
    const { ReX, ImX } = dft(x1);
    const { MagX, PhaseX } = rectToPolar(ReX, ImX);
    const x2 = inverseDft(ReX, ImX);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x1} caption="x1[n]" />
            </div>
            {
                (id === 1)
                    ? (
                        <div>
                            <div className="row">
                                <DataPoints dataPoints={ReX} caption="Re X[n]" />
                            </div>
                            <div className="row">
                                <DataPoints dataPoints={ImX} caption="Im X[n]" />
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <DataPoints dataPoints={MagX} caption="Mag X[n]" />
                            </div>
                            <div className="row">
                                <DataPoints dataPoints={PhaseX} caption="Phase X[n]" />
                            </div>
                        </div>
                    )
            }
            <div className="row">
                <DataPoints dataPoints={x2} caption="x2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={x1} caption="x1[n]" />
            </div>
            {
                (id === 1)
                    ? (
                        <div>
                            <div className="row">
                                <Diagram dataPoints={ReX} caption="Re X[n]" />
                            </div>
                            <div className="row">
                                <Diagram dataPoints={ImX} caption="Im X[n]" />
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <Diagram dataPoints={MagX} caption="Mag X[n]" />
                            </div>
                            <div className="row">
                                <Diagram dataPoints={PhaseX} caption="Phase X[n]" />
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
