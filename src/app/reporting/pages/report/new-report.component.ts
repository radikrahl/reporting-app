import { Component, Inject } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { Button } from "@nativescript/core";
import { ReportFormArray } from "~/app/shared/forms/classes/report-form";
import { FileManager } from "~/app/shared/files/services/file.manager";
import { createFilePath } from "~/app/shared/files/classes/file";

@Component({
  templateUrl: "./new-report.component.html",
})
export class NewReportComponent {
  pageIndex = 1;
  form: FormArray<FormGroup<any>>;

  constructor(
    @Inject("REPORT_FORM") public reportForm: ReportFormArray,
    private files: FileManager,
    private router: RouterExtensions
  ) {
    this.form = reportForm.form
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;
  }

  onSubmit() {
    const firstPage = this.reportForm.groups[0];
    let date: Date = firstPage.form.get("date")?.value;
    const parentName: string = firstPage.form.get("parentName")?.value

    const data = this.reportForm.toFormRecord();
    var path = createFilePath(parentName, date);

    this.files.save(path, data).then(() => {
      this.router.navigate([""]);
    });
  }

  goBack() {
    this.reportForm.groups.forEach((x) => x.form.reset());
    this.router.back();
  }

  isCurrentFormValid() {
    return this.reportForm.groups[this.pageIndex - 1].form.valid;
  }
}
