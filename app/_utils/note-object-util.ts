import { NoteObject, NoteObjectType } from "@/interface/note-object";

export const isFolder = (item: NoteObject) => {
  return item.type === NoteObjectType.FOLDER;
};
