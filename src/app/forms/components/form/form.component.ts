import { Component, Input, OnChanges } from "@angular/core";
import { QuestionGroup } from "../../classes/report-item";

@Component({
  selector: "afriknow-report-form",
  templateUrl: "./form.component.html",
  providers: [],
})
export class ReportFormComponent implements OnChanges {
  @Input() questionGroup!: QuestionGroup;

  constructor() {}

  ngOnChanges() {}
}
