"use server";

import { Folder } from "@/interface/folder";
import { apiCaller } from "@/lib/apiCaller";

export const getFolders = async ({
  rootLevelOnly,
  parentId,
}: {
  rootLevelOnly?: boolean;
  parentId?: string;
}) => {
  const params: Record<string, string> = {};
  if (rootLevelOnly) {
    params.rootLevelOnly = "true";
  }

  if (parentId) {
    params.parentId = parentId;
  }
  try {
    const folders = await apiCaller
      .get("/folders")
      .query(params)
      .json<Folder[]>();
    console.log("Fetched folders:", folders);
    return folders;
  } catch (error) {
    console.error("Failed to fetch folders:", error);
    return [];
  }
};
