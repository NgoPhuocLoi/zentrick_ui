import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import { File } from "lucide-react";
import React from "react";

interface FileItemProps {
  noteObject: NoteObject;
}

const FileItem = ({ noteObject }: FileItemProps) => {
  return (
    <SidebarMenuButton
      key={noteObject.id}
      className="data-[active=true]:bg-transparent pl-7"
    >
      <File />
      {noteObject.title}
    </SidebarMenuButton>
  );
};

export default FileItem;
