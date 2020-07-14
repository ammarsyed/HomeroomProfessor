import React from 'react';
import {Route} from 'react-router-dom'
import { useHistory } from "react-router-dom";

const HomeStudent = (props) => {

     const history = useHistory();

    return (

        <div >
            <h1>
                Welcome Home, Student.
            </h1>
        </div>
    );



};

export default HomeStudent;