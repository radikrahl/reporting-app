import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReportItemBase } from "../../models/report-item";

@Component({
  selector: "afriknow-report-form-item",
  templateUrl: "./form-item.component.html",
})
export class ReportFormItemComponent {
  @Input() question!: ReportItemBase<unknown>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
