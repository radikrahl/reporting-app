import { Injectable, TemplateRef } from "@angular/core";
import { File, FileSystemEntity, Folder } from "@nativescript/core";
import { FileService } from "./files/file.service";
import { CsvData, CsvWorkSheetAdapter } from "../classes/csv-data";

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

  async getEntites(folderName: string): Promise<FileSystemEntity[]> {
    return this.files.getEntities(folderName);
  }

  save(args: { fileName: string; folder?: string; data: CsvData }) {
    const sheetName = args.fileName;

    const content = args.data.toFileContent();

    return this.files.save({
      content,
      fileName: args.fileName,
      folderName: args.folder,
    });
  }

  shareFolder(folder: Folder) {
    this.files.getEntities(folder.name).then((entities) => {
      var sheet = CsvWorkSheetAdapter.createSheet(this.readEach(entities));
      if (sheet) {
        var data: CsvData = sheet.toCsvData();
        this.save({
          fileName: "temp" + folder.name,
          folder: folder.name,
          data,
        })?.then((file) => {
          this.share({
            path: folder.path,
            fileName: "temp" + folder.name,
          })?.then(() =>
            this.delete({ path: folder.path, fileName: "temp" + folder.name })
          );
        });
      }
    });
  }

  openFolder(folder: Folder) {
    this.files.getEntities(folder.name).then((entities) => {
      var sheet = CsvWorkSheetAdapter.createSheet(this.readEach(entities));
      if (sheet) {
        var data: CsvData = sheet.toCsvData();
        this.save({
          fileName: "temp" + folder.name,
          folder: folder.name,
          data,
        })?.then((file) => {
          this.open({ path: folder.path + "temp" + folder.name });

          // this.delete({path: folder.path, fileName: 'temp' + folder.name})
        });
      }
    });
  }

  share(args: { path: string; fileName: string }) {
    return this.files.share(args);
  }
  open(args: { path: string }): boolean {
    return this.files.open(args);
  }

  delete(args: { path: string; fileName: string }) {
    return this.files.delete(args);
  }

  deleteFolder(folderName: string) {
    return this.files.deleteFolder(folderName);
  }

  readEach(entities: FileSystemEntity[]): string[] {
    return entities
      .filter((entity) => entity instanceof File)
      .map((entity) => {
        return (<File>entity).readTextSync();
      });
  }
}
