import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ProfessorDashboard from './components/ProfessorDashboard';
import Register from './components/Registration/Register';
import ProfessorLookup from './components/ProfessorLookup';
import ProfessorAccount from './components/ProfessorAccount';
import StudentDashboard from './components/StudentDashboard';
import Footer from './common/Footer.js'
import HomeNavbar from './common/HomeNavbar.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from "axios";

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const App = (props) => {
    const [professorProps, setProfessorProps] = useState("");
    const [loginState, setLoginState] = useState(false);

    const professorUpdate = (profs) => {
        setProfessorProps(profs);
    };

    const loginStateUpdate = (value) => {
        setLoginState(value);
    };

    useEffect(() => {
        axios.get(PROFESSOR_API_URL)
            .then(res => {
                setProfessorProps(res.data)
            })
    }, [])

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }} className="h-100">
            <Router>
                <HomeNavbar profs={professorProps} loginState={loginState} />
                <Route
                    exact path="/"
                    render={(props) => (
                        <Login {...props} sendLogin={loginStateUpdate} />
                    )}
                />
                <Route path="/register" component={Register} />
                <Route
                    path="/student"
                    render={(props) => (
                        <StudentDashboard
                            {...props}
                            profs={professorProps}
                            location={props.location}
                            sendProfs={professorUpdate}
                        />
                    )}
                />
                <Route
                    path="/student/professor-lookup"
                    render={(props) => (
                        <ProfessorLookup {...props} profs={professorProps} location={props.location} />
                    )}
                />
                <Route
                    path="/professor"
                    render={(props) => (
                        <ProfessorDashboard {...props} />
                    )}
                />
                <Route
                    path="/professor/account"
                    render={(props) => (
                        <ProfessorAccount {...props} />
                    )}
                />
            </Router>
            <Footer />
        </Container>

    );
}

export default App;
