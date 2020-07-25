import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const ProfessorDashboard = (props) => {

    const history = useHistory();

    function hideAll() {
        var x = document.getElementById("calendar");
        var y = document.getElementById("requests");
        var z = document.getElementById("sessions");

        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";
    }

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

    function hideDashboard() {
        var x = document.getElementById("calendar");
        var y = document.getElementById("requests");
        var z = document.getElementById("sessions");

        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";

        history.push({
            pathname: "/professor/account"
        })
    }

    return (
        <>
            <Container fluid>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                    <Card.Body>
                        <Card.Title>
                            <Link to="/professor" onClick={hideAll}>Professor Dashboard</Link>
                            <Button className="float-right" onClick={hideDashboard}>My Account</Button>
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <CardDeck >
                    <Card id="sessions" className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Header className="text-center" text="primary">
                            <Card.Title>
                                Upcoming Tutoring Sessions
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Here we could place upcoming tutoring requests with students.
                            </Card.Title>
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
                    <Card id="requests" className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Header className="text-center" text="primary">
                            <Card.Title>
                                New Requests
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>
                                Here we could place new tutoring requests from students.
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </Container>
        </>


    );
};

export default ProfessorDashboard;