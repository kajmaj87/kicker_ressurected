import './App.css';
import React, { useState, useEffect } from 'react';
import * as FirestoreService from './services/firestore';
import {useHistory, useLocation} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Home from './Home';
import Creategroup from './Creategroup';
import Result from './Result';

function App() {
  const history = useHistory();
  //const location = useLocation();
  const handleClick = () => history.push('/some-route');
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [company, setGroceryList] = useState();
  const [error, setError] = useState();


  return (
    <div className="App">
    <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/newGroup"  exact>
            <Creategroup />
          </Route>

          <Route path="/*"  exact>
            <Result />
          </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
