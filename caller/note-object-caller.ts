"use server";
import { CreateNoteObjectDTO, NoteObject } from "@/interface/note-object";
import { apiCaller } from "@/lib/apiCaller";
import { FetchBuilder, FetchError } from "@/utils/fetch-builder";
import { Operation } from "fast-json-patch";

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

export const partialUpdateNoteObject = async (
  id: string,
  patch: Operation[]
) => {
  console.log("Patching note object with id:", id, "and patch:", patch);
  try {
    const apiCall = new FetchBuilder()
      .patch(`http://localhost:8080/api/note-objects/${id}`)
      .JsonPatchBody(patch);

    return apiCall.json<NoteObject>();
  } catch (error) {
    console.error("Error patching note object:", (error as FetchError).data);
    return null;
  }
};

export const deleteNoteObject = async (id: string) => {
  console.log("Deleting note object with id:", id);
  try {
    const apiCall = new FetchBuilder().delete(
      `http://localhost:8080/api/note-objects/${id}`
    );

    const response = await apiCall.send();

    return response.ok;
  } catch (error) {
    console.error("Error deleting note object:", (error as FetchError).data);
    return false;
  }
};
