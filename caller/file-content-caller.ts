"use server";

import { FILE_CONTENTS_URL } from "@/app/constants/api-url";
import { FileContent } from "@/interface/note-object";
import { FetchBuilder } from "@/utils/fetch-builder";

export const getFileContentById = async (fileId: string) => {
  const apiCall = new FetchBuilder().get(`${FILE_CONTENTS_URL}/${fileId}`);
  try {
    return await apiCall.json<FileContent>();
  } catch (error) {
    console.error("Error fetching file content:", error);
    return null;
  }
};
