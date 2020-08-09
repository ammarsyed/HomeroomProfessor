import React from 'react';
import {Modal, Button, Row, Image, Col} from 'react-bootstrap';

const AppointmentModal = (props) =>
{

    const submitModal = () =>
    {
        props.onSubmit();
    }

    const closeModal = () =>
    {
        props.onClose();
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            animation={false}
            centered
        >
            {!props.showSuccess &&
                <>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter" className="white-text">
                            Appointment Request
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="white-text">
                        <Row className="align-items-center">
                            <Col lg={3}>
                                <Image height="150" width="150" src={props.profs.picture} rounded />
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
                                    Professor Availability: {props.profs.availability}
                                </Row>
                            </Col>
                        </Row>
                        <Row className="ml-auto">
                            Professor Profile Summary
                    </Row>
                        <Row className="ml-auto">
                            {props.profs.summary}
                        </Row>
                    </Modal.Body>
                    <Modal.Header>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="ml-auto white-text">
                            <h5 className="mb-0">Are you sure you'd like to make an appointment with this professor?</h5>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="pb-0">
                        <Button className="cobalt-button" onClick={submitModal}>Submit Request</Button>
                        <Button className="cobalt-button" onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </>
            }
            {props.showSuccess &&
                <>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter" className="white-text">
                            Your appointment has been requested.
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="ml-auto white-text">
                            The professor will get back to you with their availability as soon as possible.
                    </Row>
                    </Modal.Body>
                    <Modal.Footer className="pb-0">
                        <Button className="cobalt-button" onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                </>
            }
        </Modal>
    );
}

export default AppointmentModal;