"use client";
import { NoteObject } from "@/interface/note-object";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { rootNoteObjectsAtom } from "../_atoms/note-objects-atom";
import NoteObjectItem from "./NoteObjectItem";

interface NoteObjectListProps {
  initialRootNoteObjects: NoteObject[];
}

const NoteObjectList = ({ initialRootNoteObjects }: NoteObjectListProps) => {
  useHydrateAtoms([[rootNoteObjectsAtom, initialRootNoteObjects]]);
  const [rootNoteObjects] = useAtom(rootNoteObjectsAtom);
  console.log("Rendering NoteObjectList with items:", rootNoteObjects);
  return rootNoteObjects.map((noteObject) => (
    <NoteObjectItem key={noteObject.id} noteObject={noteObject} />
  ));
};

export default NoteObjectList;
