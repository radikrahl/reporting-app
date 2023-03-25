import { Inject, Injectable } from "@angular/core";
import { REPORT_FORM_DATA } from "~/app/core/constants/mockdata";
import { ExcelFileService } from "~/app/core/services/excelfile.service";
import { QuestionGroup } from "~/app/core/models/report-item";
import { CsvData } from "../classes/csv-data";

@Injectable({
  providedIn: "root",
})
export class MockdataFactory {
  constructor(
    @Inject(REPORT_FORM_DATA) private data: QuestionGroup[],
    private files: ExcelFileService
  ) {}
  async create(): Promise<CsvData> {
    this.data[0].form
      .get("parentName")
      ?.setValue("mockparent" + (Math.floor(Math.random() * (20 - 1 + 1)) + 1));

    const date = <Date>this.data[0].form.get("date")?.value;

    const parentName = <string>this.data[0].form.get("parentName")?.value;
    const fileName = `${parentName}-${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${
      Math.floor(Math.random() * (20 - 1 + 1)) + 1
    }.csv`;
    await this.files.save({
      data: this.toExcelData(),
      fileName,
      folder: parentName,
    });
    return this.toExcelData();
  }

  toExcelData(): CsvData {
    let data: { head: string[]; rows: any[] } = { head: [], rows: [] };

    for (let index = 0; index < this.data.length; index++) {
      const group: QuestionGroup = this.data[index];

      if (data.head.length > 0) {
        data.rows.push(group.toCsv().rows);
      } else {
        data = group.toCsv();
      }
    }
    return new CsvData(data.head, data.rows);
  }
}
