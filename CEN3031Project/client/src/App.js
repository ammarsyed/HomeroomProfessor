import React, {useState, useEffect} from 'react';
import axios from "axios";
import Login from './components/Login';
import HomeProfessor from './components/HomeProfessor';
import StudentRegister from './components/StudentRegister';
import ProfessorRegister from './components/ProfessorRegister';
import ProfessorLookup from './components/ProfessorLookup';
import StudentDashboard from './components/StudentDashboard';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const App = (props) =>
{

    /*  The following code captures the professor data array in professorProps to be passed
     *  as a prop to the links requiring it. Both of these must be passed: 
     *  
     *  props={props} data={professorProps}
     *
     */
    const [professorProps, setProfessorProps] = useState();

    useEffect(() => {
        axios.get(PROFESSOR_API_URL)
            .then(res => {
                setProfessorProps(res.data)
            })
    }, [])

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
        <Router>
            <Route exact path="/"
                render={(props) => <Login props={props} authenticate={authenticate} />}
            />
            <Route path="/StudentDashboard"
                render={(props) => <StudentDashboard props={props} data={professorProps} />}
            />
            <Route path="/StudentDashboard/professor-lookup"
                render={(props) => <ProfessorLookup props={props} location={props.location} />}  
            />
            <Route path="/HomeProfessor"
                render={(props) => <HomeProfessor props={props} />}
            />
            <Route path="/StudentRegistration"
                render={(props) => <StudentRegister props={props} registration={registration} />}
            />
            <Route path="/ProfessorRegistration"
                render={(props) => <ProfessorRegister props={props} registration={registration} />}
            />
        </Router>
    );
}

export default App;
