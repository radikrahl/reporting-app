import { Injectable } from "@angular/core";
import { createMockData } from "~/app/core/constants/mockdata";
import { CsvData } from "../../core/classes/csv-data";
import { FileManager } from "../../core/services/files/file.manager";
import { CsvFile } from "~/app/shared/files/classes/file";

@Injectable()
export class MockdataFactory {
  constructor(private csv: FileManager) {}
  async create(): Promise<CsvFile> {
    const date = new Date(Date.now());
    var data = new CsvData(createMockData()).data;

    const dateString = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    const fileName = `${data.parentName}-${dateString}.csv`;
    return this.csv.save(data.parentName + "/" + fileName, data);
  }
}
