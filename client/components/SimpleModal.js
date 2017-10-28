import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SimpleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleData: props.simpleData
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            simpleData: nextProps.simpleData
        });
    }
    handleFirstNameChange(e) {
        this.setState({
            simpleData: this.state.simpleData.set('firstName', e.target.value)
        });
    }
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Title</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <FormGroup controlId="firstName">
                            <ControlLabel>First name:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.simpleData.firstName}
                                onChange={this.handleFirstNameChange}
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            bsStyle="primary"
                            bsSize="small"
                            onClick={e => {
                                e.preventDefault();
                                this.props.onConfirm(this.state.simpleData);
                            }}
                        >OK
                    </Button>
                        <Button
                            bsStyle="primary"
                            bsSize="small"
                            onClick={this.props.onCancel}
                        >Cancel
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

SimpleModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    simpleData: PropTypes.object.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default SimpleModal;
