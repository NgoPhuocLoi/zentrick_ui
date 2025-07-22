"use server";
import { CreateNoteObjectDTO, NoteObject } from "@/interface/note-object";
import { apiCaller } from "@/lib/apiCaller";
import { FetchBuilder } from "@/utils/fetch-builder";

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
  try {
    const apiCall = new FetchBuilder()
      .get("http://localhost:8080/api/note-objects")
      .query(params);
    return apiCall.json<NoteObject[]>();
  } catch (error) {
    console.error("Error fetching note objects:", error);
    return [];
  }
};

export const createNoteObject = async (data: CreateNoteObjectDTO) => {
  console.log("Creating note object with data:", data);
  try {
    return apiCaller.post("/note-objects").jsonBody(data).json<NoteObject>();
  } catch (error) {
    console.error("Error creating note object:", error);
    return null;
  }
};
