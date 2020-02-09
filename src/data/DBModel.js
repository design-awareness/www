// DBModel.js
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

// Dynamically generates classes for database-backed models

import idgen from "./idgen";
import { get, update, add, remove } from "./database";

class GenericModel {}

export class UnloadedModel extends GenericModel {
  #id;
  #parent;
  #path;
  #index;

  constructor(id, parent, path, index) {
    super();
    this.#id = id;
    this.#parent = parent;
    this.#path = path;
    this.#index = index;
  }

  get id() {
    return this.#id;
  }

  // pass through async
  /*async*/ resolve() {
    return /*await*/ this.#parent.resolve(this.#path, this.#index);
  }
}

export const modelLookup = {};

const validatePass = v => true;
const validateType = t => v => v === null || v.constructor === t;
const validateModel = n => v =>
  v === null || (v instanceof GenericModel && v.constructor.name === n) || v instanceof UnloadedModel;
const validateRepeated = f => v => Array.isArray(v) && v.every(f);

export default function DBModel(name, properties) {
  const propLookup = {};

  for (let prop of properties) {
    propLookup[prop.name] = {
      ...prop,
      model: typeof prop.type === "string"
    }
  }

  const Model = class extends GenericModel {
    #data = {};
    #id = null;
    #dirty = false;
    #saved = false;
    #synced = false;

    static get propLookup() {
      return propLookup
    }

    constructor(data) {
      super();
      if (data) {
        this.#id = data.id;
        this.#saved = true;
        this.#data = this.unpack(data);
      }
      for (let prop of properties) {
        let validate = validatePass;
        if (prop.type) {
          if (typeof prop.type === "string") {
            validate = validateModel(prop.type);
          } else {
            validate = validateType(prop.type);
          }
        }
        if (prop.repeated) {
          validate = validateRepeated(validate);
        }
        Object.defineProperty(this, prop.name, {
          get() {
            return this.#data[prop.name];
          },
          set(v) {
            if (this.#data[prop.name] !== v) {
              if (!validate(v)) {
                console.log("got", v)
                throw new TypeError("Incorrect type for " + prop.name);
              }
              this.#data[prop.name] = v;
              this.#dirty = true;
            }
          }
        });
        if (this.#id === null) {
          if (prop.default !== undefined) {
            this[prop.name] = prop.default;
          } else if (prop.repeated) {
            this[prop.name] = [];
          }
        }
      }
    }

    merge(prop, val) {
      let newVal = { ...this.#data[prop], ...val };
      this[prop] = newVal; // apply the usual validation
    }

    get id() {
      return this.#id;
    }

    valueOf() {
      return this.#id;
    }

    async save(force = false) {
      // TODO save needs to squash other models down to model ids
      if (force || this.#dirty || !this.#saved) {
        if (this.#id) {
          await update(name, this.pack());
        } else {
          let id = idgen();
          await add(name, this.pack(id));
          this.#saved = true;
          this.#id = id;
        }
        this.#dirty = false;
      }
      return this.#id;
    }

    pack(id = this.#id) {
      const data = { id };
      for (let { name, model, repeated } of Object.values(propLookup)) {
        if (model) {
          if (repeated) {
            data[name] = this.#data[name].map((obj) => obj ? obj.id : null);
          } else {
            data[name] = (this.#data[name] || {id:null}).id;
          }
        } else {
          data[name] = this.#data[name];
        }
      }
      return data;
    }

    unpack(data) {
      const unpacked = {};
      for (let { name, model, repeated } of Object.values(propLookup)) {
        if (model) {
          if (repeated) {
            unpacked[name] = data[name].map(
              (id, i) => new UnloadedModel(id, this, name, i)
            );
          } else {
            unpacked[name] = new UnloadedModel(data[name], this, name);
          }
        } else {
          unpacked[name] = data[name];
        }
      }
      return unpacked;
    }

    async resolve(path, index) {
      let ref = this[path];
      if (index !== undefined) {
        ref = ref[index];
      }
      if (ref === null) return null;
      if (!(ref instanceof UnloadedModel)) return ref;
      let val = await modelLookup[propLookup[path].type].getForId(ref.id);
      // if (recursive) await val.resolveAll();
      if (index !== undefined) {
        this[path][ref] = val;
      } else {
        this[path] = val;
      }
      return val;
    }

    async resolveAll() {
      const lookups = [];
      for (let { name, model, repeated } of Object.values(propLookup)) {
        if (model) {
          if (repeated) {
            for (let i = 0; i <= this[name].length; i++) {
              lookups.push(this.resolve(name, i));
            }
          } else {
            lookups.push(this.resolve(name));
          }
        }
      }
      await Promise.all(lookups);
    }

    async remove() {
      await remove(name, this.#id);
      this.#id = null;
      this.#saved = false;
    }

    static async getForId(id) {
      const data = await get(name, id);
      if (!data) return null;
      // resolve using the real constructor
      // for the subtype
      return new this.__constructor(data);
    }
  };

  Object.defineProperty(Model, "name", {
    value: name
  });

  return Model;
}

export function lookupModel(type) {
  return modelLookup[type]
}

// async passthrough
export function getGeneric(type, id) {
  return modelLookup[type].getForId(id)
}