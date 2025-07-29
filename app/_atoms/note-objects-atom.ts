import { NoteObject } from "@/interface/note-object";
import { atom } from "jotai";

export const rootNoteObjectsAtom = atom<NoteObject[]>([]);
export const flatNoteObjectsAtom = atom<NoteObject[]>([]);
export const noteObjectsChildrenAtom = atom<Record<number, NoteObject[]>>({});
export const activeObjectTitleAtom = atom<string>("");
