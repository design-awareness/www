// SingleActivityEditor.js
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
import styles from "./SingleActivityEditor.module.css";

function SingleActivityEditor(props) {
  return (
    <tr className={styles.root}>
      <td>
        <button onClick={props.remove}>x</button>
      </td>
      <td>
        <input
          value={props.shortCode}
          onChange={e => props.setShortCode(e.target.value)}
        />
      </td>
      <td>
        <input
          value={props.code}
          onChange={e => props.setCode(e.target.value)}
        />
      </td>
      <td>
        <div
          className={styles.swatch}
          style={{ backgroundColor: props.color ? "#" + props.color : "grey" }}
        />
      </td>
    </tr>
  );
}

export default SingleActivityEditor;
