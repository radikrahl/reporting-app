import { Component, Inject } from "@angular/core";
import { FormArray } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { Button } from "@nativescript/core";
import { REPORT_FORM_DATA } from "~/app/core/constants/mockdata";
import { ExcelFileService } from "~/app/core/services/excelfile.service";
import { QuestionGroup } from "~/app/core/models/report-item";
import { CsvData } from "~/app/core/classes/csv-data";

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.scss"],
})
export class ReportingComponent {
  pageIndex = 1;
  form: FormArray<any> = new FormArray<any>([]);

  constructor(
    @Inject(REPORT_FORM_DATA) public questionGroups: QuestionGroup[],
    private files: ExcelFileService,
    private router: RouterExtensions
  ) {
    this.questionGroups.forEach((group) => this.form.push(group.form));
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;
  }

  onSubmit() {
    const date = <Date>this.questionGroups[0].form.get("date")?.value;
    const parentName = <string>(
      this.questionGroups[0].form.get("parentName")?.value
    );
    const fileName = `${parentName}-${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}.csv`;

    this.files.save({ fileName, data: this.toExcelData() })?.then((file) => {
      this.router.navigate(["/files"]);
    });
  }

  goBack() {
    this.router.back();
  }

  toExcelData(): CsvData {
    let data: { head: string[]; rows: any[] } = { head: [], rows: [] };

    for (let index = 0; index < this.questionGroups.length; index++) {
      const group: QuestionGroup = this.questionGroups[index];

      if (data.head.length > 0) {
        data.rows.push(group.toCsv().rows);
      } else {
        data = group.toCsv();
      }
    }
    console.log(data);
    return new CsvData(data.head, data.rows);
  }
}
