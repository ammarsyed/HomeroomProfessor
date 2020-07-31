import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import ProfessorDashboard from './components/ProfessorDashboard';
import Register from './components/Registration/Register';
import ProfessorLookup from './components/ProfessorLookup';
import ProfessorAccount from './components/ProfessorAccount';
import StudentDashboard from './components/StudentDashboard';
import Footer from './common/Footer.js'
import HomeNavbar from './common/HomeNavbar.js'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import axios from "axios";

import studenthttpUser from './studenthttpUser';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';
const STUDENT_API_URL = 'http://localhost:5000/api/students';

const App = (props) =>
{
    const [professorProps, setProfessorProps] = useState("");
    const [studentProps, setStudentProps] = useState("");
    const [loginState, setLoginState] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    //good idea to use student and professor check
    const onLoginSuccess = (userType) =>
    {
        console.log('reached onLoginSuccess')
        setCurrentUser(studenthttpUser.getCurrentUser());
    };

    const logOut = () =>
    {
        studenthttpUser.logOut();
        setCurrentUser("");
    };

    const professorUpdate = (profs) =>
    {
        setProfessorProps(profs);
    };

    const loginStateUpdate = (value) =>
    {
        setLoginState(value);
    };

    const updateProfsDatabase = () =>
    {
        axios.get(PROFESSOR_API_URL + "/getAllProfessors")
            .then(res =>
            {
                setProfessorProps(res.data)
            })

        axios.get(STUDENT_API_URL + "/getAllStudents")
            .then(res =>
            {
                setStudentProps(res.data)
            })
    };

    useEffect(() =>
    {
        updateProfsDatabase()

    }, [])

    return (
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}} className="h-100">
            <Router>
                <HomeNavbar profs={professorProps} loginState={loginState} sendLogin={loginStateUpdate} currentUser={currentUser} logOut={logOut} />
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route
                        path="/student/professor-lookup"
                        render={(props) => (
                            <ProfessorLookup {...props} profs={professorProps} location={props.location} currentUser={currentUser} />
                        )}
                    />
                    <Route
                        path="/student"
                        render={(props) => (
                            currentUser ?
                                <StudentDashboard {...props} profs={professorProps} sendProfs={professorUpdate} currentUser={currentUser} location={props.location} /> :
                                <Redirect to="/" />
                        )}
                    />
                    <Route
                        path="/professor/account"
                        render={(props) => (
                            <ProfessorAccount {...props} currentUser={currentUser} />
                        )}
                    />
                    <Route
                        path="/professor"
                        render={(props) => (
                            <ProfessorDashboard {...props} students={studentProps} currentUser={currentUser} />
                        )}
                    />
                    <Route
                        exact path="/"
                        render={(props) => (
                            <Login {...props} sendLogin={loginStateUpdate} onLoginSuccess={onLoginSuccess} />
                        )}
                    />
                </Switch>
            </Router>
            <Footer />
        </Container>

    );
}

export default App;
