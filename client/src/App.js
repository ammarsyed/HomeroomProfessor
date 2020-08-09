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

const PROFESSOR_API_URL = '/api/professors';
const STUDENT_API_URL = '/api/students';

const App = (props) =>
{
    const [professorProps, setProfessorProps] = useState("");
    const [studentProps, setStudentProps] = useState("");
    const [loginState, setLoginState] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    const [recommendedProfessors, setrecommendedProfessors] = useState([])


    const findRecommendedProfessors = (user) =>
    {
        console.log("hit find recommended professors")
        let currentRecommendedProfessorList = [];

        const studentSubjects = [];

        const allStudentSubjects = user.subjects;
        console.log('RIGHT BEFORE FOR LOOP')

        console.log(allStudentSubjects)
        for(let subjectItem in allStudentSubjects)
        {
            console.log("INSIDE FOR LOOP")
            console.log('subjectItem')
            console.log(subjectItem);
            console.log('value')
            console.log(allStudentSubjects[subjectItem])
            if(allStudentSubjects[subjectItem] == true)
            {
                console.log('inside all students subjects true')
                studentSubjects.push(subjectItem);
            }
        }
        // filters professorlist based on common subject with student
        console.log('STUDENT SUBJECTS')
        console.log(studentSubjects)
        currentRecommendedProfessorList = professorProps.filter(
            professor =>
            {
                console.log(professor);
                const allProfessorSubjects = professor.subjects;
                for(let subjectItem in allProfessorSubjects)
                {
                    console.log('in first for loop')
                    if(allProfessorSubjects[subjectItem] == true)
                    {
                        console.log('in first if')
                        console.log(subjectItem)
                        if(studentSubjects.includes(subjectItem))
                        {
                            console.log('TRUE');
                            return true;
                        }
                    }
                }

            }
        );

        console.log("almost end of recommended prof function")
        console.log(currentRecommendedProfessorList);
        setrecommendedProfessors(currentRecommendedProfessorList);

        // TIME TO RANDOMIZE SHIT
        let randomizedArray = [];

        if(currentRecommendedProfessorList.length > 5)
        {
            while(randomizedArray.length != 5)
            {
                let randomProfessor = currentRecommendedProfessorList[Math.floor(Math.random() * currentRecommendedProfessorList.length)];

                if(!randomizedArray.includes(randomProfessor))
                {
                    randomizedArray.push(randomProfessor);
                }
            }
            setrecommendedProfessors(currentRecommendedProfessorList);
        }


    }

    //good idea to use student and professor check
    const onLoginSuccess = async (userType) =>
    {
        console.log('reached onLoginSuccess')
        await setCurrentUser(studenthttpUser.getCurrentUser());
        console.log(currentUser);
        console.log("right after setcurrent user")
        console.log('PRINTING CURRENT USER')
        console.log(studenthttpUser.getCurrentUser().subjects);
        if(studenthttpUser.getCurrentUser()['userType'] == "student")
        {
            console.log('A STUDENT')
            findRecommendedProfessors(studenthttpUser.getCurrentUser());
        }
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

    const updateDatabase = () =>
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
        updateDatabase();

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
                            <ProfessorLookup {...props} profs={professorProps} location={props.location} currentUser={currentUser}
                            recommendedProfessors={recommendedProfessors} />
                        )}
                    />
                    <Route
                        path="/student"
                        render={(props) => (
                            currentUser ?
                                <StudentDashboard {...props} profs={professorProps} sendProfs={professorUpdate}
                                    currentUser={currentUser} location={props.location}
                                    updateDB={updateDatabase} recommendedProfessors={recommendedProfessors}
                                /> :
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
                            <ProfessorDashboard {...props} students={studentProps} profs={professorProps}
                                currentUser={currentUser} updateDB={updateDatabase}
                            />
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
