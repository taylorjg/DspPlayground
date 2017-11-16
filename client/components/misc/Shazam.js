import React, { Component } from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { dft } from '../../../dsp';
// import { fft2 } from '../../../dsp';
// import { realFft } from '../../../dsp';
import { rectToPolar } from '../../../dsp';
// import { Complex } from '../../../dsp';
import inputSignal1 from '../../../InputSignals/sine_80_4096_4096.json';
import inputSignal2 from '../../../InputSignals/sine_440_4096_4096.json';
import inputSignal3 from '../../../InputSignals/sine_1000_4096_4096.json';

const STATE_NOT_RECORDING = 0;
const STATE_RECORDING = 1;
const STATE_RECORDED = 2;

const SAMPLE_RATE = 4096;

class Shazam extends Component {
    constructor(props) {
        super(props);
        const from = 0 + 13; // 1024 * 10;
        const to = 128 + 13; // 1024 * 11;
        const fullSignal = inputSignal1.x.map((v, index) => v + inputSignal2.x[index] + inputSignal3.x[index]);
        console.log(`fullSignal.length: ${fullSignal.length}`);
        const unpaddedSignal = fullSignal.slice(from, to);
        const paddedSignal = unpaddedSignal.concat(Array(SAMPLE_RATE - 128).fill(0));

        // const complexSignal = signal.map(v => new Complex(v, 0));

        // const signal = fullSignal;
        // const n = 1024;
        // const signal = fullSignal.slice(0, n).concat(Array(fullSignal.length - n).fill(0));
        
        // console.log(`signal.length: ${signal.length}`);
        // TODO: why does realFft produce NaNs when given a large buffer ? (dft handles it)
        // const { outReXcomplex: ReX, outImXcomplex: ImX } = realFft(signal);
        const { ReX, ImX } = dft(paddedSignal);
        // const y = fft2(complexSignal);
        // const ReX = y.map(c => c.re);
        // const ImX = y.map(c => c.im);
        const { MagX /* , PhaseX */ } = rectToPolar(ReX, ImX);

        // TODO: calc Complex abs (hypot) of MagX/PhaseX (or ReX/ImX ? or do both to compare them?)
        // - pairs of values
        // - Math.hypot(MagX[k], PhaseX[k]) + 1
        // - then display them as Diagrams
        // const AbsX1 = ReX.map((v, index) => Math.hypot(v, ImX[index]));
        // const AbsX2 = MagX.map((v, index) => Math.hypot(v, PhaseX[index]));
        
        // TODO - try using this.audioContext.createAnalyzer() ?
        // - it supports FFT ?

        // MagX.forEach((v, index) => {
        //     if (v > 1000) {
        //         console.log(`[MagX] index: ${index}`);
        //     }
        // });

        // const fred = MagX.map((v, index) => ({v, index})).sort((a, b) => b.v - a.v);
        // console.log(JSON.stringify(fred[0]));
        // console.log(JSON.stringify(fred[1]));
        // console.log(JSON.stringify(fred[2]));
        
        this.state = {
            // currentState: STATE_NOT_RECORDING
            currentState: STATE_RECORDED,
            unpaddedSignal,
            // paddedSignal,
            // ReX,
            // ImX,
            MagX
            // PhaseX
            // AbsX1,
            // AbsX2
        };
        this.onRecord = this.onRecord.bind(this);
    }
    componentWillMount() {
        this.audioContext = new AudioContext();
        this.offlineAudioContext = new OfflineAudioContext(1, SAMPLE_RATE, SAMPLE_RATE);
    }
    componentWillUnmount() {
        this.audioContext.close();
        this.audioContext = null;
    }
    record() {
        this.setState({
            currentState: STATE_RECORDING,
            signal: null
        });
        const self = this;
        const constraints = {
            audio: {
                sampleRate: {
                    exact: SAMPLE_RATE
                }
            }
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
                console.log(`[getUserMedia => then]`);
                console.dir(mediaStream);
                const audioTracks = mediaStream.getAudioTracks();
                console.dir(audioTracks);
                const mediaRecorder = new MediaRecorder(mediaStream, {
                    audioBitsPerSecond: SAMPLE_RATE
                });
                const audioTrack = audioTracks[0];
                console.dir(audioTrack.getConstraints());
                const chunks = [];
                mediaRecorder.ondataavailable = function (e) {
                    console.log('[mediaRecorder => ondataavailable]');
                    chunks.push(e.data);
                };
                mediaRecorder.onstop = function () {
                    console.log(`[mediaRecorder => onstop] mediaRecorder.audioBitsPerSecond: ${mediaRecorder.audioBitsPerSecond}`);
                    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                    const fileReader = new FileReader();
                    fileReader.onload = function () {
                        console.log('[fileReader => onload]');
                        console.dir(this.result);
                        console.dir(self.audioContext);
                        // console.log(`self.audioContext.sampleRate: ${self.audioContext.sampleRate}`);
                        console.log(`self.offlineAudioContext.sampleRate: ${self.offlineAudioContext.sampleRate}`);
                        // self.audioContext.decodeAudioData(this.result)
                        self.offlineAudioContext.decodeAudioData(this.result)
                            .then(function (audioBuffer) {
                                console.log(`[decodeAudioData => then] audioBuffer.sampleRate: ${audioBuffer.sampleRate}`);
                                // const float32Array = audioBuffer.getChannelData(0);
                                // console.log(`float32Array.length: ${float32Array.length}`);
                                // const from = SAMPLE_RATE / 32 * 5;
                                // const to = SAMPLE_RATE / 32 * 6;
                                // const signal = Array.from(float32Array.slice(from, to)).concat(Array(SAMPLE_RATE - SAMPLE_RATE / 32).fill(0));
                                // console.log(`signal.length: ${signal.length}`);
                                // // const { outReXcomplex: ReX, outImXcomplex: ImX } = realFft(signal);
                                // const { ReX, ImX } = dft(signal);
                                // const { MagX, PhaseX } = rectToPolar(ReX, ImX);
                                // self.setState({
                                //     currentState: STATE_RECORDED,
                                //     signal,
                                //     ReX,
                                //     ImX,
                                //     MagX,
                                //     PhaseX
                                // });
                            })
                            .catch(function (err) {
                                console.log(`[decodeAudioData => catch] err: ${err}`);
                                self.setState({
                                    currentState: STATE_NOT_RECORDING
                                });
                            });
                    };
                    fileReader.readAsArrayBuffer(blob);
                };
                mediaRecorder.start();
                console.log('Recording...');
                setTimeout(function () {
                    mediaRecorder.stop();
                    console.log('Stopped recording');
                }, 1000);
            })
            .catch(function (err) {
                console.log(`[getUserMedia => catch] err: ${err}`);
                self.setState({
                    currentState: STATE_NOT_RECORDING
                });
            });
    }
    onRecord() {
        console.log('[onRecord]');
        this.record();
    }
    notRecording() {
        return (
            <div>
                <button className="btn btn-sm btn-danger" onClick={this.onRecord}>Record</button>
            </div>
        );
    }
    recording() {
        return (
            <div>
                <p>Recording...</p>
            </div>
        );
    }
    recorded() {
        return (
            <div>
                <div>
                    <button className="btn btn-sm btn-danger" onClick={this.onRecord}>Record</button>
                </div>

                <br />

                <div className="row">
                    <DataPoints dataPoints={this.state.unpaddedSignal} caption="x[n]" />
                </div>
                {/* <div className="row">
                    <DataPoints dataPoints={this.state.ReX} caption="Re X[n]" />
                </div> */}
                {/* <div className="row">
                    <DataPoints dataPoints={this.state.ImX} caption="Im X[n]" />
                </div> */}
                <div className="row">
                    <DataPoints dataPoints={this.state.MagX} caption="Mag X[n]" />
                </div>
                {/* <div className="row">
                    <DataPoints dataPoints={this.state.PhaseX} caption="Phase X[n]" />
                </div> */}
                {/* <div className="row">
                    <DataPoints dataPoints={this.state.AbsX1} caption="AbsX1[n]" />
                </div>
                <div className="row">
                    <DataPoints dataPoints={this.state.AbsX2} caption="AbsX2[n]" />
                </div> */}

                <div className="row">
                    <Diagram dataPoints={this.state.unpaddedSignal} caption="x[n]" joinPoints={true} />
                </div>
                {/* <div className="row">
                    <Diagram dataPoints={this.state.ReX} caption="Re X[n]" />
                </div> */}
                {/* <div className="row">
                    <Diagram dataPoints={this.state.ImX} caption="Im X[n]" />
                </div> */}
                <div className="row">
                    <Diagram dataPoints={this.state.MagX} caption="Mag X[n]" />
                </div>
                {/* <div className="row">
                    <Diagram dataPoints={this.state.PhaseX} caption="Phase X[n]" />
                </div> */}
                {/* <div className="row">
                    <Diagram dataPoints={this.state.AbsX1} caption="AbsX1[n]" />
                </div>
                <div className="row">
                    <Diagram dataPoints={this.state.AbsX2} caption="AbsX2[n]" />
                </div> */}
            </div>
        );
    }
    render() {
        switch (this.state.currentState) {
            case STATE_NOT_RECORDING:
                return this.notRecording();
            case STATE_RECORDING:
                return this.recording();
            case STATE_RECORDED:
                return this.recorded();
        }
    }
}

export default Shazam;
