import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class SimpleModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>(body)</p>
                </Modal.Body>
                <Modal.Footer>
                    <p>(footer)</p>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default SimpleModal;
