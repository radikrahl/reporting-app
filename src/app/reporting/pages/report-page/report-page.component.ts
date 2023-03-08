import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionGroup } from "../../models/report-item";

@Component({
  selector: "afriknow-report-page",
  template: ` <afriknow-report-form [questionGroup]="questionGroup"></afriknow-report-form> `,
})
export class ReportPageComponent implements OnInit {
  @Input() questionGroup!: QuestionGroup;
  @Input() mainForm!: FormGroup;

ngOnInit(): void {
    if (!this.mainForm.contains(this.questionGroup.key))
      this.mainForm.addControl(this.questionGroup.key, this.questionGroup.form);
  }
}
