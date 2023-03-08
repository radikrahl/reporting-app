import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionBase, QuestionGroup } from "../../models/report-item";

@Component({
  selector: "afriknow-report-form",
  templateUrl: "./form.component.html",
  providers: [],
})
export class ReportFormComponent implements OnChanges {
  @Input() questionGroup: QuestionGroup;

  constructor() {}

  ngOnChanges() {

  }
}
