import { partialUpdateNoteObject } from "@/caller/note-object-caller";
import { NoteObject, NoteObjectType } from "@/interface/note-object";
import { Operation } from "fast-json-patch";

export const isFolder = (item: NoteObject) => {
  return item.type === NoteObjectType.FOLDER;
};

export const isFile = (item: NoteObject) => {
  return item.type === NoteObjectType.FILE;
};

export const updateNoteObjectTitle = (id: number, newTitle: string) => {
  const patchOperation: Operation = {
    op: "replace",
    path: "/title",
    value: newTitle,
  };
  return partialUpdateNoteObject(id.toString(), [patchOperation]);
};
