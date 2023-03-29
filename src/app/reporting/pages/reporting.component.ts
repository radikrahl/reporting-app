import { Component, Inject } from "@angular/core";
import { FormArray } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { Button } from "@nativescript/core";
import { REPORT_FORM_DATA } from "~/app/core/constants/mockdata";
import { QuestionGroup } from "~/app/core/models/report-item";
import { CsvData } from "~/app/core/classes/csv-data";
import { FileManager } from "~/app/core/services/files/file.manager";

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
    private files: FileManager,
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

    const data = this.toCsvData();
    const fileName = `${parentName}-${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}.csv`;

    this.files
      .writeText({ content: data.text, path: parentName + "/" + fileName })
      .then(() => {
        this.router.navigate([""]);
      });
  }

  goBack() {
    this.router.back();
  }

  isCurrentFormValid() {
    return this.questionGroups[this.pageIndex - 1].form.valid;
  }

  toCsvData(): CsvData {
    let data = new CsvData({});

    for (let index = 0; index < this.questionGroups.length; index++) {
      const group: QuestionGroup = this.questionGroups[index];

      data.combine(group.toCsv());
    }

    return data;
  }
}
