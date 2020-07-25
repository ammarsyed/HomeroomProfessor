import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card, CardDeck } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import ProfessorLookup from './ProfessorLookup';

const StudentDashboard = (props) => {

    // Can use profsUpdate to update professor props in App.js if needed.

    //const [professorProps, setProfessorProps] = useState("");

    //const profsUpdate = (value) => {
    //    props.sendProfs(value);
    //};

    const history = useHistory();

    function hideAll() {
        var x = document.getElementById("calendar");
        var y = document.getElementById("nextFeature");

        x.style.display = "block";
        y.style.display = "block";
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

    function hideDashboard() {
        var x = document.getElementById("calendar");
        var y = document.getElementById("nextFeature");

        x.style.display = "none";
        y.style.display = "none";

        history.push({
            pathname: "/student/professor-lookup",
            state: { detail: props.profs }
        })
    }

    return (
        <>
            <Container fluid>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                    <Card.Body>
                        <Card.Title>
                            <Link to="/student" onClick={hideAll}>Student Dashboard</Link>
                            <Button className="float-right" onClick={hideDashboard}>Professor Lookup</Button>
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
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
                            <Card.Title>

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
                </CardDeck>
            </Container>
        </>


    );
};

export default StudentDashboard;