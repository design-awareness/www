// RichProjectTile.js
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
import styles from "./RichProjectTile.module.css";

import { Project } from "../data/models";

class RichProjectTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.load();
  }

  async load() {
    const project = await Project.getForId(this.props.id);
    this.setState({ project, loaded: true });
  }

  render() {
    return this.state.loaded ? (
      <div className={styles.root}>
        <h2>{this.state.project.name}</h2>
        <p>{this.state.project.description}</p>
        <Link to={"/projects/" + this.props.id + "/"}>Open</Link>
      </div>
    ) : (
      <em>loading project {this.props.id}</em>
    );
  }
}

export default RichProjectTile;
