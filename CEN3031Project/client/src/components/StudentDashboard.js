import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl } from 'react-bootstrap';
import StudentNavbar from './StudentNavbar';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const StudentDashboard = (props) => {
    const [filterText, setFilterText] = useState('');
    const [professorProps, setProfessorProps] = useState();

    const filterUpdate = (value) => {
        setFilterText(value);
    };

    const history = useHistory();

    const handleClick = () => {

        history.push({
            pathname: "/StudentDashboard/professor-lookup",
            state: { detail: professorProps}
        })
    }

    useEffect(() => {
        axios.get(PROFESSOR_API_URL)
            .then(res => {
                setProfessorProps(res.data)
            })
    }, [])


    return (
        <>  
            <StudentNavbar />
            <Container>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Body>
                            <Card.Title>Student Dashboard</Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                </Card>
                <Button onClick={handleClick}>Professor Lookup</Button>
            </Container>
        </>


    );
};

export default StudentDashboard;