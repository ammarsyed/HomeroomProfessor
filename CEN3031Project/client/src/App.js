import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import Login from './components/Login';

const App = (props) => {

  const authenticate = (user, pw) => {
      
  };

  return (
    <div className="background">
      <div className="row">
        <h1>Homeroom Professor</h1>
        <Login/>
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
