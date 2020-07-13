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

  const registration = (account) => {
      
  };

  return (

    <Router>
        <div className="background">
           <div className="row">
            <h1><Link to="/" style={{textDecoration: 'none', color: 'black'}}>Homeroom Professor</Link></h1>
            <Switch>
              <Route exact path = "/" render={(props) => <Login 
                    props={props} 
                    authenticate={authenticate}
              /> } />
              <Route exact path = "/Home" render={(props)=><Home 
                props={props} 
              /> } />
              <Route exact path = "/StudentRegistration" render={(props)=><StudentRegister
                props={props} 
                registration={registration} 
              /> } />
              <Route exact path = "/ProfessorRegistration" render={(props)=><ProfessorRegister 
                props={props} 
                registration={registration}
              /> } />
            </Switch>
          </div>
        </div>
    </Router> 
  );
}

export default App;
