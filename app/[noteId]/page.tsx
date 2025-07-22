import React from "react";
import MarkdownView from "../dashboard/markdown-view";
import { getFileContentById } from "@/caller/file-content-caller";

const Page = async ({ params }: { params: Promise<{ noteId: string }> }) => {
  const { noteId } = await params;
  const fileContent = await getFileContentById(noteId);
  return fileContent && <MarkdownView fileContent={fileContent} />;
};

export default Page;
