import { FileContent } from "@/interface/note-object";
import { atom } from "jotai";

export const activeFileContentAtom = atom<FileContent | null>(null);
