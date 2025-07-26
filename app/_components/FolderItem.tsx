"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import { useAtom } from "jotai";
import { ChevronRight, EllipsisVertical, Folder, Plus } from "lucide-react";
import { noteObjectsChildrenAtom } from "../_atoms/note-objects-atom";
import { useEffect, useState } from "react";
import NoteObjectItem from "./NoteObjectItem";
import clsx from "clsx";
import { getNoteObjects } from "@/caller/note-object-caller";

interface FolderItemProps {
  noteObject: NoteObject;
}

const FolderItem = ({ noteObject }: FolderItemProps) => {
  const [openFolder, setOpenFolder] = useState(false);
  const [chidlren, setChildren] = useAtom(noteObjectsChildrenAtom);

  useEffect(() => {
    const fetchChildren = async () => {
      if (chidlren[noteObject.id]) {
        console.log("Using cached children for:", noteObject.id);
        return;
      }
      const result = await getNoteObjects({
        parentId: noteObject.id,
        root: false,
      });

      console.log("Fetched children for:", noteObject.id, result);
      setChildren((prev) => {
        return {
          ...prev,
          [noteObject.id]: result,
        };
      });
    };
    if (openFolder) {
      fetchChildren();
    }
  }, [noteObject.id, openFolder, setChildren, chidlren]);

  return (
    <SidebarMenuItem>
      <Collapsible
        open={openFolder}
        onOpenChange={setOpenFolder}
        color="#f0f0f0f"
      >
        <CollapsibleTrigger asChild>
          <div className="group/folder-item flex items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer">
            <ChevronRight
              size={16}
              className={clsx({
                "rotate-90": openFolder,
              })}
            />
            <Folder size={16} />
            {noteObject.title}

            <div className="gap-1 ml-auto hidden group-hover/folder-item:flex">
              <div className="p-0.5 hover:bg-gray-300 rounded-full cursor-pointer">
                <Plus size={15} />
              </div>
              <div className="p-0.5 hover:bg-gray-300 rounded-full cursor-pointer">
                <EllipsisVertical size={15} />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {chidlren[noteObject.id]?.map((child) => (
              <NoteObjectItem key={child.id} noteObject={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default FolderItem;
