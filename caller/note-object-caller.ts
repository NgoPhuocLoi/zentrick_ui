"use server";
import { NoteObject } from "@/interface/note-object";
import { apiCaller } from "@/lib/apiCaller";

export interface GetNoteObjectsParams {
  root: boolean;
  parentId?: number;
  [key: string]: string | boolean | number | undefined;
}

export const getNoteObjects = async (
  params: GetNoteObjectsParams = {
    root: false,
  }
) => {
  console.log("Fetching note objects with params:", params);
  try {
    return apiCaller.get("/note-objects").query(params).json<NoteObject[]>();
  } catch (error) {
    console.error("Error fetching note objects:", error);
    return [];
  }
};
