import React from 'react';
import StudentNavbar from './StudentNavbar'
import { Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl } from 'react-bootstrap';

const StudentDashboard = (props) => {

    return (
        <>  
            <StudentNavbar data={props.data}/>
            <Container>
                    <Card border="primary" bg="white" text="primary">
                        <Card.Body>
                            <Card.Title>Student Dashboard</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>
            </Container>
        </>
    );
};

export default StudentDashboard;