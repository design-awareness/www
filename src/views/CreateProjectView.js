// CreateProjectView.js
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
import styles from "./CreateProjectView.module.css";
import { Project } from "../data/models";

class CreateProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      working: false
    };
  }

  changeName = evt => {
    this.setState({ name: evt.target.value });
  };

  changeDesc = evt => {
    this.setState({ desc: evt.target.value });
  };

  save = async () => {
    this.setState({
      working: true
    });
    const proj = new Project();
    proj.name = this.state.name;
    proj.description = this.state.desc;
    proj.created = new Date();
    proj.active = true;
    await proj.save();
    this.setState({
      newProjectId: proj.id
    });
    // this.props.setGlobalState({
    //   projectListDirty: true
    // });
  };

  render() {
    if (this.state.newProjectId) {
      return <Redirect to={"/projects/" + this.state.newProjectId + "/"} />;
    }
    return (
      <div className={styles.root}>
        <Link to="/home/">Back</Link>
        <h1>Create project</h1>
        <label>
          Name: <input onChange={this.changeName} value={this.state.name} />
        </label>
        <label>
          Description:{" "}
          <textarea onChange={this.changeDesc} value={this.state.desc} />
        </label>
        <button
          disabled={!this.state.name || this.state.working}
          onClick={this.save}
        >
          {this.state.working ? "Creating…" : "Create"}
        </button>
      </div>
    );
  }
}

export default CreateProjectView;
