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

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./CreateProjectView.module.css";
import { Project } from "../data/models";

import DesignActivitySetChooser from "../components/DesignActivitySetChooser";

function CreateProjectView(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [working, setWorking] = useState(false);
  const [activitySet, setActivitySet] = useState(null);
  const [newProjectId, setNewProjectId] = useState(null);

  const save = async () => {
    setWorking(true);
    const proj = new Project();
    proj.name = name;
    proj.description = desc;
    proj.codeScheme = activitySet;
    proj.created = new Date();
    proj.active = true;
    await proj.save();
    setNewProjectId(proj.id);
  };

  if (newProjectId) {
    return <Redirect to={"/projects/" + newProjectId + "/"} />;
  }

  return (
    <div className={styles.root}>
      <Link to="/home/">Back</Link>
      <h1>Create project</h1>
      <label>
        Name: <input onChange={evt => setName(evt.target.value)} value={name} />
      </label>
      <label>
        Description:{" "}
        <textarea onChange={evt => setDesc(evt.target.value)} value={desc} />
      </label>

      <h2>Choose design activity set</h2>

      <DesignActivitySetChooser value={activitySet} setValue={setActivitySet} />

      <button disabled={!name || !activitySet || working} onClick={save}>
        {working ? "Creating…" : "Create"}
      </button>
    </div>
  );
}

export default CreateProjectView;
