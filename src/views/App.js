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
  Link,
  useParams
} from "react-router-dom";
import styles from "./App.module.css";
import Editor from "../components/DBEditor/Editor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.root}>
        <Router hashType="hashbang">
          <Switch>
            <Route exact path="/dev/dbeditor/">
              <Editor />
            </Route>
            <Route path="/projects/">
              <Link to="/projects/">Projects</Link>
              {" > "}
              <Switch>
                <Route exact path="/projects/home/">
                  My projects overview
                  <div>
                    <Link to="/projects/past/">past projects</Link>
                  </div>
                  <div>
                    <Link to="/projects/create/">new project</Link>
                  </div>
                </Route>
                <Route exact path="/projects/past/">
                  Past projects
                </Route>
                <Route exact path="/projects/create/">
                  New project
                </Route>
                <Route
                  exact
                  path="/projects/:id/"
                  component={() => {
                    return <div>View project {useParams().id}</div>;
                  }}
                ></Route>
                <Route>
                  <Redirect to="/projects/home/" />
                </Route>
              </Switch>
            </Route>

            <Route exact path="/">
              <Redirect to="/projects/home/" />
            </Route>
            <Route path="/404/">
              Page not found. <Link to="/">Home</Link>
            </Route>
            <Route path="*">
              <Redirect to="/404/" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
