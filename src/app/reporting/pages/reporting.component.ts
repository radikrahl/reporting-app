import { Component } from "@angular/core";
import { FormGroup, FormRecord } from "@angular/forms";
import { Router } from "@angular/router";
import { Button } from "@nativescript/core";
import { ExcelFileService } from "~/app/files/services/excelfile.service";
import { QuestionGroup } from "../../forms/classes/report-item";
import { ReportItemFactory } from "../services/report-item.factory";

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.css"],
  providers: [ReportItemFactory, ExcelFileService],
})
export class ReportingComponent {
  pageIndex = 1;
  form: FormRecord = new FormRecord({});
  questionGroups: QuestionGroup[];

  constructor(
    private factory: ReportItemFactory,
    private files: ExcelFileService,
    private router: Router
  ) {
    this.questionGroups = this.factory.getQuestions3();
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;
  }

  onSubmit() {
    const json = JSON.stringify(this.form.value);
    this.files.save(this.form).then((file) => {
      if (file) {
        this.router.navigate(["/files"]);
        console.log(file.name);
      }
    });
  }
}
