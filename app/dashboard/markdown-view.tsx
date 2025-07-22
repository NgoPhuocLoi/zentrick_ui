"use client";
import TextEditor from "@/components/my-texteditor/text-editor";
import { FileContent } from "@/interface/note-object";
import { BookOpen, Ellipsis, PenLine } from "lucide-react";
import React, { useState } from "react";

interface MarkdownViewProps {
  fileContent: FileContent;
}

const MarkdownView = ({ fileContent }: MarkdownViewProps) => {
  const [content, setContent] = useState<string>(fileContent.content || "");
  const [mode, setMode] = useState<"view" | "edit">("edit");

  const handleModeChange = () => {
    setMode((prev) => (prev === "edit" ? "view" : "edit"));
  };
  return (
    <>
      <div className="flex justify-end p-2 text-gray-600 gap-2">
        <div className="hover-icon" onClick={handleModeChange}>
          {mode === "edit" ? <PenLine size={20} /> : <BookOpen size={20} />}
        </div>
        <div className="hover-icon">
          <Ellipsis size={20} />
        </div>
      </div>
      <div className="w-full px-20 py-10">
        {mode === "edit" ? (
          <TextEditor content={content} onContentChange={setContent} />
        ) : (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    </>
  );
};

export default MarkdownView;
