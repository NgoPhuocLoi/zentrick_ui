import { NoteObject } from "@/interface/note-object";
import React from "react";
import { isFolder } from "../_utils/note-object-util";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";

const NoteObjectItem = ({ noteObject }: { noteObject: NoteObject }) => {
  return isFolder(noteObject) ? (
    <FolderItem noteObject={noteObject} />
  ) : (
    <FileItem noteObject={noteObject} />
  );
};

export default NoteObjectItem;
