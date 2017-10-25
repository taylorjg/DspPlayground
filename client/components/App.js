import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import Convolution from './chapter6/Convolution';
import DFT from './chapter8/DFT';
import AddingSineWaves from './misc/AddingSineWaves';
import SimpleModal from './SimpleModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <Router>
                <div>
                    <Button
                        bsStyle="primary"
                        bsSize="small"
                        onClick={this.open}
                    >Open Modal
                    </Button>
                    <SimpleModal showModal={this.state.showModal} onClose={this.close} />
                    <Menu />
                    <Route path="/convolution/demo/:id" component={Convolution} />
                    <Route path="/dft" component={DFT} />
                    <Route path="/misc/addingSineWaves" component={AddingSineWaves} />
                </div>
            </Router>
        );
    }
};

export default App;
