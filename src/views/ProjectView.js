// ProjectView.js
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
import { Link, Redirect } from "react-router-dom";
import styles from "./ProjectView.module.css";
import { Project } from "../data/models";

import Button from "../components/Button";

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      exit: false,
      noProject: false
    };
    this.load();
  }

  async load() {
    const project = await Project.getForId(this.props.id);
    if (!project) {
      this.setState({
        noProject: true
      });
    } else {
      this.setState({
        loaded: true,
        project
      });
    }
  }

  delete = async () => {
    if (!window.confirm("are you sure")) return;
    await this.state.project.remove();
    this.setState({
      exit: true
    });
  };

  render() {
    if (this.state.noProject) {
      return <Redirect to="/404/" />;
    }
    if (this.state.exit) {
      return <Redirect to="/home/" />;
    }
    return this.state.loaded ? (
      <div className={styles.root}>
        <Link to="/home/">Back</Link>
        <h1>{this.state.project.name}</h1>
        <p>{this.state.project.description}</p>
        <p>
          {`Created ${this.state.project.created.toLocaleDateString()} ` +
            this.state.project.created.toLocaleTimeString()}
        </p>
        <Button onClick={this.delete}>delete</Button>
      </div>
    ) : (
      <div className={styles.root}>
        <Link to="/home/">Back</Link> <em>loading</em>
      </div>
    );
  }
}

export default ProjectView;
