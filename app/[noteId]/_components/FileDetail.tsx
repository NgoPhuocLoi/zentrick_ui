"use client";
import { activeObjectTitleAtom } from "@/app/_atoms/note-objects-atom";
import MarkdownViewer from "@/app/_components/MarkdownViewer";
import { partialUpdateNoteObject } from "@/caller/note-object-caller";
import useDebounce from "@/hooks/use-debounce";
import { FileContent } from "@/interface/note-object";
import { Operation } from "fast-json-patch";
import { useAtom } from "jotai";
import { BookOpen, Ellipsis, PenLine } from "lucide-react";
import { useEffect, useState } from "react";

interface FileDetailProps {
  fileContent: FileContent;
}

const FileDetail = ({ fileContent }: FileDetailProps) => {
  const [activeObjectTitle, setActiveObjectTitle] = useAtom(
    activeObjectTitleAtom
  );
  const debouncedTitle = useDebounce(activeObjectTitle, 500);
  const [mode, setMode] = useState<"view" | "edit">("edit");

  const handleModeChange = () => {
    setMode((prev) => (prev === "edit" ? "view" : "edit"));
  };

  const handleTitleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTitle = e.target.value.trim();

    setActiveObjectTitle(newTitle);
  };

  useEffect(() => {
    if (debouncedTitle) {
      const patchOperation: Operation = {
        op: "replace",
        path: "/title",
        value: debouncedTitle,
      };
      partialUpdateNoteObject(fileContent.noteObject.id.toString(), [
        patchOperation,
      ]);
    }
  }, [debouncedTitle, fileContent.noteObject.id]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-end p-2 text-gray-600 gap-2">
        <div className="hover-icon" onClick={handleModeChange}>
          {mode === "edit" ? <PenLine size={20} /> : <BookOpen size={20} />}
        </div>
        <div className="hover-icon">
          <Ellipsis size={20} />
        </div>
      </div>
      <div className="w-full px-20">
        <div className=" text-[28px] max-w-full">
          <textarea
            defaultValue={fileContent?.noteObject.title}
            onChange={handleTitleChange}
            rows={1}
            className="resize-none border-none outline-none w-full max-w-full field-sizing-content"
            style={{
              lineHeight: "normal",
            }}
          />
        </div>
        <MarkdownViewer fileContent={fileContent} />
      </div>
    </div>
  );
};

export default FileDetail;
