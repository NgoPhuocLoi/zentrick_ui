export interface NoteObject {
  id: number;
  title: string;
  parent: NoteObject | null;
  type: NoteObjectType;
  createdAt: string;
  updatedAt: string;
}

export interface FileContent {
  id: number;
  noteObjectId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export enum NoteObjectType {
  FOLDER = "FOLDER",
  FILE = "FILE",
}
