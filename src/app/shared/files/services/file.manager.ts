import { Injectable } from "@angular/core";
import {
  FileSystemEntity,
  File,
  Folder,
  knownFolders,
} from "@nativescript/core";
import { CsvDataRecord } from "../classes/csv-data";
import { CsvFile } from "~/app/shared/files/classes/file";
import { CsvFolder } from "~/app/shared/files/classes/folder";

@Injectable({
  providedIn: "root",
})
export class FileManager {
  private get documents() {
    return knownFolders.documents();
  }

  private get externalDocuments() {
    return knownFolders.externalDocuments();
  }

  private get root() {
    return this.externalDocuments.getFolder("reports");
  }

  private get temp() {
    return knownFolders.temp();
  }

  public getFolder(path: string) {
    return this.root.getFolder(path);
  }

  public getEntities(path: string) {
    return this.root.getFolder(path).getEntities();
  }

  public save(relativePath: string, data: CsvDataRecord) {
    const file = new CsvFile(this.root.getFile(relativePath));

    return file.save(data);
  }

  public download(entity: FileSystemEntity) {
    return this.getCsvEntity(entity).download();
  }

  public share(entity: FileSystemEntity) {
    return this.getCsvEntity(entity).share();
  }

  private getCsvEntity(entity: FileSystemEntity) {
    if (entity instanceof File) {
      return new CsvFile(entity);
    } else if (entity instanceof Folder) {
      return new CsvFolder(entity);
    } else {
      throw new Error("not recognized");
    }
  }
}
