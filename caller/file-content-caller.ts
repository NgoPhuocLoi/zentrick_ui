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

export const updateFileContent = async (
  fileId: string,
  content: string
): Promise<boolean> => {
  const apiCall = new FetchBuilder()
    .patch(`${FILE_CONTENTS_URL}/${fileId}/content`)
    .jsonBody({ content });
  try {
    const response = await apiCall.send();
    return response.ok;
  } catch (error) {
    console.error("Error updating file content:", error);
    return false;
  }
};
