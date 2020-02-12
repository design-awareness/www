// Editor.js
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
import styles from "./Editor.module.css";

import Field from "./Field";

import { getAll } from "../../data/database";
import { getGeneric, lookupModel } from "../../data/DBModel";

function fillModel(cls) {
  if (!cls) return null;
  let entity = new cls();
  let model = cls.__model;
  for (let field of model) {
    if (!field.repeated) {
      if (field.type === Date) {
        entity[field.name] = new Date();
      } else if (field.type === Number) {
        entity[field.name] = 0;
      } else if (field.type === String) {
        entity[field.name] = "";
      } else if (field.type === Boolean) {
        entity[field.name] = false;
      } else {
        entity[field.name] = null;
      }
    } else {
      entity[field.name] = [];
    }
  }
  return entity;
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeLoaded: false,
      typeSelection: "Project"
    };

    this.setType = this.setType.bind(this);
    this.loadType = this.loadType.bind(this);
    this.setKey = this.setKey.bind(this);
    this.loadKey = this.loadKey.bind(this);
    this.updateField = this.updateField.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.save = this.save.bind(this);

    this.loadType();
  }

  setType(evt, thenKey) {
    this.setState(
      {
        typeSelection: evt.target.value,
        typeLoaded: false,
        keys: []
      },
      async () => {
        await this.loadType();
        if (thenKey) this.setKey({ target: { value: thenKey } });
      }
    );
  }

  async loadType() {
    let typeSelection = this.state.typeSelection;
    let keys = await getAll(typeSelection);
    if (this.state.typeLoaded || this.state.typeSelection !== typeSelection)
      return;
    this.setState(
      {
        keys,
        model: lookupModel(typeSelection).__model,
        typeLoaded: true,
        keySelection: "",
        keyLoaded: false
      },
      this.loadKey
    );
  }

  setKey(evt) {
    this.setState(
      {
        keySelection: evt.target.value,
        keyLoaded: false,
        entityWrapper: null
      },
      this.loadKey
    );
  }

  updateField(field) {
    return value => {
      if (value === undefined) return;
      let entity = this.state.entityWrapper[0];
      entity[field] = value;
      this.setState({
        entityWrapper: [entity]
      });
    };
  }

  saveField(field) {}

  async loadKey() {
    let keySelection = this.state.keySelection;
    let entity;
    if (keySelection === "") {
      entity = fillModel(lookupModel(this.state.typeSelection));
    } else {
      entity = await getGeneric(this.state.typeSelection, keySelection || null);
      if (this.state.keyLoaded || this.state.keySelection !== keySelection)
        return;
    }
    this.setState({
      entityWrapper: [entity],
      keyLoaded: true
    });
  }

  async deleteSelected() {
    await this.state.entityWrapper[0].remove();
    this.setType({ target: { value: this.state.typeSelection } });
  }

  async save() {
    let id = await this.state.entityWrapper[0].save();
    this.setType({ target: { value: this.state.typeSelection } }, id);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>DBEditor</div>
        <select value={this.state.typeSelection} onChange={this.setType}>
          <option>CodeScheme</option>
          <option>Note</option>
          <option>Project</option>
          <option>Session</option>
        </select>
        {this.state.typeLoaded && (
          <select value={this.state.keySelection} onChange={this.setKey}>
            <option value="">Add new</option>
            <optgroup
              label={`${this.state.keys.length} entr${
                this.state.keys.length === 1 ? "y" : "ies"
              }`}
            >
              {this.state.keys.map(key => (
                <option key={key}>{key}</option>
              ))}
            </optgroup>
          </select>
        )}
        {this.state.keySelection && (
          <button onClick={this.deleteSelected}>Delete</button>
        )}
        {this.state.entityWrapper && (
          <div className={styles.editor}>
            <div className={styles.entry}>
              id:{" "}
              {(this.state.entityWrapper && this.state.entityWrapper[0].id) ||
                "(unsaved)"}
            </div>
            {this.state.model.map(
              (field, i) =>
                field && (
                  <Field
                    key={i}
                    value={this.state.entityWrapper[0][field.name]}
                    field={field}
                    update={this.updateField(field.name)}
                  />
                )
            )}
            <button onClick={this.save}>Save</button>
          </div>
        )}
      </div>
    );
  }
}

export default Editor;
