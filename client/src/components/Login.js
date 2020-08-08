import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

import studenthttpUser from '../studenthttpUser';

import Alert from 'react-bootstrap/Alert'

const Login = (props) =>
{
    const [loginError, setloginError] = useState("");
    const [username, setUsername] = useState("");
    const [hash, setHash] = useState("");

    const updateLogin = (value) =>
    {
        props.sendLogin(value);
    };

    const history = useHistory();

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        const fields = {username: username, password: hash}
        console.log('print fields')
        console.log(fields);

        const user = await studenthttpUser.logIn(fields); //getting error here
        console.log('called login in studenthttpuser')
        console.log(user)


        if(user)
        {

            console.log('on login success function called')
            props.onLoginSuccess(user);
            console.log('calling updateLogin')
            updateLogin(true);
            console.log('push')

            if(user.userType == 'student')
            {
                history.push("/student")
            }
            else if(user.userType == 'professor')   //added this in
            {
                history.push("/professor")
            }
        }
        else
        {
            setloginError("The username and password you entered did not match our records. Please double-check and try again.")
        }

    };


    const handleRegister = (event) =>
    {
        event.preventDefault();
        history.push("/register")
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

        <div className="modal-dialog text-center">
            <div className="col-sm-9 main-section">

                <div className="modal-content">

                    <div className="col-12 user-img">
                        <img src="logo.svg">
                        </img>
                    </div>

                    <label htmlFor="inputUsername" className="font-weight-bold mb-0 text-large text-white">
                        <b>Homeroom Professor</b>
                    </label>
                    <br />
                    {
                        loginError == "" ? null : <Alert variant='danger'>{loginError}</Alert>
                    }
                    <form id="login" onSubmit={handleSubmit}>



                        <div className="form-group2">
                            {/* <label htmlFor="inputUsername" className="font-weight-bold mb-0">Username:</label> */}
                            <input
                                className="ml-0"
                                type="text"
                                id="inputUsername"
                                placeholder="Enter Username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />

                        </div>

                        <div className="form-group3">
                            {/* <label htmlFor="inputPassword" className="font-weight-bold mb-0">Password:</label> */}
                            <input
                                className="ml-0"
                                id="inputPassword"
                                type="password"
                                placeholder="Enter Password"
                                value={hash}
                                onChange={event => setHash(event.target.value)}
                            />
                        </div>

                        <label className="mb-0 text-white">
                            <input type="checkbox" className="ml-1" onChange={event => showPassword(event.target.value)} />
                            &nbsp; Show Password
                        </label>
                        <div>
                            <br />
                            <input className="button" type="submit" value="Login" />
                            <button className="button" onClick={handleRegister}>Register</button>
                        </div>

                    </form>



                </div>
            </div>
        </div>

    );



};

export default Login;