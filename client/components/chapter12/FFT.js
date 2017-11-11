import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { fft, inverseFft } from '../../../dsp';

const selectSignal = id => {
    const pulse = Array(6).fill(1).concat(Array(58).fill(0));
    const zeros = pulse.map(() => 0);
    return {
        TReXcomplex: id === 1 ? pulse : zeros,
        TImXcomplex: id === 1 ? zeros : pulse
    };
};

const FFT = route => {

    const id = Number(route.match.params.id);
    const { TReXcomplex: TReXcomplex1, TImXcomplex: TImXcomplex1 } = selectSignal(id);
    const { outReXcomplex: FReXcomplex, outImXcomplex: FImXcomplex } = fft(TReXcomplex1, TImXcomplex1);
    const { TReXcomplex: TReXcomplex2, TImXcomplex: TImXcomplex2 } = inverseFft(FReXcomplex, FImXcomplex);

    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={TReXcomplex1} caption="TReXcomplex1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={TImXcomplex1} caption="TImXcomplex1[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FReXcomplex} caption="FReXcomplex[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={FImXcomplex} caption="FImXcomplex[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={TReXcomplex2} caption="TReXcomplex2[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={TImXcomplex2} caption="TImXcomplex2[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={TReXcomplex1} caption="TReXcomplex1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={TImXcomplex1} caption="TImXcomplex1[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FReXcomplex} caption="FReXcomplex[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={FImXcomplex} caption="FImXcomplex[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={TReXcomplex2} caption="TReXcomplex2[n]" joinPoints={true} />
            </div>
            <div className="row">
                <Diagram dataPoints={TImXcomplex2} caption="TImXcomplex2[n]" joinPoints={true} />
            </div>
        </div>
    );
};

export default FFT;
