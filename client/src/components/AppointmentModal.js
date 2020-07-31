import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AppointmentModal = (props) => {

    const updateModal = () => {
        props.onHide(1);
    }

    const closeModal = () => {
        props.onHide(0);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="white-text">
                    Appointment Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="white-text">
                    <h5>Are you sure you'd like to make an appointment?</h5>
                The professor will get back to you with their availability as soon as possible.
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="cobalt-button" onClick={updateModal}>Submit Request</Button>
                <Button className="cobalt-button" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AppointmentModal;