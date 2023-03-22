import { Injectable, TemplateRef } from "@angular/core";
import * as XLSX from "xlsx";
import { File, FileSystemEntity, Folder } from "@nativescript/core";
import { FileService } from "../../files/services/file.service";

export type ExcelData = {
  head: string[];
  rows: any[];
};

interface IFileService {
  share(args: { path: string; fileName: string }): Promise<boolean> | undefined;
  open(args: { path: string }): boolean;
  save(args: any): Promise<any> | undefined;
}

@Injectable({
  providedIn: "root",
})
export class ExcelFileService implements IFileService {
  constructor(private files: FileService) {}
  async getFolders(): Promise<Folder[]> {
    const folder = this.files.getFolder();
    const entities = await folder?.getEntities();

    if (entities && folder) {
      const folders: Folder[] = entities
        .filter((entity) => entity instanceof Folder)
        .map((x) => folder.getFolder(x.name));

      return folders;
    }
    return [];
  }
  async getReports(): Promise<File[]> {
    const folder = this.files.getFolder();
    const entities = await folder?.getEntities();
    if (folder && entities) {
      return entities.map((x) => folder.getFile(x.name));
    }
    return [];
  }

  async getEntites(folderName: string): Promise<FileSystemEntity[]> {
    const folder = this.files.getFolder(folderName);
    const entities = await folder?.getEntities();
    if (folder && entities) {
      return entities.map((x) => {
        if (x instanceof File)
        return folder.getFile(x.name);
        else if (x instanceof Folder)
        return folder.getFolder(x.name);
        else return x;
      });
    }
    return [];
  }

  save(args: { fileName: string; folder?: string; data: ExcelData }) {
    const sheetName = args.fileName;

    const content = this.createFileContent(args.data, sheetName);

    return this.files.save({
      content,
      fileName: args.fileName,
      folderName: args.folder,
    });
  }

  share(args: { path: string; fileName: string }) {
    return this.files.share(args);
  }
  open(args: { path: string }): boolean {
    return this.files.open(args);
  }

  delete(args: { fileName: string }) {
    return this.files.delete(args);
  }

  deleteFolder(folderName: string) {
    return this.files.deleteFolder(folderName);
  }

  private createFileContent(data: ExcelData, sheetName: string) {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([data.head, data.rows]);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    return XLSX.write(workbook, { type: "string", bookType: "csv" });
  }
}
