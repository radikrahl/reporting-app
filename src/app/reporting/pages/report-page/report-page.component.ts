import { Component, Input, OnChanges } from "@angular/core";
import { FormGroup, FormRecord } from "@angular/forms";
import { QuestionGroup } from "../../../forms/classes/report-item";

@Component({
  selector: "afriknow-report-page",
  template: `
    <afriknow-report-form
      [questionGroup]="questionGroup"
    ></afriknow-report-form>
  `,
})
export class ReportPageComponent implements OnChanges {
  @Input() questionGroup!: QuestionGroup;
  @Input() mainForm!: FormRecord;

  ngOnChanges(): void {
    if (!this.mainForm.contains(this.questionGroup.key))
      this.mainForm.addControl(this.questionGroup.key, this.questionGroup.form);
  }
}
