import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import Login from './components/Login';
import Home from './components/Home';
import StudentRegister from './components/StudentRegister';
import ProfessorRegister from './components/ProfessorRegister';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = (props) => {

  const authenticate = (user, pw) => {
      
  };

  return (

    <Router>
        <div className="background">
           <div className="row">
            <h1><Link to="/" style={{textDecoration: 'none', color: 'black'}}>Homeroom Professor</Link></h1>
            <Switch>
              <Route exact path = "/" component  = {Login} />
              <Route exact path = "/Home" component  = {Home} />
              <Route exact path = "/StudentRegistration" component  = {StudentRegister} />
              <Route exact path = "/ProfessorRegistration" component  = {ProfessorRegister} />
            </Switch>
          </div>
        </div>
    </Router> 
  );
}

export default App;
