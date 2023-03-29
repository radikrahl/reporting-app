import { Injectable } from "@angular/core";
import { Folder } from "@nativescript/core";
import { CsvData } from "~/app/core/classes/csv-data";
import { FileManager } from "~/app/core/services/files/file.manager";

@Injectable()
export class FolderService {
  constructor(private files: FileManager) {}

  async open(folder: Folder) {
    var content = await this.readFolder(folder.name);
    var data = new CsvData(content);
    await this.files.writeText({
      content: data.text,
      path: `temp/${folder.name}.csv`,
    });

    this.files.open({ path: `temp/${folder.name}.csv` });

    await this.files.deleteFolder("temp");
  }

  async share(folder: Folder) {
    var content = await this.readFolder(folder.name);
    var data = new CsvData(content);

    await this.files.writeText({
      content: data.text,
      path: `temp/${folder.name}.csv`,
    });

    await this.files.share({ path: `temp/${folder.name}.csv` });

    await this.files.deleteFolder("temp");
  }

  delete(folder: Folder) {
    return this.files.deleteFolder(folder.name);
  }

  async readFolder(path: string) {
    let entities = await this.files.getEntities(path);
    entities = entities.filter((x) => x instanceof File);

    const orig = new CsvData({});

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      const content = await this.files.readText({
        path: entity.parent.name + "/" + entity.name,
      });
      var data = CsvData.createFromText(content);
      orig.combine(data);
    }

    return orig;
  }
}
