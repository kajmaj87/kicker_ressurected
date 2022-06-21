import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Home from './Home';
import Creategroup from './Creategroup';
import Result from './Result';

function App() {
  return (
    <base href=""/>
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
