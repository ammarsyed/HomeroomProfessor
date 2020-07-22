import React from 'react';
import Login from './components/Login';
import HomeProfessor from './components/HomeProfessor';
import Register from './components/Registration/Register';
import StudentRegister from './components/Registration/StudentRegister';
import ProfessorRegister from './components/Registration/ProfessorRegister';
import ProfessorLookup from './components/ProfessorLookup';
import StudentDashboard from './components/StudentDashboard';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { Container } from 'react-bootstrap';
import Footer from './common/Footer.js'
import HomeNavbar from './common/headers/HomeNavbar.js'

const App = (props) =>
{

    const authenticate = (user, pw) =>
    {

    };

    const registration = (account) =>
    {
        /* The variable 'account' has all the data from registration forms for use, 
        *  and I was going to use some if-else statements to differentiate if it was professor
        *  or if it was a student registration and put it into the appropriate database.
        */
    };

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Router>
                <HomeNavbar />
                <Switch>
                    <Route exact path="/"
                        render={(props) => <Login props={props} authenticate={authenticate} />}
                    />
                    <Route path="/Register" component={Register} />
                    <Route path="/StudentDashboard"
                        render={(props) => <StudentDashboard props={props} />}
                    />
                    <Route path="/StudentDashboard/professor-lookup"
                        render={(props) => <ProfessorLookup props={props} location={props.location} />}
                    />
                    <Route path="/HomeProfessor"
                        render={(props) => <HomeProfessor props={props} />}
                    />

                </Switch>
            </Router>
            <Footer />
        </Container>

    );
}

export default App;
