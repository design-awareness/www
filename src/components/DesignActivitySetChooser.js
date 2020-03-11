// DesignActivitySetChooser.js
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

import React, { useState, useEffect, Fragment } from "react";
import styles from "./DesignActivitySetChooser.module.css";

import DesignActivitySetTile from "./DesignActivitySetTile";
import presetActivities from "../presets/activities";

import { getAll } from "../data/database";
import { CodeScheme } from "../data/models";

function DesignActivitySetChooser(props) {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [activities, setActivities] = useState(null);
  const [preselection, setPreselection] = useState(-1);

  useEffect(() => {
    if (!ready && !loading) {
      (async () => {
        setLoading(true);

        const codeSchemes = (await Promise.all(
          (await getAll("CodeScheme")).map(id => CodeScheme.getForId(id))
        )).sort((a, b) => {
          let aName = a.name.toUpperCase();
          let bName = b.name.toUpperCase();
          if (aName > bName) {
            return 1;
          } else if (aName < bName) {
            return -1;
          }
          return 0;
        });
        setActivities(codeSchemes);

        setReady(true);
        setLoading(false);
      })();
    }
  }, [ready, loading]);

  if (props.value) {
    return (
      <div className={styles.root}>
        <DesignActivitySetTile activitySet={props.value} large={true} />
        <button onClick={() => props.setValue(null)}>Change selection</button>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className={styles.root}>
        <p>Loading design activity sets…</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {activities.length > 0 && (
        <Fragment>
          <h3>Your activity sets</h3>
          <ul className={styles.activities}>
            {activities.map(activity => (
              <li key={activity.id} className={styles.activity}>
                <button onClick={() => setPreselection(activity.id)}>
                  <DesignActivitySetTile
                    activitySet={activity}
                    large={preselection === activity.id}
                  />
                </button>
                {preselection === activity.id && (
                  <div className={styles.actions}>
                    <button onClick={() => props.setValue(activity)}>
                      Use
                    </button>
                    <button>Customize</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Fragment>
      )}
      <h3>Templates</h3>
      <ul className={styles.activities}>
        {presetActivities.map((activity, i) => (
          <li key={i} className={styles.activity}>
            <button onClick={() => setPreselection(i)}>
              <DesignActivitySetTile
                activitySet={activity}
                large={preselection === i}
              />
            </button>
          </li>
        ))}
        <li className={styles.activity}>
          <button onClick={() => null}>
            <DesignActivitySetTile empty />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DesignActivitySetChooser;
