import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './Menu';
import Convolution from './chapter6/Convolution';
import Correlation from './chapter7/Correlation';
import DFT from './chapter8/DFT';
import FTPairs from './chapter11/ftpairs';
import AddingSineWaves from './misc/AddingSineWaves';
// import SimpleModal from './SimpleModal';
// import { SimpleData } from './SimpleData';

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     showModal: false,
        //     simpleData: new SimpleData()
        // };
        // this.onOpenModal = this.onOpenModal.bind(this);
        // this.onConfirm = this.onConfirm.bind(this);
        // this.onCancel = this.onCancel.bind(this);
    }
    // onOpenModal() {
    //     this.setState({
    //         showModal: true
    //     });
    // }
    // onConfirm(simpleData) {
    //     this.setState({
    //         showModal: false,
    //         simpleData
    //      });
    // }
    // onCancel() {
    //     this.setState({
    //         showModal: false
    //     });
    // }
    render() {
        return (
            <Router>
                <div>
                    {/* <Button
                        bsStyle="primary"
                        bsSize="small"
                        onClick={this.onOpenModal}
                    >Open Modal
                    </Button>
                    <SimpleModal
                        showModal={this.state.showModal}
                        simpleData={this.state.simpleData}
                        onConfirm={this.onConfirm}
                        onCancel={this.onCancel} /> */}
                    <Menu />
                    <Route path="/convolution/demo/:id" component={Convolution} />
                    <Route path="/correlation/demo/:id" component={Correlation} />
                    <Route path="/dft/demo/:id" component={DFT} />
                    <Route path="/ftpairs/demo/:id" component={FTPairs} />
                    <Route path="/misc/addingSineWaves" component={AddingSineWaves} />
                </div>
            </Router>
        );
    }
}

export default App;
