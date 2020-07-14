import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Button, Icon} from 'semantic-ui-react';

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

    function showPassword(){
        let x = document.getElementById("passwordID");

        if (x.type === "password") {
            x.className = "inputFormHalfPassword"
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (

        <form id="addForm" onSubmit={handleSubmit}> 
            <div >
                <h2>Sign In</h2>
                <b>
                    Please enter your Username and Password to log in.
                </b>
            </div>
            <strong className="fontMedium">Username:</strong> <input
                className="inputFormHalf"
                type="text"
                placeholder="Enter Username" 
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <br/>
            <strong className="fontMedium">Password:</strong> <input
                type="password"
                placeholder="Enter Password"
                id="passwordID"
                value={hash}
                onChange={event => setHash(event.target.value)}
            />
            <br/>
            <label>
                <input type="checkbox"
                    onChange={event => showPassword(event.target.value)} 
                /> Show Password
            </label>
            <br/>   
            <div className="break">
                <Button animated className="button_animated">
                    <Button.Content visible>
                        Submit
                    </Button.Content>
                    <Button.Content hidden>
                        <i class="sign-in icon"/>
                    </Button.Content>
                </Button>

                <div className="break">
                    <Button animated className="button_animated" onClick = {studentRegistration}>
                        <Button.Content visible>
                            Register as a Student
                        </Button.Content>
                        <Button.Content hidden>
                            <i class="sign-in icon"/>
                        </Button.Content>
                    </Button>
                    
                    <Button animated className="button_animated" onClick = {professorRegistration}>
                        <Button.Content visible>
                            Register as a Professor
                        </Button.Content>
                        <Button.Content hidden>
                            <i class="sign-in icon"/>
                        </Button.Content>
                    </Button>    
                </div>       
            </div>
        </form>
    );



};

export default Login;