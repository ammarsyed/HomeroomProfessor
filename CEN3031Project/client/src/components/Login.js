import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

import studenthttpUser from '../studenthttpUser';

const Login = (props) =>
{
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
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <img src="../../1200px-Florida_Gators_gator_logo.png" className="img-max" alt="Florida Gator Logo"></img>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <form id="login" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h2>Sign In</h2>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputUsername" className="font-weight-bold mb-0">Username:</label>
                                    <input
                                        className="ml-0"
                                        type="text"
                                        id="inputUsername"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={event => setUsername(event.target.value)}
                                    />
                                    <label htmlFor="inputPassword" className="font-weight-bold mb-0">Password:</label>
                                    <input
                                        className="ml-0"
                                        id="inputPassword"
                                        type="password"
                                        placeholder="Enter Password"
                                        value={hash}
                                        onChange={event => setHash(event.target.value)}
                                    />
                                    <br />
                                    <label>
                                        <input type="checkbox" className="ml-1"
                                            onChange={event => showPassword(event.target.value)}
                                        /> Show Password
                                    </label>
                                    <br />
                                </div>
                                <div className="form-group">
                                    <input className="button" type="submit" value="Login" />
                                    <button className="button" onClick={handleRegister}>Register</button>
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