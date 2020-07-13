import React from 'react';
import Login from './Login';
import { useHistory } from "react-router-dom";

const ProfessorRegister = (props) => {
    
    const history = useHistory();

    let account = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        university: "",
        department: "",
        city: "",
        state: "",
        subjects: [],
    }

    const submitButton = (event) => {
        event.preventDefault();
        //if form checkbox fields are filled, push into subjects
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        //pushing into account.subjects the checkbox values
        for (var i = 0; i < checkboxes.length; i++) {
            account.subjects.push(checkboxes[i].value);
        }

        //passing the account to registration
        props.registration(account);

        //set to Home page
        history.push("/Home")
    }

    const backButton = (event) => {
        event.preventDefault();
        history.push("/")
    }


    return (
        <form id = "addForm">
            <div >
                <h2>Professor Registration</h2>
                <p>
                    <strong>Please enter your information to register as a professor.</strong>
                </p>
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
            <input className="inputHalf" type="text" placeholder="University" 
                onChange = { event => account.university = (event.target.value) }
            />
            <input className="inputHalf" type="text" placeholder="Department" 
                onChange = { event => account.department = (event.target.value) }
            />
            <br/>
            <p className="inputCheckboxes"><strong>Select Subjects To Tutor:</strong>
                <br/>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="computerscience"/>Computer Science</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="english"/>English</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="spanish"/>Spanish</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="french"/>French</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="latin"/>Latin</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="algebra"/>Algebra</label>
                <br/>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="geometry"/>Geometry</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="precalculus"/>Precalculus</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="statistics"/>Statistics</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="calculus"/>Calculus</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="biology"/>Biology</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="chemistry"/>Chemistry</label>
                <br/>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="physics"/>Physics</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="healthscience"/>Health Science</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="environmentalscience"/>Environmental Science</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="earthscience"/>Earth Science</label>
                <br/>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="history"/>History</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="economics"/>Economics</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="psychology"/>Psychology</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="government"/>Government</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject" value="geography"/>Geography</label>
            </p>
            <input className="inputHalf" type="text" placeholder="Desired Username" 
                onChange = { event => account.username = (event.target.value) }
            />
            <input className="inputHalf" type="text" placeholder="Password" 
                onChange = { event => account.password = (event.target.value) }
            />
            <br/>

            <button onClick = {backButton}>Back</button>
            <button onClick = {submitButton}>Submit</button>
        </form>
    );



};

export default ProfessorRegister;
