import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

import studenthttpUser from '../studenthttpUser';


const STUDENT_API_URL = 'http://localhost:5000/api/students';
const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';




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
        // will be moved to backend when we do authentication and protected routes. also looks like it wont work if professor and student have the same name
        //changing NOW
        // axios.get(STUDENT_API_URL)
        //     .then(res =>
        //     {
        //         //setProfessorProps()
        //         for(var i = 0; i < res.data.length; i++)
        //         {
        //             //console.log(res.data[i].username);
        //             //console.log(res.data[i].hash);

        //             if(res.data[i].username === username && res.data[i].hash === hash)
        //             {
        //                 console.log("Log In Succeed, Student")
        //                 updateLogin(true);
        //                 history.push("/student")
        //             }
        //         }

        //     })

        const fields = {username: username, password: hash}
        const user = await studenthttpUser.login(fields);

        // axios.get(STUDENT_API_URL) //TODO, fix this, send stuff to appjs (set current user stuff) which sends it to dashboard which needs to print it out like hello fullname! 
        //     .then(res =>
        //     {
        //         //setProfessorProps()
        //         for(var i = 0; i < res.data.length; i++)
        //         {
        //             //console.log(res.data[i].username);
        //             //console.log(res.data[i].hash);

        //             if(res.data[i].username === username && res.data[i].hash === hash)
        //             {
        //                 console.log("Log In Succeed, Student")
        if(user)
        {
            props.onLoginSuccess(user);
            updateLogin(true);
            history.push("/student")
        }
        // }
        // }

        // })
        //to be updated later
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
                        updateLogin(true);
                        history.push("/professor")
                    }
                }

            })

        console.log("Log In Failed")
        history.push("/")

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