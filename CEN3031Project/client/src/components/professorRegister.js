import React from 'react';
import Login from './Login';
import { useHistory } from "react-router-dom";

const ProfessorRegister = (props) => {
    
    const history = useHistory();

    let account = {
        name: "",
        email: "",
        university: "",
        department: ""
    }

    //if form fields are filled, push to home page
    const submitButton = (event) => {
        event.preventDefault();
        //props.authenticate(account.username, account.password);
        document.getElementById("addForm").reset();
    }

    const backButton = (event) => {
        event.preventDefault();
        history.push("/")
    }


    return (
        <form id = "addForm" className="column1">
            <div >
                <h2>Professor Registration</h2>
                <b>
                    Please enter your information to register as a professor.
                </b>
            </div>


            <input className="loginInput" type="text" placeholder="Enter full name" 
                onChange = {
                    event => account.name = (event.target.value)

                }
            />


            <input className="loginInput" type="text" placeholder="Enter email" 
                onChange = {
                    event => account.email = (event.target.value)

                }
            />


            <input className="loginInput" type="text" placeholder="Enter university" 
                onChange = {
                    event => account.university = (event.target.value)

                }
            />


            <input className="loginInput" type="text" placeholder="Enter department" 
                onChange = {
                    event => account.department = (event.target.value)

                }
            />
            <br/>
            <button onClick = {backButton}>Back</button>
            <button onSubmit = {submitButton}>Submit</button>
        </form>
    );



};

export default ProfessorRegister;