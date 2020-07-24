import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

const StudentDashboard = (props) => {

    // Can use profsUpdate to update professor props in App.js if needed.

    //const [professorProps, setProfessorProps] = useState("");

    //const profsUpdate = (value) => {
    //    props.sendProfs(value);
    //};

    const history = useHistory();

    const handleClick = () => {

        //profsUpdate(professorProps);

        history.push({
            pathname: "/student/professor-lookup",
            state: { detail: props.profs }
        })
    }

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

    return (
        <>
            <Container fluid>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                    <Card.Body>
                        <Card.Title>
                            <Link to="/student">Student Dashboard</Link>
                            <Button className="float-right" onClick={handleClick}>Professor Lookup</Button>
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <CardDeck>
                    <Card className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Header className="text-center" text="primary">
                            <Card.Title>
                                Next Feature
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>

                            </Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3" border="primary" bg="white" text="primary">
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
                                            url: 'ufl.edu'
                                        },
                                        {
                                            title: 'Google Session',
                                            date: '2020-07-02',
                                            url: 'google.com'
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