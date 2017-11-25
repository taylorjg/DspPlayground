/* global $ */

import React, { Component } from 'react';
import { SAMPLE_RATE } from '../../../shazam';

const STATE_NOT_RECORDING = 0;
const STATE_RECORDING = 1;
const STATE_SENDING = 3;
const STATE_MATCH = 4;
const STATE_NO_MATCH = 5;
const STATE_ERROR = 6;

class Shazam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: STATE_NOT_RECORDING,
        };
        this.onRecord = this.onRecord.bind(this);
    }

    componentWillMount() {
        this.offlineAudioContext = new OfflineAudioContext(1, SAMPLE_RATE, SAMPLE_RATE);
    }

    componentWillUnmount() {
        this.offlineAudioContext.close();
        this.offlineAudioContext = null;
    }

    processSignal(passage) {
        this.setState({
            currentState: STATE_SENDING
        });
        const self = this;
        $.post({
            url: '/api/match',
            data: JSON.stringify({passage}),
            contentType: 'application/json'
        })
        .done(response => {
            self.setState({
                currentState: response.match ? STATE_MATCH : STATE_NO_MATCH
            });
        })
        .fail(error => {
            self.setState({
                currentState: STATE_ERROR,
                error
            });
        });
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
                                const passage = Array.from(float32Array);
                                self.processSignal(passage);
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

    sending() {
        return (
            <div>
                <p>Sending...</p>
            </div>
        );
    }

    match() {
        return (
            <div>
                <div>
                    <button className="btn btn-sm btn-danger" onClick={this.onRecord}>Record</button>
                </div>

                <br />

                <p>Match :)</p>
            </div>
        );
    }

    noMatch() {
        return (
            <div>
                <div>
                <button className="btn btn-sm btn-danger" onClick={this.onRecord}>Record</button>
            </div>

            <br />

            <p>No Match :(</p>
        </div>
        );
    }

    error() {
        return (
            <div>
                <div>
                <button className="btn btn-sm btn-danger" onClick={this.onRecord}>Record</button>
            </div>

            <br />

            {
                (this.state.error && this.state.error.status && this.state.error.statusText)
                ? <p>Error!!! ({this.state.error.status} {this.state.error.statusText})</p>
                : <p>Error!!!</p>
            }
        </div>
        );
    }

    render() {
        switch (this.state.currentState) {
            case STATE_NOT_RECORDING:
                return this.notRecording();
            case STATE_RECORDING:
                return this.recording();
            case STATE_SENDING:
                return this.sending();
            case STATE_MATCH:
                return this.match();
            case STATE_NO_MATCH:
                return this.noMatch();
            case STATE_ERROR:
                return this.error();
        }
    }
}

export default Shazam;
