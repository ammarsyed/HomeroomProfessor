import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import Login from './components/Login';
import HomeStudent from './components/HomeStudent';
import HomeProfessor from './components/HomeProfessor';
import StudentRegister from './components/StudentRegister';
import ProfessorRegister from './components/ProfessorRegister';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const App = (props) => {

  const authenticate = (user, pw) => {
      
  };

  const registration = (account) => {
      /* The variable 'account' has all the data from registration forms for use, 
      *  and I was going to use some if-else statements to differentiate if it was professor
      *  or if it was a student registration and put it into the appropriate database.
      */
  };

  return (

    <Router>
        <div>
            <header class="navbar navbar-dark navbar-expand bd-navbar">
                  <h1>
                      <Link to="/" class="text-decoration-none orange">
                          Homeroom Professor
                      </Link>
                  </h1>
              </header>
        </div>
        <div class="container">
            <Switch>
                <Route exact path = "/" 
                        render={(props) => <Login props={props} authenticate={authenticate} /> }
                />
                <Route path="/HomeStudent" 
                        render={(props) => <HomeStudent props={props} /> }
                />
                <Route path="/HomeProfessor" 
                        render={(props) => <HomeProfessor props={props} /> }
                />  
                <Route path="/StudentRegistration"
                        render={(props) => <StudentRegister props={props} registration={registration} /> } 
                />
                <Route path="/ProfessorRegistration"
                        render={ (props) => <ProfessorRegister props={props} registration={registration} /> } 
                />
            </Switch>
        </div>
    </Router> 
  );
}

export default App;
