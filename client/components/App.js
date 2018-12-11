import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Convolution from './chapter6/Convolution';
import Correlation from './chapter7/Correlation';
import DFT from './chapter8/DFT';
import FTPairs from './chapter11/ftpairs';
import FFT from './chapter12/FFT';
import RealFFT from './chapter12/RealFFT';
import Blackman from './chapter16/Blackman';
import AddingSignals from './misc/AddingSignals';
import MultiplyingSignals from './misc/MultiplyingSignals';
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
                    <Route path="/blackman" component={Blackman} />
                    <Route path="/misc/addingSignals" component={AddingSignals} />
                    <Route path="/misc/multiplyingSignals" component={MultiplyingSignals} />
                    <Route path="/misc/shazam" component={Shazam} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
