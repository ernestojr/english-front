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

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/modules">
          <Modules />
        </Route>
        <Route exact path="/modules/:moduleId">
          <ModuleDetail />
        </Route>
        <Route path="/modules/:moduleId/phases/:phaseId">
          <PhaseDetail />
        </Route>
      </Switch>
    </Router>
  );
}
