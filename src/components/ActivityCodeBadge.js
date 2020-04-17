// ActivityCodeBadge.js
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
import styles from "./ActivityCodeBadge.module.css";

function ActivityCodeBadge(props) {
  let color = "000000";
  let label = "<none>";
  let className = styles.root;
  if (props.activity) {
    color = props.activity.color;
    label = props.activity.shortCode;
  }
  if (props.color) {
    color = props.color;
  }
  if (props.children) {
    label = props.children;
  }
  if (props.label) {
    label = props.label;
  }
  if (color.length === 6) {
    color = "#" + color;
  }
  if (props.wide) {
    className += " " + styles.wide;
  }
  return (
    <i className={className} style={{ backgroundColor: color }}>
      {label}
    </i>
  );
}

export default ActivityCodeBadge;

export function ActivityCodeBadgeTest() {
  const [custColor, setCustColor] = useState("#000000");
  const [custLabel, setCustLabel] = useState("cstm");
  const [custWide, setCustWide] = useState(false);
  return (
    <Fragment>
      <h2>Explicit appearance</h2>
      <pre>{`<ActivityCodeBadge color="24599A" label="std" />
<ActivityCodeBadge color="#F15B3D" label="wide" wide />`}</pre>
      <ActivityCodeBadge color="24599A" label="std" />
      <ActivityCodeBadge color="#F15B3D" label="wide" wide />

      <h2>Activity prop</h2>
      <pre>{`<ActivityCodeBadge activity={{color: "F89D57", shortCode: "obj"}} />`}</pre>
      <ActivityCodeBadge activity={{ color: "F89D57", shortCode: "obj" }} />

      <h2>Child as label</h2>
      <pre>{`<ActivityCodeBadge color="F1C258">inl</ActivityCodeBadge>`}</pre>
      <ActivityCodeBadge color="F1C258">inl</ActivityCodeBadge>

      <h2>Override order</h2>
      <pre>{`<ActivityCodeBadge
  activity={{ color: "FF0000", shortCode: "L1" }}
  color="006666"
  label="L2"
>L3</ActivityCodeBadge>`}</pre>
      <ActivityCodeBadge
        activity={{ color: "FF0000", shortCode: "L1" }}
        color="006666"
        label="L2"
      >
        L3
      </ActivityCodeBadge>

      <h2>Custom</h2>
      <pre>
        {`<ActivityCodeBadge color={`}
        <input
          type="color"
          value={custColor}
          onChange={(e) => setCustColor(e.target.value)}
        />
        {`} label={`}
        <input
          type="text"
          value={custLabel}
          onChange={(e) => setCustLabel(e.target.value)}
        />
        {`} wide={`}
        <input
          type="checkbox"
          checked={custWide}
          onChange={(e) => setCustWide(e.target.checked)}
        />
        {`} />`}
      </pre>
      <ActivityCodeBadge color={custColor} label={custLabel} wide={custWide} />
    </Fragment>
  );
}
ActivityCodeBadgeTest.slug = "ActivityCodeBadge";
