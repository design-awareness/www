// DesignActivitySetBuilder.js
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

import React, { useState, useEffect } from "react";
import styles from "./DesignActivitySetBuilder.module.css";
import { CodeScheme } from "../data/models";

import Button from "../components/Button";
import SingleActivityEditor from "../components/SingleActivityEditor";
import ButtonGroup from "../components/ButtonGroup";

function DesignActivitySetBuilder(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [codes, setCodes] = useState([]);
  const [shortCodes, setShortCodes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorIdxs, setColorIdxs] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [theme, setTheme] = useState(null);
  const [saving, setSaving] = useState(false);

  const { template } = props;

  if (template === null) props.discard();

  useEffect(() => {
    if (template !== null) {
      const len = template.codes ? template.codes.length : 0;
      setName(template.name || "");
      setDescription(template.description || "");
      setCodes(template.codes || []);
      setShortCodes(template.shortCodes || []);
      setColors(template.colors || []);
      setColorIdxs(new Array(len).fill(-1)); // needs a better way to get color vals from template
      setDescriptions(template.descriptions || []);
    }
  }, [template]);

  const save = async () => {
    setSaving(true);
    const cs = new CodeScheme();
    cs.name = name;
    cs.description = description;
    cs.codes = codes;
    cs.shortCodes = shortCodes;
    cs.colors = colors.map((clr, i) =>
      clr ? clr : theme ? theme[colorIdxs[i]] : "888888"
    );
    cs.descriptions = descriptions;
    await cs.save();
    props.save(cs);
  };

  return (
    <div className={styles.root}>
      <label>
        Name: <input onChange={evt => setName(evt.target.value)} value={name} />
      </label>
      <label>
        Description:{" "}
        <textarea
          onChange={evt => setDescription(evt.target.value)}
          value={description}
        />
      </label>

      <h2>Activities</h2>
      {codes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Code</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code, i) => {
              const shortCode = shortCodes[i];
              const color = colors[i];
              const colorIdx = colorIdxs[i];

              return (
                <SingleActivityEditor
                  key={i}
                  shortCode={shortCode}
                  setShortCode={sc => {
                    const newShortCodes = [...shortCodes];
                    newShortCodes[i] = sc;
                    setShortCodes(newShortCodes);
                  }}
                  code={code}
                  setCode={c => {
                    const newCodes = [...codes];
                    newCodes[i] = c;
                    setCodes(newCodes);
                  }}
                  remove={() => {
                    const newCodes = [...codes];
                    const newShortCodes = [...shortCodes];
                    const newColors = [...colors];
                    const newColorIdxs = [...colorIdxs];
                    const newDescriptions = [...descriptions];
                    newCodes.splice(i, 1);
                    newShortCodes.splice(i, 1);
                    newColors.splice(i, 1);
                    newColorIdxs.splice(i, 1);
                    newDescriptions.splice(i, 1);
                    setCodes(newCodes);
                    setShortCodes(newShortCodes);
                    setColors(newColors);
                    setColorIdxs(newColorIdxs);
                    setDescriptions(newDescriptions);
                  }}
                  color={
                    colorIdx === -1 ? color : theme ? theme[colorIdx] : null
                  }
                />
              );
            })}
          </tbody>
        </table>
      )}
      {codes.length < 10 && (
        <Button
          small
          type="secondary"
          onClick={() => {
            const newCodes = [...codes];
            const newShortCodes = [...shortCodes];
            const newColors = [...colors];
            const newColorIdxs = [...colorIdxs];
            const newDescriptions = [...descriptions];
            newCodes.push("");
            newShortCodes.push("");
            newColors.push(null);
            newColorIdxs.push(codes.length);
            newDescriptions.push(null);
            setCodes(newCodes);
            setShortCodes(newShortCodes);
            setColors(newColors);
            setColorIdxs(newColorIdxs);
            setDescriptions(newDescriptions);
          }}
        >
          Add activity
        </Button>
      )}

      <ButtonGroup>
        <Button type="secondary" onClick={props.discard} disabled={saving}>
          Cancel
        </Button>
        <Button disabled={saving || codes.length < 2} onClick={save}>
          Save
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default DesignActivitySetBuilder;
