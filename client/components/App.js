import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Convolution from './chapter6/Convolution';
import Correlation from './chapter7/Correlation';
import DFT from './chapter8/DFT';
import FTPairs from './chapter11/ftpairs';
import FFT from './chapter12/FFT';
import RealFFT from './chapter12/RealFFT';
import AddingSineWaves from './misc/AddingSineWaves';
import Shazam from './misc/Shazam';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Menu />
                    <Route path="/convolution/demo/:id" component={Convolution} />
                    <Route path="/correlation/demo/:id" component={Correlation} />
                    <Route path="/dft/demo/:id" component={DFT} />
                    <Route path="/ftpairs/demo/:id" component={FTPairs} />
                    <Route path="/fft/demo/:id" component={FFT} />
                    <Route path="/realfft" component={RealFFT} />
                    <Route path="/misc/addingSineWaves" component={AddingSineWaves} />
                    <Route path="/misc/shazam" component={Shazam} />
                </div>
            </BrowserRouter>
        );
    }
}

// navigator.mediaDevices.getUserMedia({ audio: true })
//     .then(function (mediaStream) {
//         const mediaRecorder = new MediaRecorder(mediaStream, {
//             audioBitsPerSecond: 44100
//         });
//         const chunks = [];
//         mediaRecorder.ondataavailable = function (e) {
//             console.log('[ondataavailable]');
//             chunks.push(e.data);
//         };
//         mediaRecorder.onstop = function () {
//             const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
//             const fileReader = new FileReader();
//             fileReader.onload = function() {
//                 console.log('[fileReader onload]');
//                 new AudioContext().decodeAudioData(this.result)
//                 .then(buffer => {
//                     console.log('[AudioContext.decodeAudioData then]');
//                     console.dir(buffer);
//                     const numberOfChannels = buffer.numberOfChannels;
//                     console.log(`numberOfChannels: ${numberOfChannels}`);
//                     const float32Array = buffer.getChannelData(0);
//                     console.log(`float32Array.length: ${float32Array.length}`);
//                     let min = Number.MAX_VALUE;
//                     let max = Number.MIN_VALUE;
//                     for (let i = 0; i < float32Array.length; i++) {
//                         const v = float32Array[i];
//                         min = v < min ? v : min;
//                         max = v > max ? v : max;
//                     }
//                     console.log(`min: ${min}; max: ${max}`);
//                 })
//                 .catch(function(err) {
//                     console.log(`[AudioContext.decodeAudioData catch] err: ${err}`);
//                 });
//             };
//             fileReader.readAsArrayBuffer(blob);
//         };
//         mediaRecorder.start();
//         console.log('Started recording...');
//         setTimeout(() => {
//             mediaRecorder.stop();
//             console.log('Stopped recording');
//         }, 5000);
//     })
//     .catch(function (err) {
//         console.log(`[getUserMedia catch] err: ${err}`);
//     });

export default App;
