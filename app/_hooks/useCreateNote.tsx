import { createNoteObject } from "@/caller/note-object-caller";
import { NoteObjectType } from "@/interface/note-object";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  noteObjectsChildrenAtom,
  rootNoteObjectsAtom,
} from "../_atoms/note-objects-atom";
import { isFile } from "../_utils/note-object-util";

const useCreateNote = () => {
  const [, setRootNoteObjects] = useAtom(rootNoteObjectsAtom);
  const [, setNoteObjectChildren] = useAtom(noteObjectsChildrenAtom);
  const router = useRouter();
  const handleCreateNewNoteObject = async (
    parentId?: number,
    type: NoteObjectType = NoteObjectType.FILE
  ) => {
    const newNoteObject = await createNoteObject({
      title: "Untitled",
      content: "",
      type,
      parentId,
    });

    if (newNoteObject) {
      if (parentId) {
        setNoteObjectChildren((prev) => {
          return {
            ...prev,
            [parentId]: [...(prev[parentId] || []), newNoteObject],
          };
        });
      } else {
        setRootNoteObjects((prev) => [...prev, newNoteObject]);
      }

      if (isFile(newNoteObject)) {
        router.push(newNoteObject.id.toString());
      }
    } else {
      console.error("Failed to create new note object");
    }
  };

  return {
    handleCreateNewNoteObject,
  };
};

export default useCreateNote;
