// Button.js
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
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button(props) {
  let className = styles.root;
  if (props.small) {
    className += " " + styles.small;
  }
  if (props.color === "danger") {
    className += " " + styles.color_danger;
  } else {
    className += " " + styles.color_brand;
  }

  if (props.type === "tertiary") {
    className += " " + styles.type_text;
  } else if (props.type === "secondary") {
    className += " " + styles.type_secondary;
  } else {
    className += " " + styles.type_primary;
  }

  if (props.linkTo) {
    return (
      <Link to={props.linkTo} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;

export function ButtonTest() {
  const [type, setType] = useState("primary");
  const [color, setColor] = useState("brand");
  const [small, setSmall] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("label");

  function clickHandler() {
    window.alert("Button clicked!");
  }

  return (
    <div className={styles.demo}>
      <h2>Normal</h2>
      <Button type="primary" onClick={clickHandler}>
        Primary
      </Button>
      <Button type="secondary" onClick={clickHandler}>
        Secondary
      </Button>

      <h2>Small</h2>
      <Button small type="primary" onClick={clickHandler}>
        Primary
      </Button>
      <Button small type="secondary" onClick={clickHandler}>
        Secondary
      </Button>

      <h2>Disabled</h2>
      <Button disabled type="primary" onClick={clickHandler}>
        Primary
      </Button>
      <Button disabled type="secondary" onClick={clickHandler}>
        Secondary
      </Button>
      <Button small disabled type="primary" onClick={clickHandler}>
        Primary small
      </Button>
      <Button small disabled type="secondary" onClick={clickHandler}>
        Secondary small
      </Button>

      <h2>Danger</h2>
      <Button color="danger" type="primary" onClick={clickHandler}>
        Primary
      </Button>
      <Button color="danger" type="secondary" onClick={clickHandler}>
        Secondary
      </Button>
      <Button small color="danger" type="primary" onClick={clickHandler}>
        Primary small
      </Button>
      <Button small color="danger" type="secondary" onClick={clickHandler}>
        Secondary small
      </Button>

      <h2>Custom</h2>
      <pre>
        {`<Button
  onClick={...}
  type={`}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="primary">primary (default)</option>
          <option value="secondary">secondary</option>
          <option value="tertiary">tertiary</option>
        </select>
        {`}
  color={`}
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="brand">brand (default)</option>
          <option value="danger">danger</option>
        </select>
        {`}
  small={`}
        <input
          type="checkbox"
          checked={small}
          onChange={(e) => setSmall(e.target.checked)}
        />
        {`}
  disabled={`}
        <input
          type="checkbox"
          checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />
        {`}
>
  {`}
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        {`}
</Button>`}
      </pre>
      <Button
        onClick={clickHandler}
        type={type}
        color={color}
        small={small}
        disabled={disabled}
      >
        {label}
      </Button>

      <h2>Button link</h2>
      <pre>{`<Button linkTo="path/to/page" ... />`}</pre>
      <Button linkTo="#">Link button</Button>
    </div>
  );
}
ButtonTest.slug = "Button";
