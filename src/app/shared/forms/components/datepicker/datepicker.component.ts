import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReportControl } from "../../classes/report-control";

export class DatepickerReportItem extends ReportControl<Date> {
  component = DatepickerComponent;
  controlType: string = "datepicker";
}

@Component({
  selector: "afriknow-datepicker",
  templateUrl: "./datepicker.component.html",
})
export class DatepickerComponent {
  @Input() question!: DatepickerReportItem;
  @Input() form!: FormGroup;

  get showError() {
    const control = this.question.formControl;

    return control?.invalid && control?.touched;
  }
}
