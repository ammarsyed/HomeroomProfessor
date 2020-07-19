import React from 'react';
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl } from 'react-bootstrap';

const StudentDashboard = (props) => {

    const history = useHistory();

    return (
        <>
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