"use client";
import { useAtom } from "jotai";
import { SquarePen } from "lucide-react";
import React from "react";
import { rootNoteObjectsAtom } from "../_atoms/note-objects-atom";
import { createNoteObject } from "@/caller/note-object-caller";
import { NoteObjectType } from "@/interface/note-object";
import { useRouter } from "next/navigation";

const CreateNewNoteBtn = () => {
  const router = useRouter();
  const [, setRootNoteObjects] = useAtom(rootNoteObjectsAtom);
  const handleCreateNewNote = async () => {
    const newNoteObject = await createNoteObject({
      title: "Untitled",
      content: "",
      type: NoteObjectType.FILE,
    });

    if (newNoteObject) {
      setRootNoteObjects((prev) => [...prev, newNoteObject]);
      router.push(newNoteObject.id.toString());
    } else {
      console.error("Failed to create new note object");
    }
  };

  return (
    <div
      className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
      onClick={handleCreateNewNote}
    >
      <SquarePen size={20} />
    </div>
  );
};

export default CreateNewNoteBtn;
