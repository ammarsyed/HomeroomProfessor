import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';
import professorRegister from './components/professorRegister';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = (props) => {

  const authenticate = (user, pw) => {
      
  };

  return (

    <Router>
        <div className="background">
           <div className="row">

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>  

        <Switch>

        <Route exact path = "/" component  = {Login} />
        <Route exact path = "/registration" component  = {Register} />
        <Route exact path = "/professorregistration" component  = {professorRegister} />

        </Switch>
        
          </div>
        </div>
    </Router> 
  );
}

export default App;
