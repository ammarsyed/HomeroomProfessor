import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck, Row, Col, ListGroup, CardGroup } from 'react-bootstrap';
import FullCalendar, { buildNavLinkData, conv } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const StudentDashboard = (props) => {

    const [meetingArray, setMeetingArray] = useState();

    const recProfs = props.recommendedProfessors;
    console.log(recProfs)

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    //const firstProfName = titleCase(recProfs[0].fullName);


    const history = useHistory();

    useEffect(() => {
        props.updateDB();

        initializeMeetingArray();

    }, [])


    function customEventClick(info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        // console.log(info.event.url);

        let temp = info.event.url.replace("")

        if (info.event.url) {
            window.open(info.event.url);
        }
    }

    function professorClick() {

        history.push({
            pathname: "/student/professor-lookup",
            state: { detail: props.profs }
        })
    }

    function initializeMeetingArray() {

        var eventArray = [];

        for (let i = 0; i < props.profs.length; i++) {
            for (let j = 0; j < props.profs[i].students.length; j++) {

                let studentName = props.profs[i].students[j].studentFirstName + ' ' + props.profs[i].students[j].studentLastName;

                if (studentName == props.currentUser.fullName && props.profs[i].students[j].date != null) {

                    let start_time = props.profs[i].students[j].date.substring(0, 19);
                    let end_time = props.profs[i].students[j].date.substring(0, 11) + props.profs[i].students[j].date.substring(20, 25) + ':00';
                    eventArray.push({
                        title: props.profs[i].fullName,
                        start: start_time,
                        end: end_time,
                        url: props.profs[i].zoom,
                        date: props.profs[i].students[j].date
                    })
                }
            }
        }

        setMeetingArray(eventArray);
    }

    //Creating the events structure for fullCalendar API.

    function getEventArray(info, successCallback, failureCallback) {

        if (meetingArray) {
            successCallback(meetingArray)
        }
        else {
            
        }

    }

    const convertDate = (dateStr) => {
        var date = new Date(dateStr);

        return "" + date.toDateString() + " " + date.toLocaleTimeString();
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                    <Card className="mt-3 cobalt-card">
                        <Card.Body>
                            <Row className="d-flex align-items-center mt-0 mb-0">
                                <Col xs={12} md={10}>
                                    <Link to="/student" className="h1">Welcome to your Dashboard, {props.currentUser.fullName}!</Link>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Button className="float-right cobalt-button">Placeholder Button</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card id="nextFeature" className="mt-3 cobalt-card">
                            <Card.Header className="text-center" text="primary">
                                <Card.Title>
                                    Make New Tutoring Appointments
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {props.recommendedProfessors[0] &&
                                    <>
                                    <ListGroup className="flex-xl-row justify-content-center border-0 align-items-center" variant="flush">
                                        <ListGroup.Item className="dashlist pt-0"><h5 className="cobalt-text">Professor Recommendations</h5></ListGroup.Item>
                                    </ListGroup>
                                    <CardDeck className="mb-4">
                                        <Card className={"" + (props.recommendedProfessors[1] ? '' : 'border-0')}>
                                            {props.recommendedProfessors[1] &&
                                            <>
                                            <Card.Img variant="top" src={props.recommendedProfessors[1].picture} />
                                            <Card.Body>
                                                <Card.Title>{props.recommendedProfessors[1].fullName}</Card.Title>
                                                <Card.Text>
                                                    {props.recommendedProfessors[1].summary}
                                                </Card.Text>
                                            </Card.Body>
                                            </>
                                            }
                                        </Card>
                                        <Card className={"" + (props.recommendedProfessors[0] ? '' : 'border-0')}>
                                            {props.recommendedProfessors[0] &&
                                                <>
                                                <Card.Img variant="top" src={props.recommendedProfessors[0].picture} />
                                                <Card.Body>
                                                    <Card.Title>{props.recommendedProfessors[0].fullName}</Card.Title>
                                                    <Card.Text>
                                                        {props.recommendedProfessors[0].summary}
                                                    </Card.Text>
                                                </Card.Body>
                                                </>
                                            }
                                        </Card>
                                        <Card className={"" + (props.recommendedProfessors[2] ? '' : 'border-0')}>
                                            {props.recommendedProfessors[2] &&
                                                <>
                                                <Card.Img variant="top" src={props.recommendedProfessors[2].picture} />
                                                <Card.Body>
                                                    <Card.Title>{props.recommendedProfessors[2].fullName}</Card.Title>
                                                    <Card.Text>
                                                        {props.recommendedProfessors[2].summary}
                                                    </Card.Text>
                                                </Card.Body>
                                                </>
                                            }
                                        </Card>
                                    </CardDeck>
                                    </>
                                }
                                <ListGroup className="flex-xl-row justify-content-center border-bottom border-top align-items-center" variant="flush">
                                    <ListGroup.Item className="dashlist"><h3 className="cobalt-text">Search Available Professors:</h3></ListGroup.Item>
                                    <ListGroup.Item className="dashlist"><Button className="cobalt-button" onClick={professorClick}>Professor Lookup</Button></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card id="nextFeature" className="mt-3 cobalt-card">
                            <Card.Header className="text-center" text="primary">
                                <Card.Title>
                                    Upcoming Tutoring Sessions
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {meetingArray && meetingArray.map(meeting => (
                                    <ListGroup key={meeting.date} className="flex-xl-row border-bottom justify-content-between align-items-center" variant="flush">
                                        <ListGroup.Item className="dashlist border-bottom-0 mb-0"><h5 className="mb-0">Appointment - {meeting.title}</h5></ListGroup.Item>
                                        <ListGroup.Item className="dashlist"><b>{convertDate(meeting.date)}</b></ListGroup.Item>
                                    </ListGroup>
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
                                        eventDisplay="list-item"
                                        initialView="dayGridMonth"
                                        className="cobalt-card"
                                        eventClassNames="cobalt-calendar-events"
                                        events={getEventArray}
                                        eventClick={customEventClick}
                                    />
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default StudentDashboard;