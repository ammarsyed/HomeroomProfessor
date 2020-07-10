import React from 'react';
import Login from './Login';
import { useHistory } from "react-router-dom";

const StudentRegister = (props) => {

    const history = useHistory();

    let account = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        age: "",
        phoneNumber: "",
        city: "",
        state: "",
        subjects: [],
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

        <form id = "addForm">
            <div >
                <h2>Student Registration</h2>
                <b>
                    Please enter your information below to register as a student.
                </b>
            </div>

            <input className="inputThird" type="text" placeholder="First Name" 
                onChange = { event => account.firstName = (event.target.value) }
            />
            <input className="inputThird" type="text" placeholder="Last Name" 
                onChange = { event => account.lastName = (event.target.value) }
            />
            <input className="inputThird" type="text" placeholder="Phone Number" 
                onChange = { event => account.phoneNumber = (event.target.value) }
            />
            <input className="inputEigth" type="text" placeholder="Age" 
                onChange = { event => account.age = (event.target.value) }
            />
            <br/>
            <input className="inputThird" type="text" placeholder="City" 
                onChange = { event => account.city = (event.target.value) }
            />
            <input className="inputThird" type="text" placeholder="State" 
                onChange = { event => account.state = (event.target.value) }
            />
            <input className="inputHalf" type="text" placeholder="E-mail" 
                onChange = { event => account.email = (event.target.value) }
            />
            <br/>
            <input className="inputHalf" type="text" placeholder="Desired Username" 
                onChange = { event => account.username = (event.target.value) }
            />
            <input className="inputHalf" type="text" placeholder="Password" 
                onChange = { event => account.password = (event.target.value) }
            />
            <br/>

            <button onClick = {backButton}>Back</button>
            <button onSubmit = {submitButton}>Submit</button>

        </form>
    );



};

export default StudentRegister;