import { Injectable } from "@angular/core";
import { FileService } from "./files/file.service";
import { File, FileSystemEntity, Folder } from "@nativescript/core";
@Injectable({
  providedIn: "root",
})
export class CsvFileService {
  constructor(private files: FileService) {}

  combine(
    original: Record<string, unknown[]>,
    newData: Record<string, unknown[]>
  ) {
    for (const key in newData) {
      if (Object.prototype.hasOwnProperty.call(newData, key)) {
        newData[key].forEach((x) => {
          if (original[key]) original[key].push(x);
          else original[key] = [x];
        });
      }
    }

    return original;
  }

  write(data: Record<string, any | any[]>, path: string) {
    var keys: string[] = Object.keys(data);
    var rows: string[][] = [];

    if (Array.isArray(data[keys[0]])) {
      for (let i = 0; i < data[keys[0]].length; i++) {
        var row: string[] = [];

        keys.forEach((key, index) => {
          var value = data[key];
          row.push(value[i]);
        });
        rows.push(row);
      }
    } else {
      var row: string[] = [];

      keys.forEach((key, index) => {
        var value = data[key];
        if (Array.isArray(value)) {
          throw new Error("not implmented");
        } else if (value) {
          row.push(value);
        } else {
          row.push("");
        }
      });
      rows.push(row);
    }

    var csvText =
      keys.join(",") + "\n" + rows.map((x) => x?.join(",")).join("\n");
    console.log(csvText);
    return this.files.writeText({ content: csvText, path });
  }

  async read(path: string) {
    const x = await this.files.readText({ path });
    var csvText: string = x;
    var data: Record<string, any[]> = {};
    var colDef = csvText.split("\n").shift()?.split(",");
    if (colDef) {
      for (let i = 0; i < colDef.length; i++) {
        const element = colDef[i];
        csvText.split("\n").forEach((row, index) => {
          if (index === 0)
            return;
          if (data[element]) {
            data[element].push(row.split(",")[i]);
          } else {
            data[element] = [row.split(",")[i]];
          }
        });
      }
    }
    return data;
  }

  async readFolder(path: string) {
    let entities = await this.files.getEntities(path);
    entities = entities.filter((x) => x instanceof File);

    const orig = {};

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      var data = await this.read(entity.parent.name + "/" + entity.name);
      this.combine(orig, data);
    }

    return orig;
  }

  delete(path: string) {
    return this.files.delete({ path });
  }
}
