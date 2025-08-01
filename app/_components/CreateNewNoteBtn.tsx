"use client";
import { SquarePen } from "lucide-react";
import useCreateNote from "../_hooks/useCreateNote";

const CreateNewNoteBtn = () => {
  const { handleCreateNewNoteObject } = useCreateNote();

  return (
    <div
      className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
      onClick={() => handleCreateNewNoteObject()}
    >
      <SquarePen size={20} />
    </div>
  );
};

export default CreateNewNoteBtn;
