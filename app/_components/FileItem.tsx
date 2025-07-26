import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import clsx from "clsx";
import { useAtom } from "jotai";
import { File } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { activeObjectTitleAtom } from "../_atoms/note-objects-atom";

interface FileItemProps {
  noteObject: NoteObject;
}

const FileItem = ({ noteObject }: FileItemProps) => {
  const router = useRouter();
  const { noteId } = useParams();
  const [activeObjectTitle, setActiveObjectTitle] = useAtom(
    activeObjectTitleAtom
  );

  const handleOpenFile = () => {
    setActiveObjectTitle(noteObject.title);
    router.push(noteObject.id.toString());
  };

  const isActive = noteId?.toString() === noteObject.id.toString();

  const fileTitle = useMemo(() => {
    if (isActive && activeObjectTitle) {
      return activeObjectTitle;
    }
    return noteObject.title;
  }, [activeObjectTitle, isActive, noteObject.title]);

  return (
    <SidebarMenuButton
      key={noteObject.id}
      className={clsx(" pl-7 cursor-pointer hover:bg-gray-200", {
        "bg-black text-white hover:bg-black hover:text-white": isActive,
      })}
      onClick={handleOpenFile}
    >
      <File />
      {fileTitle}
    </SidebarMenuButton>
  );
};

export default FileItem;
