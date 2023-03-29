import { Inject, Injectable } from "@angular/core";
import { createMockData } from "~/app/core/constants/mockdata";
import { CsvData } from "../../core/classes/csv-data";
import { FileManager } from "../../core/services/files/file.manager";

@Injectable({
  providedIn: "root",
})
export class MockdataFactory {
  constructor(private csv: FileManager) {}
  async create(): Promise<CsvData> {
    const date = new Date(Date.now());
    var data = new CsvData(createMockData());

    const dateString = `${date.getUTCMonth()}-${date.getUTCDate()}-${date.getHours()}--${date.getMinutes()}`;
    const fileName = `${data.data.parentName}-${dateString}.csv`;

    return this.csv.writeText({
      content: data.text,
      path: data.data.parentName + "/" + fileName,
    });
  }
}
