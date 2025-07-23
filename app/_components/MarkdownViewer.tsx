"use client";
import { updateFileContent } from "@/caller/file-content-caller";
import TextEditor from "@/components/my-texteditor/text-editor";
import { FileContent } from "@/interface/note-object";
import { BookOpen, Ellipsis, PenLine } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MarkdownViewProps {
  fileContent: FileContent;
}

let timeoutId: NodeJS.Timeout | null = null;

const MarkdownViewer = ({ fileContent }: MarkdownViewProps) => {
  const [content, setContent] = useState<string>(fileContent.content || "");
  const [mode, setMode] = useState<"view" | "edit">("edit");

  useEffect(() => {
    const handleUpdateContent = async (newContent: string) => {
      await updateFileContent(fileContent.noteObject.id.toString(), newContent);
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      handleUpdateContent(content);
    }, 500);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [content, fileContent.noteObject.id]);

  return (
    <>
      <div className="w-full py-5">
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

export default MarkdownViewer;
