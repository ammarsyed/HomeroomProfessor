import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const STUDENT_API_URL = 'http://localhost:5000/api/students';
const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [hash, setHash] = useState("");

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(STUDENT_API_URL)
            .then(res => {

                for (var i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].username);
                    console.log(res.data[i].hash);

                    if (res.data[i].username === username && res.data[i].hash === hash) {
                        console.log("Log In Succeed, Student")
                        history.push("/HomeStudent")
                    }
                }

            })

        axios.get(PROFESSOR_API_URL)
            .then(res => {

                for (var i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].username);
                    console.log(res.data[i].hash);

                    if (res.data[i].username === username && res.data[i].hash === hash) {
                        console.log("Log In Succeed, Professor")
                        history.push("/HomeProfessor")
                    }
                }

            })

        console.log("Log In Failed")
        history.push("/")

    };

    const studentRegistration = (event) => {
        event.preventDefault();
        history.push("/StudentRegistration")
    }

    const professorRegistration = (event) => {
        event.preventDefault();
        history.push("/ProfessorRegistration")
    }

    return (
        <>
        <div class="row">
            <div class="col">
                <img src="../../1200px-Florida_Gators_gator_logo.png" class="img-max" alt="Gator Image"></img>
            </div>
            <div class="col">
                <form id="addForm" onSubmit={handleSubmit}>
                    <div >
                        <h2>Sign In</h2>
                        <b>
                            Please enter your Username and Password to log in.
                </b>
                    </div>
                    <input
                        className="inputFormHalf"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <br />
                    <input
                        className="inputFormHalf"
                        type="text"
                        placeholder="Enter Password"
                        value={hash}
                        onChange={event => setHash(event.target.value)}
                    />
                    <br />

                    <input id="button" type="submit" value="Submit" />
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col mt-2">
                <button class="ml-5" onClick={studentRegistration}>Register as a Student</button>
                <button class="ml-5" onClick={professorRegistration}>Register as a Professor</button>
            </div>
        </div>
        </>
    );



};

export default Login;