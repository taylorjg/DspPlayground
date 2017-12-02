import React from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { createIdealLowPassFilterKernel, dft, rectToPolar, blackmanWindow, multiplySignals } from '../../../dsp';

const Blackman = () => {
    const n = 27;
    const filterKernel = createIdealLowPassFilterKernel(n, 0.25);
    const zeros = Array((filterKernel.length - 1) * 3 - 1).fill(0);
    const filterKernelPadded = filterKernel.concat(zeros);
    const blackman = blackmanWindow(filterKernel.length);
    const blackmanPadded = blackman.concat(zeros);
    const { ReX: ReX1, ImX: ImX1 } = dft(filterKernelPadded);
    const { MagX: MagX1 } = rectToPolar(ReX1, ImX1);
    const windowed = multiplySignals(filterKernelPadded, blackmanPadded);
    const { ReX: ReX2, ImX: ImX2 } = dft(windowed);
    const { MagX: MagX2 } = rectToPolar(ReX2, ImX2);
    return (
        <div>
            <div className="row">
                <DataPoints dataPoints={filterKernelPadded} caption="unwindowed filterKernel[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={MagX1} caption="unwindowed Mag X[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={windowed} caption="windowed filterKernel[n]" />
            </div>
            <div className="row">
                <DataPoints dataPoints={MagX2} caption="windowed Mag X[n]" />
            </div>

            <div className="row">
                <Diagram dataPoints={filterKernelPadded} caption="unwindowed filterKernel[n]" joinPoints={true} range={{ min: -0.25, max: +0.25 }} />
            </div>
            <div className="row">
                <Diagram dataPoints={MagX1} caption="unwindowed Mag X[n]" joinPoints={true} range={{ min: -1.5, max: +1.5 }} />
            </div>
            <div className="row">
                <Diagram dataPoints={windowed} caption="windowed filterKernel[n]" joinPoints={true} range={{ min: -0.25, max: +0.25 }} />
            </div>
            <div className="row">
                <Diagram dataPoints={MagX2} caption="windowed Mag X[n]" joinPoints={true} range={{ min: -1.5, max: +1.5 }} />
            </div>
        </div>
    );
};

export default Blackman;
