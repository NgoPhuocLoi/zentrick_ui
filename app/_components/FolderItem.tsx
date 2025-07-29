"use client";
import { getNoteObjects } from "@/caller/note-object-caller";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar";
import { NoteObject } from "@/interface/note-object";
import clsx from "clsx";
import { useAtom } from "jotai";
import { ChevronRight, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { noteObjectsChildrenAtom } from "../_atoms/note-objects-atom";
import NoteObjectItem from "./NoteObjectItem";
import NoteObjectMenuActions from "./NoteObjectMenuActions";

interface FolderItemProps {
  noteObject: NoteObject;
}

const FolderItem = ({ noteObject }: FolderItemProps) => {
  const [openFolder, setOpenFolder] = useState(false);
  const [chidlren, setChildren] = useAtom(noteObjectsChildrenAtom);
  const [contextMenuSelectedNoteId, setContextMenuSelectedNoteId] = useState<
    number | null
  >(null);

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
        <NoteObjectMenuActions
          noteObject={noteObject}
          setContextMenuSelectedNoteId={setContextMenuSelectedNoteId}
        >
          <CollapsibleTrigger asChild>
            <div
              className={clsx(
                "relative group/folder-item flex items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer",
                {
                  "bg-gray-200":
                    openFolder || noteObject.id === contextMenuSelectedNoteId,
                }
              )}
            >
              <ChevronRight
                size={16}
                className={clsx("flex-shrink-0", {
                  "rotate-90": openFolder,
                })}
              />
              <Folder className="flex-shrink-0" size={16} />
              <span className="line-clamp-1">{noteObject.title}</span>
            </div>
          </CollapsibleTrigger>
        </NoteObjectMenuActions>
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
