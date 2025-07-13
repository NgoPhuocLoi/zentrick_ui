"use client";
import TextEditor from "@/components/my-texteditor/text-editor";
import { BookOpen, Ellipsis, PenLine } from "lucide-react";
import React, { useState } from "react";

const MarkdownView = () => {
  const [content, setContent] = useState<string>("");
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
          <TextEditor content={content} setContent={setContent} />
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
