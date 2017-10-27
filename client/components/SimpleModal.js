import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SimpleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: ''
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    }
    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            firstName: nextProps.data.firstName
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
                                value={this.state.firstName}
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
                                this.props.onConfirm({
                                    firstName: this.state.firstName
                                });
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
    data: PropTypes.object.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default SimpleModal;
