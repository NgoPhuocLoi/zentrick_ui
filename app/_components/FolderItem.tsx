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
import { useEffect, useRef, useState } from "react";
import { noteObjectsChildrenAtom } from "../_atoms/note-objects-atom";
import NoteObjectItem from "./NoteObjectItem";
import NoteObjectMenuActions from "./NoteObjectMenuActions";
import { updateNoteObjectTitle } from "../_utils/note-object-util";

interface FolderItemProps {
  noteObject: NoteObject;
}

const FolderItem = ({ noteObject }: FolderItemProps) => {
  const [openFolder, setOpenFolder] = useState(false);
  const [chidlren, setChildren] = useAtom(noteObjectsChildrenAtom);
  const [contextMenuSelectedNoteId, setContextMenuSelectedNoteId] = useState<
    number | null
  >(null);
  const [folderName, setFolderName] = useState(noteObject.title);
  const [isRenaming, setIsRenaming] = useState(false);
  const folderNameInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (isRenaming && folderNameInputRef.current) {
        folderNameInputRef.current.focus();
        folderNameInputRef.current.select();
      }
    }, 100);
  }, [isRenaming]);

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

  const saveNewFolderName = async () => {
    if (!folderName.trim()) {
      setFolderName(noteObject.title); // Reset to original name if empty
    }
    await updateNoteObjectTitle(noteObject.id, folderName);
    setIsRenaming(false);
  };

  const handleKeydown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await saveNewFolderName();
      setIsRenaming(false);
    } else if (e.key === "Escape") {
      setIsRenaming(false);
      setFolderName(noteObject.title); // Reset to original name
    }
  };

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
          setRenamingFolder={setIsRenaming}
        >
          <CollapsibleTrigger asChild>
            <div
              className={clsx(
                "relative group/folder-item flex items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer",
                {
                  "bg-gray-200": noteObject.id === contextMenuSelectedNoteId,
                  border: isRenaming,
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
              {isRenaming ? (
                <textarea
                  onClick={(e) => e.stopPropagation()}
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="flex-1 resize-none border-none outline-none text-ellipsis overflow-hidden"
                  rows={1}
                  onBlur={saveNewFolderName}
                  ref={folderNameInputRef}
                  onKeyDown={handleKeydown}
                />
              ) : (
                <span className="line-clamp-1">{folderName}</span>
              )}
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
