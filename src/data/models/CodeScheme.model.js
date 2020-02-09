// CodeScheme.model.js
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

export const NAME = "CodeScheme";

export default [
  {
    name: "name",
    type: String,
  },
  {
    name: "description",
    type: String,
  },
  {
    name: "codes",
    type: String,
    repeated: true
  },
  {
    name: "shortCodes",
    type: String,
    repeated: true
  },
  {
    name: "descriptions",
    type: String,
    repeated: true
  },
  {
    name: "color",
    type: String,
    repeated: true
  }
];
