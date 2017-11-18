import React, { Component } from 'react';
import DataPoints from '../DataPoints';
import Diagram from '../Diagram';
import { realFft, rectToPolar, sineWave, addSignals } from '../../../dsp';

const STATE_NOT_RECORDING = 0;
const STATE_RECORDING = 1;
const STATE_RECORDED = 2;

const SAMPLE_RATE = 8192;
const NUM_CHUNKS_PER_SEC = 32;
const POINTS_PER_CHUNK = SAMPLE_RATE / NUM_CHUNKS_PER_SEC;

class Shazam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: STATE_NOT_RECORDING,
        };
        this.onRecord = this.onRecord.bind(this);
        this.onTestSignal = this.onTestSignal.bind(this);
    }

    componentWillMount() {
        this.offlineAudioContext = new OfflineAudioContext(1, SAMPLE_RATE, SAMPLE_RATE);
    }

    componentWillUnmount() {
        this.offlineAudioContext.close();
        this.offlineAudioContext = null;
    }

    logBiggestValues(MagX) {
        const zipped = MagX.map((v, index) => ({ v, index }));
        const sorted = zipped.sort((a, b) => b.v - a.v);
        for (let i = 0; i < 20; i++) {
            console.log(JSON.stringify(sorted[i]));
        }
    }

    processSignal(fullSignal) {
        const unpaddedSignal = fullSignal.slice(0, POINTS_PER_CHUNK);
        const paddedSignal = unpaddedSignal.concat(Array(SAMPLE_RATE - POINTS_PER_CHUNK).fill(0));
        const { outReXcomplex: ReX, outImXcomplex: ImX } = realFft(paddedSignal);
        const { MagX } = rectToPolar(ReX, ImX);
        const MagXhalf = MagX.slice(0, SAMPLE_RATE / 2 + 1);
        this.setState({
            currentState: STATE_RECORDED,
            unpaddedSignal,
            MagX: MagXhalf
        });
        this.logBiggestValues(MagXhalf);
    }

    record() {
        this.setState({
            currentState: STATE_RECORDING
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
                        console.log(`self.offlineAudioContext.sampleRate: ${self.offlineAudioContext.sampleRate}`);
                        self.offlineAudioContext.decodeAudioData(this.result)
                            .then(function (audioBuffer) {
                                console.log(`[decodeAudioData => then] audioBuffer.sampleRate: ${audioBuffer.sampleRate}`);
                                const float32Array = audioBuffer.getChannelData(0);
                                const fullSignal = Array.from(float32Array);
                                self.processSignal(fullSignal);
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

    onTestSignal() {
        const signal1 = sineWave(80, SAMPLE_RATE);
        const signal2 = sineWave(440, SAMPLE_RATE);
        const signal3 = sineWave(1000, SAMPLE_RATE);
        const fullSignal = addSignals(signal1, signal2, signal3);
        this.processSignal(fullSignal);
    }

    notRecording() {
        return (
            <div>
                <button className="btn btn-sm btn-danger" onClick={this.onRecord}>Record</button>
                <button className="btn btn-sm btn-default" onClick={this.onTestSignal}>Test Signal</button>
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
                    <button className="btn btn-sm btn-default" onClick={this.onTestSignal}>Test Signal</button>
                </div>

                <br />

                <div className="row">
                    <DataPoints dataPoints={this.state.unpaddedSignal} caption="x[n]" />
                </div>
                <div className="row">
                    <DataPoints dataPoints={this.state.MagX} caption="Mag X[n]" />
                </div>

                <div className="row">
                    <Diagram dataPoints={this.state.unpaddedSignal} caption="x[n]" joinPoints={true} />
                </div>
                <div className="row">
                    <Diagram dataPoints={this.state.MagX} caption="Mag X[n]" />
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
