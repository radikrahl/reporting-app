import { Injectable } from "@angular/core";
import { knownFolders } from "@nativescript/core";
import { CsvDataRecord } from "../../classes/csv-data";
import { CsvFile } from "~/app/shared/files/classes/file";

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

  public getEntities(path: string) {
    return this.root.getFolder(path).getEntities();
  }

  public save(relativePath: string, data: CsvDataRecord) {
    return new CsvFile(this.root.getFile(relativePath)).save(data);
  }
}
