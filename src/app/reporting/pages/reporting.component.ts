import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Button } from "@nativescript/core";
import { filter, map, Observable, tap } from "rxjs";
import { ReportItemBase } from "../models/report-item";
import { ReportControlService } from "../services/report-control.service";
import { ReportItemService } from "../services/report-item.service";

interface ReportingForm {
  page1: FormGroup;
  page2: FormGroup;
  page3: FormGroup;
  page4: FormGroup;
  page5: FormGroup;
  page6: FormGroup;
}

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.css"],
  providers: [ReportItemService, ReportControlService],
})
export class ReportingComponent {
  form: FormGroup;
  date = new Date(Date.now());
  pageIndex = 1;
  reportItems$: Observable<ReportItemBase<unknown>[]>;
  constructor(
    private fb: FormBuilder,
    private reports: ReportItemService,
    private controls: ReportControlService
  ) {
    this.reportItems$ = reports.getQuestions2(this.pageIndex).pipe(tap(console.log));
    // const page1 = fb.group({
    //   date: fb.control<Date>(this.date),
    //   name: fb.control<string>(''),
    // });

    // const page2 = fb.group({
    //   chicken: fb.control<number|null>(null),
    // });

    // const page3 = fb.group({
    //   foodQuantity: fb.control<number|null>(null),
    //   foodPrice: fb.control<number|null>(null),
    // })

    // const page4 = fb.record({
    //   eggs: fb.control<number|null>(null),
    //   newBorn: fb.control(false),
    //   amountNewBorn: fb.control(1),
    // })

    // const page5 = fb.group({
    //   soldBirds: fb.control<number|null>(null),
    //   amountReceived: fb.control<number|null>(null),
    // })

    // const page6 = fb.group( {
    //   sickBirds: fb.control<number|null>(null),
    //   medicineNeeded: fb.control(false),
    //   amountMedicineBought: fb.control<number|null>(null),
    //   deadChicken: fb.control<number|null>(null),
    // })

    // this.form = fb.group({
    //   page1,
    //   page2,
    //   page3,
    //   page4,
    //   page5,
    //   page6
    // })
  }

  onTap(event: { object: Button }) {
    if (event.object.id === "next") this.pageIndex++;
    else if (event.object.id === "prev") this.pageIndex--;

    //todo maybe pipe through action and update pageindex on service
    this.reportItems$ = this.reports.getQuestions2(this.pageIndex);
  }
}
