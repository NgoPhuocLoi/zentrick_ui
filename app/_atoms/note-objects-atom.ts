import { NoteObject } from "@/interface/note-object";
import { atom } from "jotai";

export const noteObjectsChildrenAtom = atom<Record<number, NoteObject[]>>({});
