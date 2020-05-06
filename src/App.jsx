import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import PhaseDetail from './pages/PhaseDetail';

export default function BasicExample() {
  console.log('BASE_URL', process.env);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/modules">
          <Modules />
        </Route>
        <Route path="/modules/:id">
          <ModuleDetail />
        </Route>
        <Route path="/phases/:id">
          <PhaseDetail />
        </Route>
      </Switch>
    </Router>
  );
}
