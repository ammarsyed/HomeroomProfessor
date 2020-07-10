import React from 'react';

const professorRegister = (props) => {


    let account = {
        name: "",
        email: "",
        university: "",
        department: ""
    }

    const submitButton = (event) => {
        event.preventDefault();
        props.authenticate(account.username, account.password);
        document.getElementById("addForm").reset();

    }


    return (

        <form id = "addForm">
            <div >
                <h2>Professor Registration</h2>
                <b>
                    Please enter your information to register as a professor.
                </b>
            </div>


            <input type="text" placeholder="Enter full name" 
                onChange = {
                    event => account.name = (event.target.value)

                }
            />


            <input type="text" placeholder="Enter email" 
                onChange = {
                    event => account.email = (event.target.value)

                }
            />


            <input type="text" placeholder="Enter university" 
                onChange = {
                    event => account.university = (event.target.value)

                }
            />


            <input type="text" placeholder="Enter department (i.e. Engineering, Liberal Arts, etc) " 
                onChange = {
                    event => account.department = (event.target.value)

                }
            />

            <button onSubmit = {submitButton}>Submit</button>
        </form>
    );



};

export default professorRegister;