// ProjectsHomeView.js
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
import { Link } from "react-router-dom";
import styles from "./ProjectsHomeView.module.css";

import RichProjectTile from "../components/RichProjectTile";

import { getAll } from "../data/database";

class ProjectsHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.loadProjects();
  }

  loadProjects = async () => {
    const projects = await getAll("Project");
    // this.props.setGlobalState({ projectListDirty: false });
    this.setState({ projects });
  };

  // componentDidUpdate(prevProps) {
  // if (this.props.globalState.projectListDirty) {
  // this.loadProjects();
  // }
  // }

  render() {
    return (
      <div className={styles.root}>
        <h1>Projects home view</h1>
        <div className={styles.projects}>
          <ul>
            <li>
              <RichProjectTile add />
            </li>
            {this.state.projects.map((id) => (
              <li key={id}>
                <RichProjectTile id={id} />
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.small}>
          <Link to="/dev/dbeditor">DBEditor</Link> 
          <Link to="/dev/codethemes">Code themes</Link> 
          <Link to="/dev/component-library/">Component Library</Link>
        </p>
      </div>
    );
  }
}

export default ProjectsHomeView;
