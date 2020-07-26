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

const App = (props) =>
{
    const [professorProps, setProfessorProps] = useState("");
    const [loginState, setLoginState] = useState(false); //to remove?

    const [currentUser, setCurrentUser] = useState(studenthttpUser.getCurrentUser());

    //good idea to use student and professor check
    const onLoginSuccess = (userType) =>
    {
        console.log('reached onLoginSuccess')
        setCurrentUser(studenthttpUser.getCurrentUser());
    };

    const logOut = () =>
    {
        studenthttpUser.logOut();
        setCurrentUser(null);
    };



    const professorUpdate = (profs) =>
    {
        setProfessorProps(profs);
    };

    const loginStateUpdate = (value) =>
    {
        setLoginState(value);
    };

    useEffect(() =>
    {
        axios.get(PROFESSOR_API_URL)
            .then(res =>
            {
                setProfessorProps(res.data)
            })
    }, [])

    return (
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}} className="h-100">
            <Router>
                <HomeNavbar profs={professorProps} loginState={loginState} currentUser={currentUser} logOut={logOut} />
                <Route
                    exact path="/"
                    render={(props) => (
                        <Login {...props} sendLogin={loginStateUpdate} onLoginSuccess={onLoginSuccess} />
                    )}
                />
                <Route
                    path="/register"
                    render={(props) =>
                    {
                        return <Register onSignUpSuccess={onLoginSuccess} />
                        // component = {Register} onSignUpSuccess = {onLoginSuccess}
                    }}
                // />
                />
                <Route
                    path="/student"
                    render={(props) =>
                    {
                        if(currentUser)
                        {
                            console.log('current user true')
                            return <StudentDashboard {...props} profs={professorProps} sendProfs={professorUpdate} currentUser={currentUser} location={props.location} />
                        }
                        else
                        {
                            console.log('current user false')
                            return <Redirect to="/" />

                        }
                        // return currentUser ? <StudentDashboard {...props} profs={professorProps} sendProfs={professorUpdate} /> : <Redirect to="/" />
                    }}
                />
                <Route
                    path="/student/professor-lookup"
                    render={(props) => (
                        <ProfessorLookup {...props} profs={professorProps} location={props.location} currentUser={currentUser} />
                    )}
                />
                <Route
                    path="/professor"
                    render={(props) => (
                        <ProfessorDashboard {...props} currentUser={currentUser} />
                    )}
                />
                {/* probably need to add a logout route */}

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
