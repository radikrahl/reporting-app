import { ShareFile } from "@nativescript-community/ui-share-file";
import { Utils, File } from "@nativescript/core";
import { CsvDataRecord, CsvData } from "~/app/core/classes/csv-data";

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
