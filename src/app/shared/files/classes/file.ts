import { ShareFile } from "@nativescript-community/ui-share-file";
import { Utils, File } from "@nativescript/core";
import { CsvDataRecord, CsvData } from "./csv-data";
import { formatDate } from "@angular/common";

export function createFilePath(parentName: string, date: Date) {
  const dateString = formatDate(date, "yyyy-MM-dd", "en-US");
    const year = formatDate(date, 'yyyy', 'en-US');
    const month = formatDate(date, 'MMM', 'en-US');
    const day = formatDate(date, 'dd', 'en-US');
    const folderPath = `${parentName}/${year}/${month}/`;
    const fileName = `${parentName}-${dateString}.csv`;

    return folderPath + fileName;
}

export class CsvFile {
  path: string;
  constructor(private file: File) {
    this.path = file.path;
  }

  share() {
    try {
      return new ShareFile().open({
        path: this.file.path,
      });
    } catch (e) {
      console.error(e);
    }
  }

  download() {
    return Utils.openFile(this.file.path);
  }

  delete() {
    return this.file.remove();
  }

  async save(data: CsvDataRecord) {
    // const old = await this.read();
    let csvData: CsvData = new CsvData(data);
    // csvData.combine(data);

    await this.file.writeText(csvData.text);

    return new CsvFile(this.file);
  }

  async read() {
    var fileContent = await this.file.readText();

    // TODO: Test this please
    return CsvData.createFromText(fileContent).data;
  }
}
