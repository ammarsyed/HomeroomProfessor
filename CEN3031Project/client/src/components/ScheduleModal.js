import React from 'react';
import { Modal, Button, ListGroup} from 'react-bootstrap';

const ScheduleModal = (props) => {

    const updateSchedule = () => {
        props.onHide(1);
    }

    const updateContact = () => {
        props.onHide(2);
    }

    const updateDeny = () => {
        props.onHide(3);
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Student Appointment Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>What would you like to do?</h5>
                <ListGroup className="flex-xl-row justify-content-between align-items-center" variant="flush">
                    <ListGroup.Item className="dashlist"><Button onClick={updateSchedule}>Schedule Appointment</Button></ListGroup.Item>
                    <ListGroup.Item className="dashlist"><Button onClick={updateContact}>Contact Student</Button></ListGroup.Item>
                    <ListGroup.Item className="dashlist"><Button onClick={updateDeny}>Deny Request</Button></ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ScheduleModal;