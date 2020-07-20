import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl} from 'react-bootstrap';

const STUDENT_API_URL = 'http://localhost:5000/api/students';
const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const Login = (props) =>
{
    const [username, setUsername] = useState("");
    const [hash, setHash] = useState("");

    const history = useHistory();

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        // will be moved to backend when we do authentication and protected routes. also looks like it wont work if professor and student have the same name
        axios.get(STUDENT_API_URL)
            .then(res =>
            {

                for(var i = 0; i < res.data.length; i++)
                {
                    console.log(res.data[i].username);
                    console.log(res.data[i].hash);

                    if(res.data[i].username === username && res.data[i].hash === hash)
                    {
                        console.log("Log In Succeed, Student")
                        history.push("/HomeStudent/dashboard")
                    }
                }

            })

        axios.get(PROFESSOR_API_URL)
            .then(res =>
            {

                for(var i = 0; i < res.data.length; i++)
                {
                    console.log(res.data[i].username);
                    console.log(res.data[i].hash);

                    if(res.data[i].username === username && res.data[i].hash === hash)
                    {
                        console.log("Log In Succeed, Professor")
                        history.push("/HomeProfessor")
                    }
                }

            })

        console.log("Log In Failed")
        history.push("/")

    };

    const studentRegistration = (event) =>
    {
        event.preventDefault();
        history.push("/StudentRegistration")
    }

    const professorRegistration = (event) =>
    {
        event.preventDefault();
        history.push("/ProfessorRegistration")
    }

    //Function to change the input type for password entries to allow for show/hide checkbox
    function showPassword()
    {
        let x = document.getElementById("inputPassword");

        if(x.type === "password")
        {
            x.className = "inputFormHalfPassword"
            x.type = "text";
        } else
        {
            x.type = "password";
        }
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">HOMEROOM PROFESSOR</Navbar.Brand>
            </Navbar>
            <div class="container">
                <div class="row">
                    <div class="col pr-0">
                        <div class="row">
                            <img src="../../1200px-Florida_Gators_gator_logo.png" class="ml-3 img-max" alt="Gator Image"></img>
                        </div>
                        <div class="row">
                            <button id="button" class="ml-5" onClick={studentRegistration}>Register as a Student</button>
                            <button id="button" class="ml-5" onClick={professorRegistration}>Register as a Professor</button>
                        </div>
                    </div>
                    <div class="col pr-0">
                        <form id="login" onSubmit={handleSubmit}>
                            <div >
                                <h2>Sign In</h2>
                            </div>
                            <strong class="ml-2 mb-0">Username: </strong><input
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                            <br />
                            <input
                                id="inputPassword"
                                type="password"
                                placeholder="Password"
                                value={hash}
                                onChange={event => setHash(event.target.value)}
                            />
                            <br />
                            <label>
                                <input type="checkbox" class="ml-2"
                                    onChange={event => showPassword(event.target.value)}
                                /> Show Password
                        </label>
                            <br />

                            <input id="button" type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );



};

export default Login;