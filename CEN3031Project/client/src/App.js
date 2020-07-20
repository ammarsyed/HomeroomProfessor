import React, {useState, useEffect} from 'react';
import axios from "axios";
import Search from './components/Search';
import Login from './components/Login';
import HomeStudent from './components/HomeStudent';
import HomeProfessor from './components/HomeProfessor';
import StudentRegister from './components/StudentRegister';
import ProfessorRegister from './components/ProfessorRegister';
import ProfessorLookup from './components/ProfessorLookup';
import StudentDashboard from './components/StudentDashboard';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';
import {Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl} from 'react-bootstrap';
import Route from 'react-router-dom/Route';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';



const App = (props) =>
{

    let realData;

    const products = [
        //     {
        //         firstName: 'Mark',
        //         lastName: 'Smith',
        //         department: 'english',
        //         university: 'UF',
        //         subject: 'Creative Writing',
        //         request: <Button>Request</Button>
        //     }, {
        //         firstName: 'Daniel',
        //         lastName: 'Labes',
        //         department: 'math',
        //         university: 'UF',
        //         subject: 'Calculus'
        //     }
    ]
    
    const profData = () => {
        axios.get(PROFESSOR_API_URL).then(
            res => {
                realData = res;
                console.log(realData);
                for (let i in realData.data) {
                    let packet = {
                        fullName: realData.data[i].fullName,
                        department: realData.data[i].department,
                        university: realData.data[i].university,
                        subjects: realData.data[i].subjects,
                    }
                    console.log(packet);
                    products.push(packet);
                }
                return products;
            });
    }

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

    profData();

    return (
        <Router>
            <Route exact path="/"
                render={(props) => <Login props={props} authenticate={authenticate} />}
            />
            <Route path="/HomeStudent"
                render={(props) => <HomeStudent props={props} />}
            />
            <Route path="/HomeStudent/dashboard"
                render={(props) => <StudentDashboard props={props} />}
            />
            <Route path="/HomeStudent/professor-lookup"
                render={(props) => <ProfessorLookup data={products} />}
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
