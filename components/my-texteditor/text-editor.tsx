"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ITextEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const Editor = ({ content, setContent }: ITextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      console.log("Editor content:", editor.getHTML());
      setContent(editor.getHTML());
    },
  });
  return <EditorContent editor={editor} />;
};

export default Editor;
