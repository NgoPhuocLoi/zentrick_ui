import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import clsx from "clsx";
import { File } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface FileItemProps {
  noteObject: NoteObject;
}

const FileItem = ({ noteObject }: FileItemProps) => {
  const router = useRouter();
  const { noteId } = useParams();

  const handleOpenFile = () => {
    router.push(noteObject.id.toString());
  };

  const isActive = noteId?.toString() === noteObject.id.toString();

  return (
    <SidebarMenuButton
      key={noteObject.id}
      className={clsx(" pl-7 cursor-pointer hover:bg-gray-200", {
        "bg-black text-white hover:bg-black hover:text-white": isActive,
      })}
      onClick={handleOpenFile}
    >
      <File />
      {noteObject.title}
    </SidebarMenuButton>
  );
};

export default FileItem;
