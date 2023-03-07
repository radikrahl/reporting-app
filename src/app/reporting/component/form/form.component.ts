import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReportItemBase } from "../../models/report-item";
import {
  ReportControlService,
  ReportPageControlMap,
} from "../../services/report-control.service";

@Component({
  selector: "afriknow-report-form",
  templateUrl: "./form.component.html",
  providers: [ReportControlService],
})
export class ReportFormComponent implements OnChanges {
  @Input() questions: ReportItemBase<unknown>[] | null = [];
  form: FormGroup<ReportPageControlMap> = new FormGroup<ReportPageControlMap>(
    {}
  );
  payLoad = "";

  constructor(private qcs: ReportControlService) {}

  ngOnChanges() {
    this.form = this.qcs.toFormGroup2(
      this.questions as ReportItemBase<unknown>[]
    );
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
