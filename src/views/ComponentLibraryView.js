// ComponentLibraryView.js
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
import { Switch, Route, Link } from "react-router-dom";
import styles from "./ComponentLibraryView.module.css";

import { ActivityCodeBadgeTest } from "../components/ActivityCodeBadge";
import { ButtonTest } from "../components/Button";
import { ButtonGroupTest } from "../components/ButtonGroup";
import { HierarchicalTextBlocksTest } from "../components/HierarchicalTextBlocks";

const components = [
  ActivityCodeBadgeTest,
  ButtonTest,
  ButtonGroupTest,
  HierarchicalTextBlocksTest,
].sort((l, r) => (l.slug > r.slug) * 2 - 1);

function ComponentLibraryView(props) {
  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path="/dev/component-library/">
          <Link to="/">Home</Link>
          <ul>
            {components.map(({ slug }) => (
              <li key={slug}>
                <Link to={"/dev/component-library/" + slug}>{slug}</Link>
              </li>
            ))}
          </ul>
        </Route>
        <Route>
          <Link to="/dev/component-library/">Component Library</Link>
          {components.map((Component) => (
            <Route
              exact
              path={"/dev/component-library/" + Component.slug}
              key={Component.slug}
            >
              <h1>{Component.slug}</h1>
              <div className={styles.componentPage}>
                <Component />
              </div>
            </Route>
          ))}
        </Route>
      </Switch>
    </div>
  );
}

export default ComponentLibraryView;
