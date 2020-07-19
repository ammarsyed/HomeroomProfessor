import React from 'react';
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl } from 'react-bootstrap';

const ProfessorLookup = (props) => {

    const history = useHistory();

    console.log("in lookup");

    return (
        <>

            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>

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
            
        </>


    );
};

export default ProfessorLookup;