import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Navbar, Nav, Form } from 'react-bootstrap';

const HomeStudent = (props) => {

    const history = useHistory();

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/HomeStudent/dashboard">HOMEROOM PROFESSOR</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/HomeStudent/dashboard">Home</Nav.Link>
                    <Nav.Link href="/HomeStudent/professor-lookup">Professor Lookup</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-light">Logout</Button>
                </Form>
            </Navbar>
        </>
    );
};

export default HomeStudent;