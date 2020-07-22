import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl} from 'react-bootstrap';
import Register from './Registration/Register';

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
                //setProfessorProps()
                for(var i = 0; i < res.data.length; i++)
                {
                    //console.log(res.data[i].username);
                    //console.log(res.data[i].hash);

                    if(res.data[i].username === username && res.data[i].hash === hash)
                    {
                        console.log("Log In Succeed, Student")
                        history.push("/StudentDashboard")
                    }
                }

            })

        axios.get(PROFESSOR_API_URL)
            .then(res =>
            {

                for(var i = 0; i < res.data.length; i++)
                {
                    //console.log(res.data[i].username);
                    //console.log(res.data[i].hash);

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


    const handleRegister = (event) => {
        event.preventDefault();
        history.push("/Register")
    }

    //Function to change the input type for password entries to allow for show/hide checkbox
    function showPassword()
    {
        let x = document.getElementById("inputPassword");

        if(x.type === "password")
        {
            x.type = "text";
        } else
        {
            x.type = "password";
        }
    }

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <img src="../../1200px-Florida_Gators_gator_logo.png" class="ml-3" className="img-max" alt="Gator Image"></img>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <form id="login" onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <h2>Sign In</h2>
                                </div>
                                <div class="form-group">
                                    <label for="inputUsername" class="font-weight-bold mb-0">Username:</label>
                                    <input
                                        class="ml-0"
                                        type="text"
                                        id="inputUsername"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={event => setUsername(event.target.value)}
                                    />
                                    <label for="inputPassword" class="font-weight-bold mb-0">Password:</label>
                                    <input
                                        class="ml-0"
                                        id="inputPassword"
                                        type="password"
                                        placeholder="Enter Password"
                                        value={hash}
                                        onChange={event => setHash(event.target.value)}
                                    />
                                    <br />
                                    <label>
                                        <input type="checkbox" class="ml-1"
                                            onChange={event => showPassword(event.target.value)}
                                        /> Show Password
                                    </label>
                                    <br />
                                </div>
                                <div class="form-group">
                                    <input id="button" type="submit" value="Login" />
                                    <button id="button" onClick={handleRegister}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );



};

export default Login;