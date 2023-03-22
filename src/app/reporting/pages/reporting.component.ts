import { Component } from "@angular/core";
import { FormArray } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { Button } from "@nativescript/core";
import {
  ExcelData,
  ExcelFileService,
} from "~/app/files/services/excelfile.service";
import { QuestionGroup } from "~/app/shared/forms/classes/report-item";

import { ReportItemFactory } from "../services/report-item.factory";

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.scss"],
  providers: [ExcelFileService],
})
export class ReportingComponent {
  pageIndex = 1;
  form: FormArray<any> = new FormArray<any>([]);
  questionGroups: QuestionGroup[];

  constructor(
    private factory: ReportItemFactory,
    private files: ExcelFileService,
    private router: RouterExtensions
  ) {
    this.questionGroups = this.factory.getQuestions3();
    this.questionGroups.forEach((group) => this.form.push(group.form));
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;
  }

  onSubmit() {
    const date = <Date>this.questionGroups[0].form.get("date")?.value;
    const fileName = <string>(
      this.questionGroups[0].form.get("parentName")?.value
    );

    this.files
      .save({ date, fileName, data: this.toExcelData() })
      ?.then((file) => {
        this.router.navigate(["/files"]);
      });
  }

  goBack() {
    this.router.back();
  }

  toExcelData(): ExcelData {
    const data: { head: string[]; rows: any[] } = { head: [], rows: [] };

    for (let index = 0; index < this.questionGroups.length; index++) {
      const group: QuestionGroup = this.questionGroups[index];

      for (let index = 0; index < group.questions.length; index++) {
        const element = group.questions[index];

        if (!element.formControl.disabled && element.controlType !== "switch") {
          data.head.push(element.label);
          data.rows.push(element.value);
        }
      }
    }
    console.log(data);
    return data;
  }
}
