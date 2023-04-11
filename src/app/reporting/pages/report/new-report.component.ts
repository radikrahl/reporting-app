import { Component, Inject } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { Button } from "@nativescript/core";
import { ReportForm } from "~/app/shared/forms/classes/report-form";
import { FileManager } from "~/app/shared/files/services/file.manager";
import { createFilePath } from "~/app/shared/files/classes/file";

@Component({
  templateUrl: "./new-report.component.html",
})
export class NewReportComponent {
  pageIndex = 1;
  form: FormArray<FormGroup<any>> = new FormArray<FormGroup<any>>([]);

  constructor(
    @Inject("REPORT_FORM") public questionGroups: ReportForm[],
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
    let date = this.questionGroups[0].form.get("date")?.value;
    const parentName = <string>(
      this.questionGroups[0].form.get("parentName")?.value
    );

    const data = this.toDataRecord();
    var path = createFilePath(parentName, date);

    this.files.save(path, data).then(() => {
      this.router.navigate([""]);
    });
  }

  goBack() {
    this.questionGroups.forEach((x) => x.form.reset());
    this.router.back();
  }

  isCurrentFormValid() {
    return this.questionGroups[this.pageIndex - 1].form.valid;
  }

  private toDataRecord(): Record<string, unknown> {
    let data: Record<string, unknown> = {};
    this.questionGroups.forEach((group) => Object.assign(data, group.toCsv()));
    return data;
  }
}
