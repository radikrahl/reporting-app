import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from "@angular/core";
import { QuestionGroup } from "../../../../core/models/report-item";

@Component({
  selector: "afriknow-report-form",
  templateUrl: "./form.component.html",
  providers: [],
})
export class ReportFormComponent {
  @Input() questionGroup!: QuestionGroup;
  constructor() {}
}
