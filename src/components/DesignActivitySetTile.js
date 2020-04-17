// DesignActivitySetTile.js
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
import styles from "./DesignActivitySetTile.module.css";
import ActivityCodeBadge from "./ActivityCodeBadge";

function DesignActivitySetTile(props) {
  if (props.empty) {
    return (
      <div className={styles.root}>
        <h4>Start from scratch</h4>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <h4>{props.activitySet.name}</h4>
      <p>{props.activitySet.description}</p>
      <ul className={styles.symbols}>
        {props.activitySet.shortCodes.map((code, i) => (
          <ActivityCodeBadge
            key={code}
            label={code}
            color={props.activitySet.colors[i]}
          />
        ))}
      </ul>
    </div>
  );
}

export default DesignActivitySetTile;
