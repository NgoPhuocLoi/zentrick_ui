"use client";
import MarkdownViewer from "@/app/_components/MarkdownViewer";
import { FileContent } from "@/interface/note-object";
import { BookOpen, Ellipsis, PenLine } from "lucide-react";
import { useState } from "react";
import FileTitle from "./FileTitle";

interface FileDetailProps {
  fileContent: FileContent;
}

const FileDetail = ({ fileContent }: FileDetailProps) => {
  const [mode, setMode] = useState<"view" | "edit">("edit");

  const handleModeChange = () => {
    setMode((prev) => (prev === "edit" ? "view" : "edit"));
  };

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
        <FileTitle fileContent={fileContent} />
        <MarkdownViewer fileContent={fileContent} />
      </div>
    </div>
  );
};

export default FileDetail;
