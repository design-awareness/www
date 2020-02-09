// Session.model.js
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

export const NAME = "Session";

export default [
  {
    name: "label",
    type: String
  },
  {
    name: "description",
    type: String
  },
  {
    name: "starttime",
    type: Date
  },
  {
    name: "duration",
    type: Number
  },
  {
    name: "data",
    type: Array,
    repeated: true
    // rudimentary validation for the data field; isn't really enough
    // should be formatted as such:
    // [
    //   [ (code 1)
    //     [on, off], [on, off], [on, off], ...
    //   ],
    //   [ (code 2)
    //     [on, off], [on, off], [on, off], ...
    //   ],
    //   ...
    // ]
    //
    // should there be separate fields for all 10 code fields?
  },
  {
    name: "project",
    type: "Project"
  }
];
