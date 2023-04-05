import { formatDate } from "@angular/common";
import { Folder, File, knownFolders } from "@nativescript/core";
import { CsvFile } from "./file";
import { CsvData, CsvDataRecord } from "./csv-data";

export class CsvFolder {
  path: string;

  constructor(private folder: Folder) {
    this.path = this.folder.path;
  }

  async share() {
    var file = await this.save();
    return file.share();
  }

  async save() {
    var today = new Date(Date.now());
    var path = `temp/${this.folder.name}-${formatDate(
      today,
      "yyyy-MM-dd",
      "en-US"
    )}.csv`;
    var file = new CsvFile(knownFolders.temp().getFile(path));
    var data = await this.read();
    return await file.save(data);
  }

  async download() {
    var file = await this.save();
    return file.download();
  }

  async delete() {
    return this.folder.remove();
  }

  // TODO: Test this please...
  async read() {
    let entities = await this.folder.getEntities();

    const orig = new CsvData({});

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      let data: CsvDataRecord | undefined;

      if (entity instanceof File) {
        var file = new CsvFile(entity);
        data = await file.read();
      } else if (entity instanceof Folder) {
        var folder = new CsvFolder(entity);
        data = await folder.read();
      }

      if (data) {
        orig.combine(data);
      }
    }

    return orig.data;
  }
}
