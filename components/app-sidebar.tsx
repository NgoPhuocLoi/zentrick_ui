import {
  ArrowUpNarrowWide,
  ChevronsDownUp,
  FolderPlus,
  SquarePen,
} from "lucide-react";
import * as React from "react";

import NoteObjectItem from "@/app/_components/NoteObjectItem";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";

interface IAppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  rootNoteObjects: NoteObject[];
}

export function AppSidebar({ rootNoteObjects, ...props }: IAppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-center">
            <div className="py-1 px-2 hover:bg-gray-200 rounded-md">
              <SquarePen size={20} />
            </div>
            <div className="py-1 px-2 hover:bg-gray-200 rounded-md">
              <FolderPlus size={20} />
            </div>
            <div className="py-1 px-2 hover:bg-gray-200 rounded-md">
              <ArrowUpNarrowWide size={20} />
            </div>
            <div className="py-1 px-2 hover:bg-gray-200 rounded-md">
              <ChevronsDownUp size={20} />
            </div>
          </div>
          {/* <SidebarGroupLabel>Files</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="pt-4">
              {rootNoteObjects.map((noteObject) => (
                <NoteObjectItem key={noteObject.id} noteObject={noteObject} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
