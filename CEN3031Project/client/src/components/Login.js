import React from 'react';
import {Route} from 'react-router-dom'
import { useHistory } from "react-router-dom";

const Login = (props) => {

     const history = useHistory();


    let account = {
        username: "",
        password: ""

    }

    //This should be updated so when authenticated correctly, redirected to home page, otherwise stay at login
    const submitButton = (event) => {
        event.preventDefault();
        props.authenticate(account.username, account.password);
        document.getElementById("addForm").reset();
    }

    const studentRegistration = (event) => {
        event.preventDefault();
        history.push("/StudentRegistration")
    }

    const professorRegistration = (event) => {
        event.preventDefault();
        history.push("/ProfessorRegistration")
    }

    return (

        <form id = "addForm" className="column1"> 
            <div >
                <h2>Sign In</h2>
                <b>
                    Please enter your Username and Password to log in.
                </b>
            </div>
            <input className="loginInput" type="text" placeholder="Enter Username" 
                onChange = {
                    event => account.username = (event.target.value)

                }
            />
            <br/>
            <input className="loginInput" type="text" placeholder="Enter Password" 
                onChange = {
                    event => account.password = (event.target.value)

                }
            />
            <br/>
            <button onSubmit = {submitButton}>Submit</button>
            <button onClick = {studentRegistration}>Register as a Student</button>
            <button onClick = {professorRegistration}>Register as a Professor</button>
        </form>
    );



};

export default Login;