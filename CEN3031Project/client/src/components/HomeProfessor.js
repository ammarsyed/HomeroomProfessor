import React from 'react';
//import {Route} from 'react-router-dom'
//import { useHistory } from "react-router-dom";

const HomeProfessor = (props) =>
{

    //const history = useHistory();

    return (

        <div >
            <h1>
                Welcome to your Dashboard, {props.currentUser.fullName}!
            </h1>
        </div>
    );



};

export default HomeProfessor;