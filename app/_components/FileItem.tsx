import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";

interface FileItemProps {
  noteObject: NoteObject;
}

const FileItem = ({ noteObject }: FileItemProps) => {
  const router = useRouter();
  const handleOpenFile = () => {
    router.push(noteObject.id.toString());
  };
  return (
    <SidebarMenuButton
      key={noteObject.id}
      className="data-[active=true]:bg-transparent pl-7 cursor-pointer"
      onClick={handleOpenFile}
    >
      <File />
      {noteObject.title}
    </SidebarMenuButton>
  );
};

export default FileItem;
