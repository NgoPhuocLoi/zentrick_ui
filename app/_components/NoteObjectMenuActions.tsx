import { deleteNoteObject } from "@/caller/note-object-caller";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { NoteObject, NoteObjectType } from "@/interface/note-object";
import { useAtom } from "jotai";
import { FilePlus, FolderPen, FolderPlus, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  noteObjectsChildrenAtom,
  rootNoteObjectsAtom,
} from "../_atoms/note-objects-atom";
import useCreateNote from "../_hooks/useCreateNote";
import { isFile, isFolder } from "../_utils/note-object-util";

interface NoteObjectMenuActionsProps {
  children: React.ReactNode;
  noteObject: NoteObject;
  setContextMenuSelectedNoteId: (id: number | null) => void;
  setRenamingFolder?: (isRenaming: boolean) => void;
}

const NoteObjectMenuActions = ({
  children,
  noteObject,
  setContextMenuSelectedNoteId,
  setRenamingFolder,
}: NoteObjectMenuActionsProps) => {
  const [, setRootNoteObjects] = useAtom(rootNoteObjectsAtom);
  const [, setNoteObjectChildren] = useAtom(noteObjectsChildrenAtom);
  const { handleCreateNewNoteObject } = useCreateNote();
  const { noteId } = useParams();
  const router = useRouter();

  const handleDeleteNoteObject = async () => {
    console.log("Deleting note object with id:", noteObject.id);
    const success = await deleteNoteObject(noteObject.id.toString());
    if (success) {
      if (noteObject.parent !== null) {
        const parentId = noteObject.parent.id;
        setNoteObjectChildren((prev) => {
          return {
            ...prev,
            [parentId]: prev[parentId].filter(
              (obj) => obj.id !== noteObject.id
            ),
          };
        });
      } else {
        setRootNoteObjects((prev) =>
          prev.filter((obj) => obj.id !== noteObject.id)
        );
        setNoteObjectChildren((prev) => {
          const newChildren = { ...prev };
          delete newChildren[noteObject.id];
          return newChildren;
        });
      }
      setContextMenuSelectedNoteId(null);
      console.log("Note object deleted successfully");
      if (
        isFile(noteObject) &&
        noteId?.toString() === noteObject.id.toString()
      ) {
        // If the deleted note was the current note, redirect to root or parent
        router.push("/");
      }
    }
  };

  return (
    <ContextMenu
      onOpenChange={(value) =>
        setContextMenuSelectedNoteId(value ? noteObject.id : null)
      }
      data-state="closed"
    >
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        {isFolder(noteObject) && (
          <>
            {" "}
            <ContextMenuItem
              onClick={() => handleCreateNewNoteObject(noteObject.id)}
            >
              <FilePlus />
              New note
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() =>
                handleCreateNewNoteObject(noteObject.id, NoteObjectType.FOLDER)
              }
            >
              <FolderPlus />
              New folder
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setRenamingFolder?.(true)}>
              <FolderPen />
              Rename
            </ContextMenuItem>
            <ContextMenuSeparator />{" "}
          </>
        )}

        {/* <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem> */}

        <ContextMenuItem
          //   inset
          onClick={handleDeleteNoteObject}
        >
          <Trash className="text-red-600" />
          <span className="text-red-600">Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default NoteObjectMenuActions;
