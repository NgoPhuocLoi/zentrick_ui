export interface NoteObject {
  id: number;
  title: string;
  parent: NoteObject | null;
  type: NoteObjectType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteObjectDTO {
  title: string;
  parentId?: number;
  type: NoteObjectType;
  [key: string]: string | number | undefined;
}

export interface FileContent {
  id: number;
  noteObject: NoteObject;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export enum NoteObjectType {
  FOLDER = "FOLDER",
  FILE = "FILE",
}
