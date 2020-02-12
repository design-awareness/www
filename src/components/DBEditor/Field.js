// Field.js
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

import React from "react";
import { UnloadedModel } from "../../data/DBModel";
import styles from "./Field.module.css";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let input = false;
    let _this = this;
    if (this.props.field.repeated) {
      if (!this.props.value) {
        setTimeout(this.props.update, []);
        input = null;
      } else {
        const descriptor = { type: this.props.field.type };
        input = (
          <div className={styles.group}>
            {this.props.value.map((val, i) => (
              <div className={styles.groupitem} key={i}>
                <Field
                  field={descriptor}
                  value={this.props.value[i]}
                  update={val => {
                    let newval = [...this.props.value];
                    newval.splice(i, 1, val);
                    this.props.update(newval);
                  }}
                />
                <button
                  onClick={() => {
                    let newval = [...this.props.value];
                    newval.splice(i, 1);
                    setTimeout(() => this.props.update(newval));
                  }}
                >
                  remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                let newval = [...this.props.value];
                newval.push(
                  this.props.field.type === Boolean
                    ? false
                    : this.props.field.type === Number
                    ? 0
                    : this.props.field.type === Date
                    ? new Date()
                    : this.props.field.type === String
                    ? ""
                    : null
                );
                this.props.update(newval);
              }}
            >
              add
            </button>
          </div>
        );
      }
    } else {
      if (this.props.field.type === Boolean) {
        input = (
          <input
            type="checkbox"
            checked={this.props.value || false}
            onChange={evt => _this.props.update(evt.target.checked)}
          />
        );
      } else if (this.props.field.type === String) {
        input = (
          <input
            type="text"
            value={this.props.value || ""}
            onChange={evt => _this.props.update(evt.target.value)}
          />
        );
      } else if (this.props.field.type === Number) {
        input = (
          <input
            type="number"
            value={this.props.value || 0}
            onChange={evt => _this.props.update(parseFloat(evt.target.value))}
          />
        );
      } else if (this.props.field.type === Date) {
        input = (
          <input
            type="datetime-local"
            value={(this.props.value ? this.props.value : new Date())
              .toISOString()
              .substr(0, 16)}
            onChange={evt => {
              let d = new Date(evt.target.value + "Z");
              if (Number.isNaN(d.getTime())) {
                d = new Date();
              }
              _this.props.update(d);
            }}
          />
        );
      } else {
        input = (
          <input
            className={styles.ref}
            type="text"
            value={(this.props.value ? this.props.value.id : "") || ""}
            onChange={evt => {
              if (evt.target.value) {
                _this.props.update(new UnloadedModel(evt.target.value));
              } else {
                _this.props.update(null);
              }
            }}
          />
        );
      }
    }

    return (
      <div className={styles.root}>
        <label>
          {this.props.field.name}
          {this.props.field.name && ": "}
          {input}
        </label>
      </div>
    );
  }
}

export default Field;
