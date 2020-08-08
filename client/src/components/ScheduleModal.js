import React, { useState } from 'react';
import { Modal, Button, ListGroup, Card } from 'react-bootstrap';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";

const ScheduleModal = (props) => {

    const [displayTimeSelect, setDisplayTimeSelect] = useState(false);
    const [timeSlot, setTimeSlot] = useState("");

    const sendSchedule = () => {
        props.onSchedule();
    }

    const sendContact = () => {
        props.onContact();
    }

    const sendDeny = () => {
        props.onDeny();
    }

    const closeModal = () => {
        props.onClose();
    }

    const handleDateClick = (args) => {
        setTimeSlot(args.dateStr);

        setDisplayTimeSelect(true);
    }

    const confirmAppointment = () => {

        props.updateMeeting(timeSlot);

    }

    const convertDate = () => {
        var date = new Date(timeSlot);

        return "" + date.toDateString() + " " + date.toLocaleTimeString();
    }

    function constrainValidDates(currentDate) {
        var startDate = new Date(currentDate.valueOf());

        return { start: startDate }
    }

    function constrainVisibleDates (currentDate) {
        var startDate = new Date(currentDate.valueOf());
        var endDate = new Date(currentDate.valueOf());

        endDate.setDate(endDate.getDate() + 6);

        return {
            start: startDate,
            end: endDate
        }
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            {!props.schedule &&
                <>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="white-text">
                        Student Appointment Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="white-text">What would you like to do?</h5>
                    <ListGroup className="flex-xl-row justify-content-between align-items-center color-cobalt">
                        <ListGroup.Item className="color-cobalt"><Button className="cobalt-button" onClick={sendSchedule}>Schedule Appointment</Button></ListGroup.Item>
                        <ListGroup.Item className="color-cobalt"><Button className="cobalt-button" onClick={sendContact}>Contact Student</Button></ListGroup.Item>
                        <ListGroup.Item className="color-cobalt"><Button className="cobalt-button" onClick={sendDeny}>Deny Request</Button></ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cobalt-button" onClick={closeModal}>Close</Button>
                </Modal.Footer>
                </>
            }
            {props.schedule &&
                <>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="white-text">
                        Schedule Appointment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="white-text">
                    <h5>What date would you like the appointment on?</h5>
                    <Card className="flex-xl-row justify-content-center align-items-center color-cobalt mt-5 mb-5">
                        <FullCalendar
                            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            dateClick={handleDateClick}
                            initialView="timeGrid"
                            slotMinTime="07:00:00"
                            slotMaxTime="18:00:00"
                            selectable={true}
                            validRange={constrainValidDates}
                            visibleRange={constrainVisibleDates}
                            allDaySlot={false}
                            slotDuration="01:00:00"
                            className="cobalt-card"
                            eventClassNames="cobalt-calendar-events"
                            contentHeight="auto"
                        />
                    </Card>

                    {displayTimeSelect &&
                        <p>You have selected: <b>{convertDate()}</b></p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {displayTimeSelect &&
                        <Button className="cobalt-button" onClick={confirmAppointment}>Confirm Appointment</Button>
                    }
                    <Button className="cobalt-button" onClick={closeModal}>Close</Button>
                </Modal.Footer>
                </>
            }
        </Modal>
    );
}

export default ScheduleModal;

//{
//props.schedule && displayTimeSelect
//    //    <>
//    //    <Modal.Header>
//    //        <Modal.Title id="contained-modal-title-vcenter" className="white-text">
//    //            Student Appointment Request
//    //        </Modal.Title>
//    //    </Modal.Header>
//    //    <Modal.Body>
//    //        <h5 className="white-text">What would you like to do?</h5>
//    //        <ListGroup className="flex-xl-row justify-content-between align-items-center color-cobalt">

//    //        </ListGroup>
//    //    </Modal.Body>
//    //    <Modal.Footer>
//    //        <Button className="cobalt-button" onClick={confirmAppointment}>Schedule Appointment</Button>
//    //        <Button className="cobalt-button" onClick={closeModal}>Close</Button>
//    //    </Modal.Footer>
//    //    </>
//}