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
            showModal: false,
            data: {
                firstName: ''
            }
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    onOpenModal() {
        this.setState({
            showModal: true,
            data: {
                firstName: this.state.data.firstName
            }
        });
    }
    onConfirm(data) {
        this.setState({
            showModal: false,
            data: {
                firstName: data.firstName
            }
         });
    }
    onCancel() {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <Router>
                <div>
                    <Button
                        bsStyle="primary"
                        bsSize="small"
                        onClick={this.onOpenModal}
                    >Open Modal
                    </Button>
                    <SimpleModal
                        showModal={this.state.showModal}
                        data={this.state.data}
                        onConfirm={this.onConfirm}
                        onCancel={this.onCancel} />
                    <Menu />
                    <Route path="/convolution/demo/:id" component={Convolution} />
                    <Route path="/dft" component={DFT} />
                    <Route path="/misc/addingSineWaves" component={AddingSineWaves} />
                </div>
            </Router>
        );
    }
}

export default App;
