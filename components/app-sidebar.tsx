import {
  ArrowUpNarrowWide,
  ChevronRight,
  ChevronsDownUp,
  Folder as FolderIcon,
  FolderPlus,
  File as FileIcon,
  SquarePen,
} from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Folder, SubFolder } from "@/interface/folder";

interface IAppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  rootLevelFolders: Folder[];
}

export function AppSidebar({ rootLevelFolders, ...props }: IAppSidebarProps) {
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
            <SidebarMenu>
              {rootLevelFolders.map((folder) => (
                <FolderItem key={folder.id} folder={folder} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

const isFolder = (item: Folder | SubFolder): item is Folder => {
  return (item as Folder).subFolders !== undefined;
};

function FolderItem({ folder }: { folder: Folder | SubFolder }) {
  // const [name, ...items] = Array.isArray(item) ? item : [item];

  // if (!items.length) {
  //   return (
  // <SidebarMenuButton
  //   isActive={name === "button.tsx"}
  //   className="data-[active=true]:bg-transparent"
  // >
  //   <File />
  //   {name}
  // </SidebarMenuButton>
  //   );
  // }

  return (
    <SidebarMenuItem>
      <Collapsible
        color="#f0f0f0f"
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <FolderIcon />
            {folder.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {isFolder(folder) &&
              folder.subFolders.map((subFolder) => (
                <FolderItem key={subFolder.id} folder={subFolder} />
              ))}
            {isFolder(folder) &&
              folder.files.map((file) => (
                <SidebarMenuButton
                  key={file.id}
                  isActive={file.id === 4}
                  className="data-[active=true]:bg-transparent"
                >
                  <FileIcon />
                  {file.title}
                </SidebarMenuButton>
              ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
