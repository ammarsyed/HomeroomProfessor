import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import ScheduleModal from './ScheduleModal';
import axios from "axios";
import studenthttpUser from '../studenthttpUser';

const PROFESSOR_API_URL = '/api/professors';

const ProfessorDashboard = (props) => {

    const [displayModal, setDisplayModal] = useState(false);
    const [displaySchedule, setDisplaySchedule] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({});
    const [studentArray, setStudentArray] = useState();

    const history = useHistory();

    // console.log(studentArray)

    useEffect(() => {
        props.updateDB();

        setStudentArray(props.currentUser.students);

    }, [])

    // COMEBACK
    function updateCurrProf()
    {
        console.log("UPDATED CURRENT PROFESSOR USER")
        var date = new Date();
        var timestamp = date.getTime();
        console.log(timestamp);
        studenthttpUser.updateCurrentUser();
        props.setCurrentUser(studenthttpUser.getCurrentUser());
        setStudentArray(studenthttpUser.getCurrentUser().students);
        console.log(studenthttpUser.getCurrentUser().students);
        console.log(studentArray);
    }

    setInterval(updateCurrProf, 90000); //1.5 minutes so 90000 milliseconds

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
        // console.log(studentArray);
    }

    function customEventClick(info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate

        let temp = info.event.url.replace("")

        if (info.event.url) {
            window.open(info.event.url);
        }
    }

    function accountClick() {

        history.push({
            pathname: "/professor/account"
        })
    }

    const updateAndShow = (student) => {

        setCurrentStudent(student);

        // console.log(student);

        setDisplayModal(true);
    }

    const updateMeetingTime = (time) => {

        const confirmMeeting = {
            "id": props.currentUser._id,
            "student_id": currentStudent._id,
            "approved": true,
            "date": time
        };

        // console.log(confirmMeeting);

        let response = axios.post(PROFESSOR_API_URL + '/confirmRequest', confirmMeeting);

        // console.log(response);

        setDisplayModal(false);
        setDisplaySchedule(false);

        props.updateDB();
    }

    const convertDate = (dateStr) => {
        var date = new Date(dateStr);

        return "" + date.toDateString() + " " + date.toLocaleTimeString();
    }

    const closeModal = () => {

        setDisplayModal(false);
        setDisplaySchedule(false);

    }

    const updateSchedule = () => {

        setDisplaySchedule(true);

    }

    const updateContact = () => {

        setDisplayModal(false);

    }

    const updateDeny = () => {

        setDisplayModal(false);

    }

    //Creating the events structure for fullCalendar API.
    var eventArray = [];
    let keys = [];

    studentArray && studentArray.map(student => (
        keys.push(student)
    ));

    //URL WILL NEED UPDATE AFTER MERGING SCHEMA CHANGE.
    for (let student of keys) {
        if(student.approved) {
            let start_time = student.date.substring(0, 19);
            let end_time = student.date.substring(0, 11) + student.date.substring(20, 25) + ':00';

            // console.log(start_time)
            // console.log(end_time)
            eventArray.push({
                title: student.studentFirstName + ' ' + student.studentLastName,
                start: start_time,
                end: end_time,
                url: props.currentUser.zoom
            })
        }
    }

    return (
        <>
            <Container fluid>
                <Card className="mt-3 cobalt-card">
                    <Card.Body>
                        <Row className="d-flex align-items-center mt-0 mb-0">
                            <Col xs={12} md={10}>
                                <Link to="/professor" className="h1">Welcome to your Dashboard, {props.currentUser.fullName}!</Link>
                            </Col>
                            <Col xs={12} md={2}>
                                <Button className="float-right cobalt-button">Placeholder Button</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="border-0">
                    <Row>
                        <Col>
                            <Card id="requests" className="mt-3 cobalt-card">
                                <Card.Header className="text-center" text="primary">
                                    <Card.Title>
                                        New Requests
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {studentArray && studentArray.map(student => (
                                        <>{!student.approved &&
                                            <ListGroup key={student._id} className="flex-xl-row border-bottom justify-content-between align-items-center" variant="flush">
                                                <ListGroup.Item className="dashlist border-bottom-0"><h5>Student Request - {student.studentFirstName} {student.studentLastName}</h5></ListGroup.Item>
                                                <ListGroup.Item className="dashlist"><Button className="cobalt-button" onClick={() => updateAndShow(student)}>Schedule</Button></ListGroup.Item>
                                            </ListGroup>
                                        }</>
                                    ))}
                                </Card.Body>
                            </Card>
                            <Card id="sessions" className="mt-3 cobalt-card">
                                <Card.Header className="text-center" text="primary">
                                    <Card.Title>
                                        Upcoming Tutoring Sessions
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {studentArray && studentArray.map(student => (
                                        <>{student.approved &&
                                            <ListGroup key={student._id} className="flex-xl-row border-bottom justify-content-between align-items-center" variant="flush">
                                                <ListGroup.Item className="dashlist border-bottom-0 mb-0"><h5 className="mb-0">Appointment - {student.studentFirstName} {student.studentLastName}</h5></ListGroup.Item>
                                                <ListGroup.Item className="dashlist"><b>{convertDate(student.date)}</b></ListGroup.Item>
                                            </ListGroup>
                                        }</>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="calendar" className="mt-3 cobalt-card">
                                <Card.Body>
                                    <Card.Title>
                                        <FullCalendar
                                            plugins={[dayGridPlugin, interactionPlugin]}
                                            dateClick={handleDateClick}
                                            initialView="dayGridMonth"
                                            className="cobalt-card"
                                            eventClassNames="cobalt-calendar-events"
                                            events={eventArray}
                                            eventClick={customEventClick}
                                        />
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <ScheduleModal
                    show={displayModal}
                    schedule={displaySchedule}
                    onClose={closeModal}
                    onSchedule={updateSchedule}
                    onContact={updateContact}
                    onDeny={updateDeny}
                    updateMeeting={updateMeetingTime}

                />
            </Container>
        </>


    );
};

export default ProfessorDashboard;