import {
  noteObjectsChildrenAtom,
  rootNoteObjectsAtom,
} from "@/app/_atoms/note-objects-atom";
import { updateNoteObjectTitle } from "@/app/_utils/note-object-util";
import useDebounce from "@/hooks/use-debounce";
import { FileContent, NoteObject } from "@/interface/note-object";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

interface FileTitleProps {
  fileContent: FileContent;
}

const FileTitle = ({ fileContent }: FileTitleProps) => {
  const [title, setTitle] = useState(fileContent.noteObject.title);
  const [, setRootNoteObjects] = useAtom(rootNoteObjectsAtom);
  const [, setNoteObjectsChildren] = useAtom(noteObjectsChildrenAtom);
  const debouncedTitle = useDebounce(title, 500) as string;

  const updateNoteTitleInList = (
    noteObjects: NoteObject[],
    id: number,
    updatedTitle: string
  ) => {
    return noteObjects.map((obj) =>
      obj.id === id ? { ...obj, title: updatedTitle } : obj
    );
  };

  const handleTitleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTitle = e.target.value.trim();

    const parent = fileContent.noteObject.parent;

    if (parent) {
      setNoteObjectsChildren((prev) => ({
        ...prev,
        [parent.id]: updateNoteTitleInList(
          prev[parent.id] || [],
          fileContent.noteObject.id,
          newTitle
        ),
      }));
    } else {
      // setRootNoteObjects((prev) =>
      //   updateNoteTitleInList(prev, fileContent.noteObject.id, newTitle)
      // );
      setRootNoteObjects((prev) =>
        prev.map((obj) =>
          obj.id === fileContent.noteObject.id
            ? { ...obj, title: newTitle }
            : obj
        )
      );
    }
    setTitle(newTitle);
  };

  useEffect(() => {
    if (debouncedTitle && debouncedTitle !== fileContent.noteObject.title) {
      console.log("Updating title:", debouncedTitle);
      updateNoteObjectTitle(fileContent.noteObject.id, debouncedTitle);
    }
  }, [debouncedTitle, fileContent.noteObject.id, fileContent.noteObject.title]);
  return (
    <div className=" text-[28px] max-w-full">
      <textarea
        defaultValue={fileContent.noteObject.title}
        onChange={handleTitleChange}
        rows={1}
        className="resize-none border-none outline-none w-full max-w-full field-sizing-content"
        style={{
          lineHeight: "normal",
        }}
      />
    </div>
  );
};

export default FileTitle;
