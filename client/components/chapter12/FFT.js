import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { fft, inverseFft } from '../../../dsp';

const selectSignal = id => {
    const pulse = Array(6).fill(1).concat(Array(58).fill(0));
    const zeros = pulse.map(() => 0);
    if (id === 1) {
        return { ReX: pulse, ImX: zeros };
    }
    else {
        return { ReX: zeros, ImX: pulse };
    }
};

const FFT = route => {

    const id = Number(route.match.params.id);
    const { ReX: TReX1, ImX: TImX1 } = selectSignal(id);
    const { ReX: FReX, ImX: FImX } = fft(TReX1, TImX1);
    const { ReX: TReX2, ImX: TImX2 } = inverseFft(FReX, FImX);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={TReX1} caption="TReX1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={TImX1} caption="TImX1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FReX} caption="FReX[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FImX} caption="FImX[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={TReX2} caption="TReX2[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={TImX2} caption="TImX2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={TReX1} caption="TReX1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={TImX1} caption="TImX1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FReX} caption="FReX[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FImX} caption="FImX[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={TReX2} caption="TReX2[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={TImX2} caption="TImX2[n]" joinPoints={true} />
            </div>
        </div>
    );
};

export default FFT;
