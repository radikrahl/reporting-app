import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Button } from "@nativescript/core";
import { ReportFormArray } from "~/app/shared/forms/classes/report-form";
import { ReportFormService } from "../../services/report-form.service";

@Component({
  templateUrl: "./new-report.component.html",
  providers: [
    {
      provide: ReportFormService,
    },
  ],
})
export class NewReportComponent {
  pageIndex = 1;
  reportForm: ReportFormArray;
  constructor(
    private reports: ReportFormService,
    private router: RouterExtensions
  ) {
    this.reportForm = this.reports.reportForm;
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;
  }

  onSubmit() {
    this.reports.save().then(() => {
      this.router.navigate([""]);
    });
  }

  goBack() {
    this.reportForm.reset();
    this.router.back();
  }

  isCurrentFormValid() {
    return this.reportForm.isCurrentValid(this.pageIndex - 1);
  }
}
