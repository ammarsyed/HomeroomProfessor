import React from 'react';

const Register = (props) => {

    let account = {
        name: "",
        email: "",
        dob: "",
        school: ""
    }

    const submitButton = (event) => {
        event.preventDefault();
        props.authenticate(account.username, account.password);
        document.getElementById("addForm").reset();

    }

    return (

        <form id = "addForm">
            <div >
                <h2>Student Registration</h2>
                <b>
                    Please enter your information to register as a student.
                </b>
            </div>


            <input type="text" placeholder="Enter full name" 
                onChange = {
                    event => account.name = (event.target.value)

                }
            />


            <input type="text" placeholder="Enter Email" 
                onChange = {
                    event => account.email = (event.target.value)

                }
            />


            <input type="text" placeholder="Enter date of birth" 
                onChange = {
                    event => account.dob = (event.target.value)

                }
            />


            <input type="text" placeholder="Enter school name" 
                onChange = {
                    event => account.school = (event.target.value)

                }
            />

            <button onSubmit = {submitButton}>Submit</button>

        </form>
    );



};

export default Register;