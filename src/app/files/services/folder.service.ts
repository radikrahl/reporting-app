import { Injectable, OnDestroy } from "@angular/core";
import { Folder, File } from "@nativescript/core";
import { CsvData } from "~/app/core/classes/csv-data";
import { FileManager } from "~/app/core/services/files/file.manager";

@Injectable()
export class FolderService implements OnDestroy {
  constructor(private files: FileManager) {
  }
  ngOnDestroy(): void {
  }

  async open(folder: Folder) {
    var path = `temp/${folder.name}.csv`;
    var data = await this.readFolder(folder.name);

    this.files.base = "temp";

    await this.files.writeText({
      content: data.text,
      path,
    });

    this.files.open({ path });
    this.files.base = "reports";

  }

  async share(folder: Folder) {
    var path = `temp/${folder.name}.csv`;

    var data = await this.readFolder(folder.name);

    this.files.base = "temp";
    await this.files.writeText({
      content: data.text,
      path,
    });

    await this.files.share({ path });
    this.files.base = "reports";
  }

  delete(folder: Folder) {
    return this.files.deleteFolder(folder.name);
  }

  private async readFolder(path: string) {
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
