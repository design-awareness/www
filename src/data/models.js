// models.js
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

import DBModel, { modelLookup } from "./DBModel";

import CodeSchemeModel from "./models/CodeScheme.model";
import NoteModel from "./models/Note.model";
import ProjectModel from "./models/Project.model";
import SessionModel from "./models/Session.model";

export class CodeScheme extends DBModel("CodeScheme", CodeSchemeModel) {
  static __constructor = CodeScheme;
  static __model = CodeSchemeModel;
}

export class Note extends DBModel("Note", NoteModel) {
  static __constructor = Note;
  static __model = NoteModel;
}

export class Project extends DBModel("Project", ProjectModel) {
  static __constructor = Project;
  static __model = ProjectModel;

  setName(d) {
    this.name = d;
  }
}

export class Session extends DBModel("Session", SessionModel) {
  static __constructor = Session;
  static __model = SessionModel;
}

modelLookup["CodeScheme"] = CodeScheme;
modelLookup["Note"] = Note;
modelLookup["Project"] = Project;
modelLookup["Session"] = Session;