import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck, Row, Col, ListGroup } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import ScheduleModal from './ScheduleModal';

const ProfessorDashboard = (props) => {

    const [displayModal, setDisplayModal] = useState(false);

    const history = useHistory();

    useEffect(() => {
        props.updateDB();
        console.log(props.currentUser);
        console.log(props.currentUser.students);
    }, [])

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
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

    const updateAndShow = (id) => {

        //setCurrentProfessor({ id });

        setDisplayModal(true);
    }

    const updateAndHide = (value) => {

        if (value === 1) {
            // Handle Schedule Appointment
            console.log(value);
        }
        else if (value === 2) {
            // Handle Contact Student
            console.log(value);
        }
        else if (value === 3) {
            // Handle Deny Request
            console.log(value);
        }
        console.log(value);
        setDisplayModal(false);
    }

    const displayRequests = () => {
       
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
                            {props.currentUser.students.map(student => (
                                <ListGroup key={student._id} className="flex-xl-row border-bottom justify-content-between align-items-center" variant="flush">
                                    <ListGroup.Item className="dashlist border-bottom-0"><h5>Student Request - {student.studentFirstName} {student.studentLastName}</h5></ListGroup.Item>
                                    <ListGroup.Item className="dashlist"><Button className="cobalt-button" onClick={() => updateAndShow()}>Schedule</Button></ListGroup.Item>
                                </ListGroup>
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
                            <Card.Title>
                                Here we could place upcoming tutoring sessions with students.
                            </Card.Title>
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
                                    events={[
                                        {
                                            title: 'UF Session',
                                            date: '2020-07-21',
                                            url: 'https://www.ufl.edu'
                                        },
                                        {
                                            title: 'Google Session',
                                            date: '2020-07-02',
                                            url: 'https://www.google.com'
                                        }
                                    ]}
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
                    onHide={updateAndHide}
                />
            </Container>
        </>


    );
};

export default ProfessorDashboard;