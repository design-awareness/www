// App.js
// Copyright (C) 2020
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Editor from "./components/DBEditor/Editor";

import ProjectsHomeView from "./views/ProjectsHomeView";
import AllProjectsView from "./views/AllProjectsView";
import CreateProjectView from "./views/CreateProjectView";
import ProjectView from "./views/ProjectView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setGlobalState = this.setState.bind(this);
  }

  render() {
    return (
      <Router hashType="hashbang">
        <Switch>
          <Route exact path="/dev/dbeditor/">
            <Editor />
          </Route>

          <Route exact path="/home/">
            <ProjectsHomeView
              globalState={this.state}
              setGlobalState={this.setGlobalState}
            />
          </Route>

          <Route exact path="/projects/">
            <AllProjectsView
              globalState={this.state}
              setGlobalState={this.setGlobalState}
            />
          </Route>

          <Route exact path="/projects/new/">
            <CreateProjectView
              globalState={this.state}
              setGlobalState={this.setGlobalState}
            />
          </Route>

          <Route
            exact
            path="/projects/:id/"
            render={props => (
              <ProjectView
                globalState={this.state}
                setGlobalState={this.setGlobalState}
                id={props.match.params.id}
                key={
                  // get a new component if the id changes
                  props.match.params.id
                }
              />
            )}
          />

          <Route exact path="/">
            <Redirect to="/home/" />
          </Route>

          <Route path="/404/">
            Page not found. <Link to="/">Home</Link>
          </Route>

          <Route>
            <Redirect to="/404/" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
