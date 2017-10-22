import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import Convolution from './chapter6/Convolution';
import DFT from './chapter8/DFT';
import AddingSineWaves from './misc/AddingSineWaves';

const App = () => {
    return (
        <Router>
            <div>
                <Menu />
                <Route path="/convolution/demo/:id" component={Convolution} />
                <Route path="/dft" component={DFT} />
                <Route path="/misc/addingSineWaves" component={AddingSineWaves} />
            </div>
        </Router>
    );
};

export default App;
