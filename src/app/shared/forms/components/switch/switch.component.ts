import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { QuestionOptions } from "~/app/core/models/report-item";
import { ReportControl } from "../../classes/report-control";

export interface SwitchReportItemOptions extends QuestionOptions<boolean> {
  switchFor: string | string[];
}

export class SwitchReportItem extends ReportControl<boolean> {
  component = SwitchComponent;
  controlType: string = "switch";
  switchFor: string | string[];
  constructor(options: SwitchReportItemOptions) {
    super(options);
    this.switchFor = options.switchFor;
  }
}

@Component({
  selector: "afriknow-switch",
  templateUrl: "./switch.component.html",
})
export class SwitchComponent implements OnInit {
  @Input() question!: SwitchReportItem;
  @Input() form!: FormGroup;

  get showError() {
    const control = this.question.formControl;

    return control?.invalid && control?.touched;
  }

  constructor() {}

  ngOnInit(): void {
    this.setFormControls(this.question.formControl.value ?? false);
  }

  onCheckedChange(event: { value: boolean }) {
    this.setFormControls(event.value);
  }

  setFormControls(enable: boolean) {
    if (Array.isArray(this.question.switchFor)) {
      this.question.switchFor.forEach((x) => {
        if (enable) this.form.get(x)?.enable();
        else this.form.get(x)?.disable();
      });
    } else {
      if (enable) this.form.get(this.question.switchFor)?.enable();
      else this.form.get(this.question.switchFor)?.disable();
    }
  }
}
