import { File } from "@/interface/file";

export interface Folder {
  name: string;
  parent?: Pick<Folder, "id">;
  id: number;
  files: File[];
  subFolders: SubFolder[];
  createdAt: string;
  updatedAt: string;
}

export type SubFolder = Omit<Folder, "files">;
