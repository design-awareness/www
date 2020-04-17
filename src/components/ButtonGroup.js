// ButtonGroup.js
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

import React, { Fragment } from "react";
import styles from "./ButtonGroup.module.css";
import Button from "./Button";

function ButtonGroup(props) {
  let className = styles.root;
  if (props.align === "left") {
    className += " " + styles.align_left;
  } else if (props.align === "center") {
    className += " " + styles.align_center;
  } else {
    className += " " + styles.align_right;
  }

  return <div className={className}>{props.children}</div>;
}

export default ButtonGroup;

export function ButtonGroupTest() {
  return (
    <Fragment>
      <pre>{`<ButtonGroup align="left|center|right">
  <Button ... /> ...
</ButtonGroup>`}</pre>

      <h2>Left</h2>
      <ButtonGroup align="left">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>

      <h2>Center</h2>
      <ButtonGroup align="center">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>

      <h2>Right</h2>
      <ButtonGroup align="right">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    </Fragment>
  );
}
ButtonGroupTest.slug = "ButtonGroup";
