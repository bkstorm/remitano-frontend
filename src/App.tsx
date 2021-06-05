import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { Home } from './pages/home/Home';
import { Share } from './pages/share/Share';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/share">
            <Share />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
