import React from 'react';

const Login = (props) => {
  
    let account = {
        username: "",
        password: ""
    }

    const submitButton = (event) => {
        event.preventDefault();
        props.authenticate(account.username, account.password);
        document.getElementById("addForm").reset();
    }

    const studentRegistration = (event) => {
        event.preventDefault();
    }

    const professorRegistration = (event) => {
        event.preventDefault();
    }

    return (
        <form id = "addForm">
            <div >
                <h2>Sign In</h2>
                <b>
                    Please enter your Username and Password to log in.
                </b>
            </div>
            <input type="text" placeholder="Enter Username" 
                onChange = {
                    event => account.username = (event.target.value)
                }
            />
            <input type="text" placeholder="Enter Password" 
                onChange = {
                    event => account.password = (event.target.value)
                }
            />
            <button onSubmit = {submitButton}>Submit</button>
            <button onClick = {studentRegistration}>Register as a Student</button>
            <button onClick = {professorRegistration}>Register as a Professor</button>
        </form>
    );

};

export default Login;