import React from 'react';
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl } from 'react-bootstrap';
import ProfessorLookup from './ProfessorLookup';

const HomeStudent = (props) => {

    const history = useHistory();

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/HomeStudent">HOMEROOM PROFESSOR</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/HomeStudent">Home</Nav.Link>
                    <Nav.Link href="/HomeStudent/professor-lookup" render={(props)}>
                        Professor Lookup
                    </Nav.Link>
                    <Nav.Link href="/">Sign in</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>
            <br />
            <Container>
                <Col>
                    <Card
                        border="primary"
                        style={{ width: '18rem' }}
                        bg="primary"
                        text="white"
                    >
                        <Card.Body>
                            <Card.Title>Tutor Suggestions</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card border="primary" bg="white" text="black" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Professor Name</Card.Title>
                            <Card.Text>
                                University: <br />
                        Department: <br />
                        Tutoring Subjects: <br />
                                <br />
                        Summary: <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        </>


    );
};

export default HomeStudent;