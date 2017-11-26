import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { dft, rectToPolar } from '../../../dsp';

// See pages 210-211.
const selectInputSignal = id => {
    switch (id) {
        case 2:
        case 5:
            return Array(4).fill(0).concat([1]).concat(Array(59).fill(0));
        case 3:
        case 6:
            return Array(8).fill(0).concat([1]).concat(Array(55).fill(0));
        case 1:
        case 4:
        default:
            return Array(0).fill(0).concat([1]).concat(Array(63).fill(0));
    }
};

const FTPairs = route => {

    const id = Number(route.match.params.id);
    const x = selectInputSignal(id);
    const { ReX: ReXsingle, ImX: ImXsingle } = dft(x);
    const ReX = ReXsingle.concat(ReXsingle.slice(1));
    const ImX = ImXsingle.concat(ImXsingle.slice(1));
    const { MagX, PhaseX } = rectToPolar(ReX, ImX);
    
    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={x} caption="x[n]" />
            </div>
            {
                (id < 4)
                    ? (
                        <div>
                            <div className="row">
                                <DataPoints dataPoints={MagX} caption="Mag X[n]" />
                            </div>
                            <div className="row">
                                <DataPoints dataPoints={PhaseX} caption="Phase X[n]" />
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <DataPoints dataPoints={ReX} caption="Re X[n]" />
                            </div>
                            <div className="row">
                                <DataPoints dataPoints={ImX} caption="Im X[n]" />
                            </div>
                        </div>
                    )
            }

            <div className="row">
                <Diagram dataPoints={x} caption="x[n]" />
            </div>
            {
                (id < 4)
                    ? (
                        <div>
                            <div className="row">
                                <Diagram dataPoints={MagX} joinPoints={true} caption="Mag X[n]" />
                            </div>
                            <div className="row">
                                <Diagram dataPoints={PhaseX} joinPoints={true} caption="Phase X[n]" />
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="row">
                                <Diagram dataPoints={ReX} joinPoints={true} caption="Re X[n]" />
                            </div>
                            <div className="row">
                                <Diagram dataPoints={ImX} joinPoints={true} caption="Im X[n]" />
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default FTPairs;
