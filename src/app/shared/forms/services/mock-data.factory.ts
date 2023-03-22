import { Inject, Injectable } from "@angular/core";
import { REPORT_FORM_DATA } from "~/app/core/constants/mockdata";
import { ExcelData, ExcelFileService } from "~/app/core/services/excelfile.service";
import { QuestionGroup } from "~/app/core/models/report-item";

@Injectable()
export class MockdataFactory {

  constructor(@Inject(REPORT_FORM_DATA) private data: QuestionGroup[], private files: ExcelFileService) {

  }
  async create(): Promise<ExcelData> {

    this.data[0].form.get("parentName")?.setValue("mockparent" +(Math.floor(Math.random() * (20 - 1 + 1)) + 1));


    const date = <Date>this.data[0].form.get("date")?.value;

    const parentName = <string>(
      this.data[0].form.get("parentName")?.value
    );
    const fileName = `${parentName}-${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}.csv`;

    await this.files.save({data: this.toExcelData(), fileName, folder: parentName})
    return this.toExcelData();
  }

  toExcelData(): ExcelData {
    let data: { head: string[]; rows: any[] } = { head: [], rows: [] };

    for (let index = 0; index < this.data.length; index++) {
      const group: QuestionGroup = this.data[index];

      if (data.head.length > 0) {

        data.rows.push(group.toCsv().rows)
      }
      else {
        data = group.toCsv();
      }
      // for (let index = 0; index < group.questions.length; index++) {
      //   const element = group.questions[index];

      //   if (!element.formControl.disabled && element.controlType !== "switch") {
      //     data.head.push(element.label);
      //     data.rows.push(element.value);
      //   }
      // }
    }
    console.log(data);
    return data;
  }
}
