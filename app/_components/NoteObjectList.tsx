"use client";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { rootNoteObjectsAtom } from "../_atoms/note-objects-atom";
import NoteObjectItem from "./NoteObjectItem";
import { NoteObject } from "@/interface/note-object";

interface NoteObjectListProps {
  initialRootNoteObjects: NoteObject[];
}

const NoteObjectList = ({ initialRootNoteObjects }: NoteObjectListProps) => {
  useHydrateAtoms([[rootNoteObjectsAtom, initialRootNoteObjects]]);
  const [rootNoteObjects] = useAtom(rootNoteObjectsAtom);
  return rootNoteObjects.map((noteObject) => (
    <NoteObjectItem key={noteObject.id} noteObject={noteObject} />
  ));
};

export default NoteObjectList;
