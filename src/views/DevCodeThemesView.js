// DevCodeThemesView.js
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

import React, { Fragment, useState } from "react";
import styles from "./DevCodeThemesView.module.css";

import themes from "../presets/codeThemes";

function DevCodeThemesView() {
  const [darkText, setDarkText] = useState(false);

  return (
    <div
      className={styles.root + " " + (darkText ? styles.dark : "")}
      onClick={() => {
        setDarkText(!darkText);
      }}
    >
      <h1>Code themes</h1>
      {themes.map(theme => (
        <Fragment key={theme.name}>
          <h2>{theme.name}</h2>
          <ul className={styles.scheme}>
            {theme.colors.map((color, i) => (
              <li
                key={i}
                className={styles.swatch}
                style={{ backgroundColor: "#" + color }}
              >
                {"#" + color}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
}

export default DevCodeThemesView;
