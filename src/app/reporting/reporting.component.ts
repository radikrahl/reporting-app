import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { DateValueAccessor } from "@nativescript/angular";
import { TapGestureEventData } from "@nativescript/core";
import { ReportItem, ReportItem_c } from "./models/report-item";

@Component({
  selector: "afriknow-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["reporting.component.css"]
})
export class ReportingComponent {
  form: FormGroup;
  date = new Date(Date.now());
  pageIndex = 0;

  constructor(private fb: FormBuilder) {
    const page1 = fb.group({
      date: new ReportItem_c(this.date, 'date'),
      name: new ReportItem_c('', 'text'),
    });

    const page2 = fb.group({
      chicken: new ReportItem_c(0, 'int'),
    });

    const page3 = fb.group({
      foodQuantity: new ReportItem_c(0, 'int'),
      foodPrice: new ReportItem_c(0, 'double'),
    })

    const page4 = fb.group({
      eggs: new ReportItem_c(0, 'int'),
      newBorn: new ReportItem_c(false, 'switch'),
      amountNewBorn: new ReportItem_c(1, 'int'),
    })

    const page5 = fb.group({
      soldBirds: new ReportItem_c(0, 'int'),
      amountReceived: new ReportItem_c(0, 'double'),
    })

    const page6 = fb.group( {
      sickBirds: new ReportItem_c(0, 'int'),
      medicineNeeded: new ReportItem_c(false, 'switch'),
      amountMedicineBought: new ReportItem_c(0, 'double'),
      deadChicken: new ReportItem_c(0, 'int'),
    })

    this.form = fb.group({
      page1,
      page2,
      page3,
      page4,
      page5,
      page6
    })

  }

  onTap(event) {
    if (event.object.id === 'next')
      this.pageIndex++;
    else if (event.object.id === 'prev')
      this.pageIndex--;
  }
}
