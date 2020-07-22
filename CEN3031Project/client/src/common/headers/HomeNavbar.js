import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const HomeNavbar = () =>
    (
        <Navbar bg="primary" className="navbar-expand" variant="dark">
            <Navbar.Brand href="/">HOMEROOM PROFESSOR</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="about">About</Nav.Link>
                <Nav.Link href="Register">Register</Nav.Link>
            </Nav>

        </Navbar>
    )

export default HomeNavbar;