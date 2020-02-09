// database.js
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

export const DB_NAME = "design-awareness-local-store";
export const DB_VERSION = 1;

const _noop = () => {};

let dbOpen = false;
let dbPromise = null;
let dbOpenAttempted = false;

export const isOpen = () => dbOpen;
export const getDb = ({ blocked = _noop } = {}) => {
  if (!dbOpenAttempted) {
    dbOpenAttempted = true;
    dbPromise = new Promise((res, rej) => {
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onblocked = blocked;
      request.onerror = rej;
      request.onupgradeneeded = event => {
        console.log("Setting up database...");
        const db = event.target.result;
        db.createObjectStore("Project", { keyPath: "id" });
        db.createObjectStore("CodeScheme", { keyPath: "id" });
        /*const noteObjectStore = */ db.createObjectStore("Note", {
          keyPath: "id"
        });
        // noteObjectStore.createIndex("project", "project");
        /*const sessionObjectStore = */ db.createObjectStore("Session", {
          keyPath: "id"
        });
        // sessionObjectStore.createIndex("project", "project");
      };

      request.onsuccess = event => {
        dbOpen = true;
        const db = event.target.result;
        db.onversionchange = event => {
          db.close();
          console.log(
            "A new version of this page is ready. Please reload or close this tab!"
          );
        };
        res(db);
      };
    });
  }
  return dbPromise;
};

async function transaction(store, accessLevel) {
  const db = await getDb();
  const transaction = db.transaction([store], accessLevel);
  return {
    complete: new Promise((res, rej) => {
      transaction.oncomplete = res;
      transaction.onerror = rej;
    }),
    objectStore: transaction.objectStore(store)
  };
}

export async function add(store, data) {
  // console.log(data)
  const { complete, objectStore } = await transaction(store, "readwrite");
  objectStore.add(data);
  await complete;
}

export async function update(store, data) {
  const { complete, objectStore } = await transaction(store, "readwrite");
  objectStore.put(data);
  await complete;
}

export async function remove(store, id) {
  const { complete, objectStore } = await transaction(store, "readwrite");
  objectStore.delete(id);
  await complete;
}

export async function get(store, id) {
  if (id === null) return null;
  const { objectStore } = await transaction(store);
  const request = objectStore.get(id);
  return (await new Promise((res, rej) => {
    request.onerror = rej;
    request.onsuccess = res;
  })).target.result;
}

export function getAll(store) {
  return new Promise(async (res, rej) => {
    const db = await getDb();
    const objectStore = db.transaction(store).objectStore(store);
    const request = objectStore.getAllKeys();
    request.onerror = rej;
    request.onsuccess = function(evt) {
      res(evt.target.result);
    };
  });
}
