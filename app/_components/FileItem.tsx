import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import clsx from "clsx";
import { File } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import NoteObjectMenuActions from "./NoteObjectMenuActions";
import { useState } from "react";

interface FileItemProps {
  noteObject: NoteObject;
}

const FileItem = ({ noteObject }: FileItemProps) => {
  const router = useRouter();
  const { noteId } = useParams();
  const [contextMenuSelectedNoteId, setContextMenuSelectedNoteId] = useState<
    number | null
  >(null);

  const handleOpenFile = () => {
    router.push(noteObject.id.toString());
  };

  const isActive = noteId?.toString() === noteObject.id.toString();

  return (
    <NoteObjectMenuActions
      noteObject={noteObject}
      setContextMenuSelectedNoteId={setContextMenuSelectedNoteId}
    >
      <SidebarMenuButton
        key={noteObject.id}
        className={clsx(" pl-7 cursor-pointer hover:bg-gray-200", {
          "bg-black text-white hover:bg-black hover:text-white": isActive,
          "bg-gray-200":
            !isActive && contextMenuSelectedNoteId === noteObject.id,
        })}
        onClick={handleOpenFile}
      >
        <File />

        <textarea
          value={noteObject.title}
          className="resize-none border-none outline-none w-full max-w-full field-sizing-content pointer-events-none line-clamp-1"
          rows={1}
          disabled
        />
      </SidebarMenuButton>
    </NoteObjectMenuActions>
  );
};

export default FileItem;
