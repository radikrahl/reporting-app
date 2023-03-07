import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Button } from "@nativescript/core";
import { Observable, tap } from "rxjs";
import { ReportItemBase } from "../models/report-item";
import { ReportControlService } from "../services/report-control.service";
import { ReportItemFactory } from "../services/report-item.service";

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.css"],
  providers: [ReportItemFactory, ReportControlService],
})
export class ReportingComponent {
  form: FormGroup;
  date = new Date(Date.now());
  pageIndex = 1;
  reportItems$: Observable<ReportItemBase<unknown>[]>;

  constructor(private factory: ReportItemFactory) {
    this.reportItems$ = this.factory
      .getQuestions2(this.pageIndex)
      .pipe(tap(console.log));
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;

    //todo maybe pipe through action and update pageindex on service
    this.reportItems$ = this.factory.getQuestions2(this.pageIndex);
  }
}
