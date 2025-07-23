"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ITextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const Editor = ({ content, onContentChange: setContent }: ITextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none [&_h1]:mb-4 [&_p]:my-2 [&_p]:leading-normal [&_ul]:my-2 [&_ol]:my-2 [&_ul_li]:my-1 [&_ul_p]:my-1 [&_ol_p]:my-1 [&_ol_li]:my-1 [&_hr]:my-4",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      console.log("Editor content:", editor.getHTML());
      setContent(editor.getHTML());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  return (
    <EditorContent
      className="w-full flex justify-center"
      width={"100%"}
      editor={editor}
    />
  );
};

export default Editor;
