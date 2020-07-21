import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Navbar, Nav, Form } from 'react-bootstrap';

const StudentNavbar = (props) => {

    const history = useHistory();

    const handlePLClick = () => {

        history.push({
            pathname: "/StudentDashboard/professor-lookup",
            state: { detail: props.data}
        })
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/StudentDashboard">HOMEROOM PROFESSOR</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/StudentDashboard">Home</Nav.Link>
                    <Nav.Link href="/StudentDashboard/professor-lookup" onClick={handlePLClick}>Professor Lookup</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-light" href="/">Logout</Button>
                </Form>
            </Navbar>
        </>
    );
};

export default StudentNavbar;