import React from 'react';
import Login from './Login';
import { useHistory } from "react-router-dom";

const StudentRegister = (props) => {

    const history = useHistory();

    let account = {
        name: "",
        email: "",
        dob: "",
        school: ""
    }

    //if form fields are filled, push to home page
    const submitButton = (event) => {
        event.preventDefault();
        //props.authenticate(account.username, account.password);
        document.getElementById("addForm").reset();
        history.push("/")
    }

    const backButton = (event) => {
        event.preventDefault();
        history.push("/")
    }

    return (

        <form id = "addForm" className="column1">
            <div >
                <h2>Student Registration</h2>
                <b>
                    Please enter your information to register as a student.
                </b>
            </div>


            <input className="loginInput" type="text" placeholder="Enter full name" 
                onChange = {
                    event => account.name = (event.target.value)

                }
            />


            <input className="loginInput" type="text" placeholder="Enter Email" 
                onChange = {
                    event => account.email = (event.target.value)

                }
            />


            <input className="loginInput" type="text" placeholder="Enter date of birth" 
                onChange = {
                    event => account.dob = (event.target.value)

                }
            />


            <input className="loginInput" type="text" placeholder="Enter school name" 
                onChange = {
                    event => account.school = (event.target.value)

                }
            />
            <br/>
            <button onClick = {backButton}>Back</button>
            <button onSubmit = {submitButton}>Submit</button>

        </form>
    );



};

export default StudentRegister;