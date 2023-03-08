import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Button } from "@nativescript/core";
import { QuestionGroup } from "../models/report-item";
import { ReportControlService } from "../services/report-control.service";
import { ReportItemFactory } from "../services/report-item.factory";

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.css"],
  providers: [ReportItemFactory, ReportControlService],
})
export class ReportingComponent {
  pageIndex = 1;
  form: FormGroup = new FormGroup({});
  questionGroups: QuestionGroup[];

  constructor(private factory: ReportItemFactory) {
    this.questionGroups = this.factory.getQuestions3();
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;
  }
}
