import React from 'react';
import {Route} from 'react-router-dom'
import { useHistory } from "react-router-dom";

const Home = (props) => {

     const history = useHistory();

    return (

        <div >
            <h1>
                Welcome Home.
            </h1>
        </div>
    );



};

export default Home;