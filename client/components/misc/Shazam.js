import React, { Component } from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { realFft, rectToPolar } from '../../../dsp';

const STATE_NOT_RECORDING = 0;
const STATE_RECORDING = 1;
const STATE_RECORDED = 2;

class Shazam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: STATE_NOT_RECORDING
        };
        this.onRecord = this.onRecord.bind(this);
    }
    componentWillMount() {
        this.audioContext = new AudioContext();
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
        const sampleRate = 44100;
        const self = this;
        const constraints = {
            audio: {
                sampleRate: {
                    exact: sampleRate
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
                    audioBitsPerSecond: sampleRate
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
                        self.audioContext.decodeAudioData(this.result)
                            .then(function (audioBuffer) {
                                console.log(`[decodeAudioData => then] audioBuffer.sampleRate: ${audioBuffer.sampleRate}`);
                                const float32Array = audioBuffer.getChannelData(0);
                                console.log(`float32Array.length: ${float32Array.length}`);
                                const from = 1024 * 10;
                                const to = 1024 * 11;
                                const signal = Array.from(float32Array.slice(from, to));
                                console.log(`signal.length: ${signal.length}`);
                                const { outReXcomplex: ReX, outImXcomplex: ImX } = realFft(signal);
                                const { MagX, PhaseX } = rectToPolar(ReX, ImX);
                                self.setState({
                                    currentState: STATE_RECORDED,
                                    signal,
                                    ReX,
                                    ImX,
                                    MagX,
                                    PhaseX
                                });
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
                    <DataPoints dataPoints={this.state.signal} caption="signal[n]" />
                </div>
                <div className="row">
                    <DataPoints dataPoints={this.state.ReX} caption="ReX[n]" />
                </div>
                <div className="row">
                    <DataPoints dataPoints={this.state.ImX} caption="ImX[n]" />
                </div>
                <div className="row">
                    <DataPoints dataPoints={this.state.MagX} caption="MagX[n]" />
                </div>
                <div className="row">
                    <DataPoints dataPoints={this.state.PhaseX} caption="PhaseX[n]" />
                </div>

                <div className="row">
                    <Diagram dataPoints={this.state.signal} caption="signal[n]" />
                </div>
                <div className="row">
                    <Diagram dataPoints={this.state.ReX} caption="ReX[n]" />
                </div>
                <div className="row">
                    <Diagram dataPoints={this.state.ImX} caption="ImX[n]" />
                </div>
                <div className="row">
                    <Diagram dataPoints={this.state.MagX} caption="MagX[n]" />
                </div>
                <div className="row">
                    <Diagram dataPoints={this.state.PhaseX} caption="PhaseX[n]" />
                </div>
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
