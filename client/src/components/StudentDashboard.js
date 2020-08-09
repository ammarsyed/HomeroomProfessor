import React, { useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck, Row, Col, ListGroup, CardGroup } from 'react-bootstrap';
import FullCalendar, { buildNavLinkData } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const StudentDashboard = (props) => {

    const recProfs = props.recommendedProfessors;
    console.log(recProfs)

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const firstProfName = titleCase(recProfs[0].fullName);


    const history = useHistory();

    useEffect(() => {
        props.updateDB();

    }, [])

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    function recommendations(n) {

        if (recProfs[n]) return recProfs[n]

        else return ''

    } 

    function customEventClick(info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        console.log(info.event.url);

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

    //Creating the events structure for fullCalendar API.

    function getEventArray(info, successCallback, failureCallback) {

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
                        url: props.profs[i].zoom
                    })
                }
            }
        }

        successCallback(eventArray)

    }

    return (
        <>

            <Container fluid>

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
                <CardDeck>
                    <Card id="nextFeature" className="mt-3 cobalt-card">
                        <Card.Body>
                            <ListGroup className="flex-xl-row justify-content-center border-bottom align-items-center" variant="flush">
                                <ListGroup.Item className="dashlist"><h3 className="cobalt-text">Search Available Professors:</h3></ListGroup.Item>
                                <ListGroup.Item className="dashlist"><Button className="cobalt-button" onClick={professorClick}>Professor Lookup</Button></ListGroup.Item>
                            </ListGroup>

                            <ListGroup className="flex-xl-row justify-content-center align-items-center" variant="flush">
                                <ListGroup.Item className="dashlist"><h3 className="cobalt-text">Professor Recommendations</h3></ListGroup.Item>
                            </ListGroup>


                            <CardDeck>
                                <Card>
                                    <Card.Img variant="top" src={recommendations(1).picture} />
                                    <Card.Body>
                                    <Card.Title>{recommendations(1).fullName}</Card.Title>
                                    <Card.Text>
                                        {recommendations(1).summary}
                                    </Card.Text>
                                    </Card.Body>

                                </Card>

                                <Card>
                                    <Card.Img variant="top" src={recommendations(0).picture}/>
                                    <Card.Body>
                                    <Card.Title>{recommendations(0).fullName}</Card.Title>
                                    <Card.Text>
                                    {recommendations(0).summary}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Img variant="top" src={recommendations(2).picture}/>
                                    <Card.Body>
                                    <Card.Title>{recommendations(2).fullName}</Card.Title>
                                    <Card.Text>
                                    {recommendations(2).summary}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardDeck>


                        </Card.Body>
                    </Card>
                    <Card id="calendar" className="mt-3 cobalt-card">
                        <Card.Body>
                            <Card.Title>
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    dateClick={handleDateClick}
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
                </CardDeck>
            </Container>
        </>
    );
};

export default StudentDashboard;