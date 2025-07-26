import { ArrowUpNarrowWide, ChevronsDownUp } from "lucide-react";
import * as React from "react";

import { CreateFolderDialog } from "@/app/_components/CreateFolderDialog";
import { getNoteObjects } from "@/caller/note-object-caller";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import CreateNewNoteBtn from "./CreateNewNoteBtn";
import NoteObjectList from "./NoteObjectList";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const rootNoteObjects = await getNoteObjects({ root: true });
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-center">
            <CreateNewNoteBtn />
            <CreateFolderDialog />
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
              <NoteObjectList initialRootNoteObjects={rootNoteObjects} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
