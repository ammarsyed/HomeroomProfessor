import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck, Row, Col, ListGroup } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import ProfessorLookup from './ProfessorLookup';

const StudentDashboard = (props) =>
{

    // Can use profsUpdate to update professor props in App.js if needed.

    //const [professorProps, setProfessorProps] = useState("");

    //const profsUpdate = (value) => {
    //    props.sendProfs(value);
    //};

    const history = useHistory();

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
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
            state: {detail: props.profs}
        })
    }

    return (
        <>
            <Container fluid>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                    <Card.Body>
                        <Row className="d-flex align-items-center mt-0 mb-0">
                            <Col xs={12}md={10}>
                                <Link to="/student" className="h1">Welcome to your Dashboard, {props.currentUser.fullName}!</Link>
                            </Col>
                            <Col xs={12} md={2}>
                                <Button className="float-right">Placeholder Button</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {/* <Card className="mt-3" border="primary" bg="white" text="primary">
                    <ProfessorLookup
                        {...props}
                        profs={props.profs}
                        location={props.location}
                        display="none"
                    />
                </Card> */}
                <CardDeck>
                    <Card id="nextFeature" className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Header className="text-center" text="primary">
                            <Card.Title>
                                Next Feature
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup className="flex-xl-row justify-content-center border-bottom align-items-center" variant="flush">
                                <ListGroup.Item className="dashlist"><h3>Search Available Professors:</h3></ListGroup.Item>
                                <ListGroup.Item className="dashlist"><Button onClick={professorClick}>Professor Lookup</Button></ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <Card id="calendar" className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Body>
                            <Card.Title>
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    dateClick={handleDateClick}
                                    initialView="dayGridMonth"
                                    events={[
                                        {
                                            title: 'UF Session',
                                            date: '2020-07-21',
                                            url: 'https://www.ufl.edu'
                                        },
                                        {
                                            title: 'UF Session',
                                            date: '2020-07-21',
                                            url: 'https://www.ufl.edu'
                                        },
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
                </CardDeck>
            </Container>
        </>


    );
};

export default StudentDashboard;