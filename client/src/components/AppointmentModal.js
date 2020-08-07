import React, { useState } from 'react';
import { Modal, Button, Form, Row, Image, Col } from 'react-bootstrap';

const AppointmentModal = (props) => {

    const submitModal = () => {
        props.onSubmit();
    }

    const closeModal = () => {
        props.onClose();
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className="white-text">
                    Appointment Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="white-text">
                <Row className="align-items-center">
                    <Col lg={3}>
                        <Image src="https://via.placeholder.com/150" rounded />
                    </Col>
                    <Col lg={9}>
                        <Row>
                            {props.profs.fullName}
                        </Row>
                        <Row>
                            {props.profs.university}
                        </Row>
                        <Row>
                            {props.profs.department}
                        </Row>
                        <Row>
                            Professor Availability:
                            Placeholder Placeholder Placeholder
                        </Row>
                    </Col>
                </Row>
                <Row className="ml-auto">
                    Professor Bio
                    Placeholder
                </Row>
            </Modal.Body>
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <Row className="ml-auto white-text">
                <h5>Are you sure you'd like to make an appointment?</h5>
                The professor will get back to you with their availability as soon as possible.
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button className="cobalt-button" onClick={submitModal}>Submit Request</Button>
                <Button className="cobalt-button" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AppointmentModal;