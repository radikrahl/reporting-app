import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionOptions } from "~/app/core/models/report-item";
import { ReportControl } from "../../classes/report-control";
import { NativeScriptNgZone } from "@nativescript/angular";

export interface ListpickerReportItemOptions extends QuestionOptions<string> {
  items?: string[];
}

export class ListpickerReportItem extends ReportControl<string> {
  component = ListpickerComponent;
  controlType: string = "listpicker";
  items: string[];
  constructor(options: ListpickerReportItemOptions) {
    super(options);
    this.items = options.items ?? [];
  }
}

@Component({
  selector: "afriknow-listpicker",
  templateUrl: "./listpicker.component.html",
  styleUrls: ["./listpicker.component.scss"],
})
export class ListpickerComponent {
  @Input() question!: ListpickerReportItem;
  @Input() form!: FormGroup;

  get showError() {
    const control = this.question.formControl;

    return control?.invalid && control?.touched;
  }

  constructor(private ngZone: NativeScriptNgZone) {}

  onSelectedIndexChange(e: any) {
    this.ngZone.runTask(() => {
      this.question.formControl.setValue(this.question.items[e.value]);
      console.log(e.value, this.question.items[e.value] ,this.question.formControl.value);
    })
  }


}
